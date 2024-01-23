import { useState, useEffect } from 'react';
import { Timer } from './Timer.js';
import { saveWorkTime, saveRestTime } from '../utilities/storage.js';
import { sendWorkNotification, sendRestNotification } from '../utilities/notifications.js';

function TimerContainer() {
    const [workTime, setWorkTime] = useState(null);
    const [restTime, setRestTime] = useState(null);
    const [inWorkPhase, setInWorkPhase] = useState(true);
    const [timerIsOn, setTimerIsOn] = useState(false);
    const [timeLeft, setTimeLeft] = useState(null);
    const [showTime, setShowTime] = useState(true);
    const [inSettingsMode, setInSettingsMode] = useState(false);
    const [leftButtonFunction, setLeftButtonFunction] = useState(null);
    const [centerButtonFunction, setCenterButtonFunction] = useState(null);
    const [rightButtonFunction, setRightButtonFunction] = useState(null);
    const [permissionsWereRequested, setPermissionsWereRequested] = useState(false);
    const defaultWorkTime = 1500;
    const defaultRestTime = 5;
    const maxTime = 3600;
    const minTime = 300;
    const timeSettingIncrement = 300;

    useEffect(() => {
        // Initialize

        // Set button functions
        changeButtonFunction(setLeftButtonFunction, 'toggleSettingsMode');
        changeButtonFunction(setCenterButtonFunction, 'startTimer');
        changeButtonFunction(setRightButtonFunction, 'togglePhase');

        //Set workTime to value saved in local storage or default value and set timeLeft to workTime
        const savedWorkTime = parseInt(localStorage.getItem('workTime'));
        if (isNaN(savedWorkTime)) { 
            setWorkTime(defaultWorkTime); 
            setTimeLeft(defaultWorkTime);
        } else { 
            setWorkTime(savedWorkTime); 
            setTimeLeft(savedWorkTime);
        }

        //Set restTime to value saved in local storage or default value
        const savedRestTime = parseInt(localStorage.getItem('restTime'));
        if (isNaN(savedRestTime)) { 
            setRestTime(defaultRestTime); 
        } else { 
            setRestTime(savedRestTime); 
        }

        // Check if there's a saved value for permissionsWereRequested and set it if so
        const savedPermissionsWereRequested = localStorage.getItem('permissionsWereRequested');
        if (savedPermissionsWereRequested) { setPermissionsWereRequested(true); }
    }, []);

    useEffect(() => {
        // Save workTime to local storage whenever it changes
        saveWorkTime(workTime);
    }, [workTime]);

    useEffect(() => {
        // Save restTime to local storage whenever it changes
        saveRestTime(restTime);
    }, [restTime]);

    useEffect(() => {
        // Decrement timeLeft once a second while timerIsOn
        // and send a notification when timeLeft reaches 0
        if (timerIsOn) {
            const worker = new Worker(process.env.PUBLIC_URL + '/worker.js');

            worker.onmessage = (e) => {
                setTimeLeft(prev => {
                    const newTime = prev - 1;

                    if (prev > 1) {
                        return newTime;
                    } else {
                        if (inWorkPhase) { 
                            sendRestNotification(); 
                        } else {
                            sendWorkNotification(); 
                        }

                        togglePhase();
                    }
                });
            };

            worker.postMessage('start');

            return () => worker.terminate();
        }
    }, [timerIsOn]);

    useEffect(() => {
        // Request permissions when timer starts if they haven't been requested before
        if (timerIsOn && !permissionsWereRequested) { requestPermissions(); };
    }, [timerIsOn]);

    const requestPermissions = () => {
        if ('Notification' in window) {
            Notification.requestPermission().then(function(result) {
                setPermissionsWereRequested(true);
                localStorage.setItem('permissionsWereRequested', true);
            });
        }
    };

    useEffect(() => {
        // Toggle showTime on and off every second while inSettingsMode
        if (inSettingsMode) {
            setShowTime(false);

            const interval = setInterval(() => {
                setShowTime(prev => !prev);
            }, 500);

            return () => clearInterval(interval);
        } else {
            setShowTime(true);
        }
    }, [inSettingsMode]);

    const startTimer = () => {
        setTimerIsOn(true);
        setTimeLeft(prev => prev - 1);
        changeButtonFunction(setLeftButtonFunction, 'stopTimer');
        changeButtonFunction(setCenterButtonFunction, 'pauseTimer');
    };

    const pauseTimer = () => {
        setTimerIsOn(false);
        changeButtonFunction(setLeftButtonFunction, 'stopTimer');
        changeButtonFunction(setCenterButtonFunction, 'startTimer');
    };

    const stopTimer = () => {
        setTimerIsOn(false);
        changeButtonFunction(setLeftButtonFunction, 'toggleSettingsMode');
        changeButtonFunction(setCenterButtonFunction, 'startTimer');

        setWorkTime(prevWorkTime => {
            setRestTime(prevRestTime => {
                setInWorkPhase(prevInWorkPhase => {
                    setTimeLeft(prevInWorkPhase ? prevWorkTime : prevRestTime);
                    return prevInWorkPhase;
                });
                
                return prevRestTime;
            });

            return prevWorkTime;
        });
    };

    const togglePhase = () => {
        setInWorkPhase(prevInWorkPhase => {
            setWorkTime(prevWorkTime => {
                setRestTime(prevRestTime => {
                    setInSettingsMode(prevInSettingsMode => {
                        if (!prevInSettingsMode) { stopTimer(); }
                        setTimeLeft(!prevInWorkPhase ? prevWorkTime : prevRestTime);
                        return prevInSettingsMode;
                    });

                    return prevRestTime;
                });

                return prevWorkTime;
            });

            return !prevInWorkPhase;
        });
    };

    const toggleSettingsMode = () => {
        setInSettingsMode(prevInSettingsMode => {
            const newValue = !prevInSettingsMode;

            if (newValue) {
                setInWorkPhase(prevInWorkPhase => {
                    if (!prevInWorkPhase) { togglePhase(); };
                    return prevInWorkPhase;
                });

                changeButtonFunction(setLeftButtonFunction, 'decreaseTimeSetting');
                changeButtonFunction(setCenterButtonFunction, 'acceptWorkTime');
                changeButtonFunction(setRightButtonFunction, 'increaseTimeSetting');
            } else {
                togglePhase();
                changeButtonFunction(setLeftButtonFunction, 'toggleSettingsMode');
                changeButtonFunction(setCenterButtonFunction, 'startTimer');
                changeButtonFunction(setRightButtonFunction, 'togglePhase');
            }

            return newValue;
        });
    };

    const increaseTimeSetting = () => {
        // Increase either workTime or restTime, depending on the phase
        const increment = (prevTime, maxTime, increment) => {
            if (prevTime < maxTime) {
                const newTime = prevTime + increment;
                setTimeLeft(newTime);
                return newTime;
            } else {
                return prevTime;
            }
        };

        setInWorkPhase(prevInWorkPhase => {
            if (prevInWorkPhase) {
                setWorkTime(prev => increment(prev, maxTime, timeSettingIncrement));
            } else {
                setRestTime(prev => increment(prev, maxTime, timeSettingIncrement));
            }

            return prevInWorkPhase;
        })
    };

    const decreaseTimeSetting = () => {
        // Decrease either workTime or restTime, depending on the phase
        const decrement = (prevTime, minTime, increment) => {
            if (prevTime > minTime) {
                const newTime = prevTime - increment;
                setTimeLeft(newTime);
                return newTime;
            } else {
                return prevTime;
            }
        };

        setInWorkPhase(prevInWorkPhase => {
            if (prevInWorkPhase) {
                setWorkTime(prev => decrement(prev, minTime, timeSettingIncrement));
            } else {
                setRestTime(prev => decrement(prev, minTime, timeSettingIncrement));
            }

            return prevInWorkPhase;
        });
    };

    const acceptWorkTime = () => {
        togglePhase();
        changeButtonFunction(setCenterButtonFunction, 'acceptRestTime');
    };

    const acceptRestTime = () => {
        toggleSettingsMode();
    };
    
    const changeButtonFunction = (setButtonFunction, functionName) => {
        // Change button functions to current state
        const buttonFunctions = {
            'startTimer': startTimer,
            'pauseTimer': pauseTimer,
            'stopTimer': stopTimer,
            'togglePhase': togglePhase,
            'toggleSettingsMode': toggleSettingsMode,
            'increaseTimeSetting': increaseTimeSetting,
            'decreaseTimeSetting': decreaseTimeSetting,
            'acceptWorkTime': acceptWorkTime,
            'acceptRestTime': acceptRestTime
        };

        if (buttonFunctions[functionName]) {
            setButtonFunction(() => buttonFunctions[functionName]);
        } else {
            console.error(`Function ${functionName} not found.`);
        }
    };

    return (
        <Timer 
            showTime={showTime}
            timeLeft={timeLeft}
            timerIsOn={timerIsOn}
            inWorkPhase={inWorkPhase}
            leftButtonFunction={leftButtonFunction}
            centerButtonFunction={centerButtonFunction}
            rightButtonFunction={rightButtonFunction}
            toggleSettingsMode={toggleSettingsMode}
            stopTimer={stopTimer}
            decreaseTimeSetting={decreaseTimeSetting}
            startTimer={startTimer}
            pauseTimer={pauseTimer}
            acceptRestTime={acceptRestTime}
            acceptWorkTime={acceptWorkTime}
            togglePhase={togglePhase}
            increaseTimeSetting={increaseTimeSetting}
        />
    );
};

export default TimerContainer;