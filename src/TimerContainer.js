import { useState, useEffect, useCallback } from 'react';
import Timer from './Timer.js';
import noDigit from './images/none.png';
import zeroDigit from './images/zero.png';
import oneDigit from './images/one.png';
import twoDigit from './images/two.png';
import threeDigit from './images/three.png';
import fourDigit from './images/four.png';
import fiveDigit from './images/five.png';
import sixDigit from './images/six.png';
import sevenDigit from './images/seven.png';
import eightDigit from './images/eight.png';
import nineDigit from './images/nine.png';
import workOnIndicator from './images/workOn.png';
import workOffIndicator from './images/workOff.png';
import restOnIndicator from './images/restOn.png';
import restOffIndicator from './images/restOff.png';
import notificationSound from './TimerDone.mp3';

function TimerContainer() {
    const [firstDigit, setFirstDigit] = useState(zeroDigit);
    const [secondDigit, setSecondDigit] = useState(zeroDigit);
    const [thirdDigit, setThirdDigit] = useState(zeroDigit);
    const [fourthDigit, setFourthDigit] = useState(zeroDigit);
    const [workTime, setWorkTime] = useState(null);
    const [restTime, setRestTime] = useState(null);
    const [inWorkPhase, setInWorkPhase] = useState(true);
    const [timerIsOn, setTimerIsOn] = useState(false);
    const [timeLeft, setTimeLeft] = useState(null);
    const [paused, setPaused] = useState(false);
    const [showTime, setShowTime] = useState(true);
    const [workIndicator, setWorkIndicator] = useState(workOnIndicator);
    const [restIndicator, setRestIndicator] = useState(restOffIndicator);
    const [inSettingsMode, setInSettingsMode] = useState(false);
    const [leftButtonFunction, setLeftButtonFunction] = useState(null);
    const [centerButtonFunction, setCenterButtonFunction] = useState(null);
    const [rightButtonFunction, setRightButtonFunction] = useState(null);
    const [leftButtonIsPressed, setLeftButtonIsPressed] = useState(false);
    const [centerButtonIsPressed, setCenterButtonIsPressed] = useState(false);
    const [rightButtonIsPressed, setRightButtonIsPressed] = useState(false);
    const [permissionsWereRequested, setPermissionsWereRequested] = useState(false);
    const defaultWorkTime = 1500;
    const defaultRestTime = 300;
    const maxTime = 3600;
    const minTime = 300;
    const timeSettingIncrement = 300;
    const chime = new Audio(notificationSound);

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
        saveWorkTime();
    }, [workTime]);

    useEffect(() => {
        // Save restTime to local storage whenever it changes
        saveRestTime();
    }, [restTime]);

    useEffect(() => {
        // Update timer digits whenever timeLeft changes
        if (showTime) {
            updateDigits();
        }
    }, [timeLeft]);

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

    const sendWorkNotification = () => {
        navigator.permissions.query({name:'notifications'}).then(function(permissionStatus) {
            if (permissionStatus.state === 'granted') {
                new Notification("Let's work!");
                
            }
        });

        chime.play();
    };

    const sendRestNotification = () => {
        navigator.permissions.query({name:'notifications'}).then(function(permissionStatus) {
            if (permissionStatus.state === 'granted') {
                new Notification("Break time?");
                
            }
        });

        chime.play();
    };

    const toggleDigits = () => {
        // Turn digits on or off depending on state of showTime
        if (showTime) {
            updateDigits();
        } else {
            setFirstDigit(noDigit);
            setSecondDigit(noDigit);
            setThirdDigit(noDigit);
            setFourthDigit(noDigit);
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

    useEffect(() => {
        // Turn digits on or off whenever showTime changes
        toggleDigits();
    }, [showTime]);

    const updateDigits = () => {
        // Update digits based on timeLeft
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        const [firstDigit, secondDigit] = minutes.toString().padStart(2, '0');
        const [thirdDigit, fourthDigit] = seconds.toString().padStart(2, '0');

        const digitToSvg = {
            '0': zeroDigit,
            '1': oneDigit,
            '2': twoDigit,
            '3': threeDigit,
            '4': fourDigit,
            '5': fiveDigit,
            '6': sixDigit,
            '7': sevenDigit,
            '8': eightDigit,
            '9': nineDigit,
        };

        setFirstDigit(digitToSvg[firstDigit] || zeroDigit);
        setSecondDigit(digitToSvg[secondDigit] || zeroDigit);
        setThirdDigit(digitToSvg[thirdDigit] || zeroDigit);
        setFourthDigit(digitToSvg[fourthDigit] || zeroDigit);
    };

    const startTimer = () => {
        setTimerIsOn(true);
        setPaused(false);
        setTimeLeft(prev => prev - 1);
        changeButtonFunction(setLeftButtonFunction, 'stopTimer');
        changeButtonFunction(setCenterButtonFunction, 'pauseTimer');
    };

    const pauseTimer = () => {
        setTimerIsOn(false);
        setPaused(true);
        changeButtonFunction(setLeftButtonFunction, 'stopTimer');
        changeButtonFunction(setCenterButtonFunction, 'startTimer');
    };

    const stopTimer = () => {
        setTimerIsOn(false);
        setPaused(false);
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
                        setWorkIndicator(!prevInWorkPhase ? workOnIndicator : workOffIndicator);
                        setRestIndicator(!prevInWorkPhase ? restOffIndicator : restOnIndicator);
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

    const saveWorkTime = () => {
        localStorage.setItem('workTime', workTime);
    };

    const saveRestTime = () => {
        localStorage.setItem('restTime', restTime);
    };

    const toggleLeftButtonIsPressed = () => {
        setLeftButtonIsPressed(prev => {
            const newValue = !prev;
            if (!newValue) { leftButtonFunction(); }
            return newValue;
        });
    };

    const toggleCenterButtonIsPressed = () => {
        setCenterButtonIsPressed(prev => {
            const newValue = !prev;
            if (!newValue) { centerButtonFunction(); }
            return newValue;
        });
    };

    const toggleRightButtonIsPressed = () => {
        setRightButtonIsPressed(prev => {
            const newValue = !prev;
            if (!newValue) { rightButtonFunction(); }
            return newValue;
        });
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

            if (setButtonFunction === setLeftButtonFunction) {
                console.log("Container set leftButtonFunction to " + functionName);
            } else if (setButtonFunction === setCenterButtonFunction) {
                console.log("Container set centerButtonFunction to " + functionName);
            } else {
                console.log("Container set rightButtonFunction to " + functionName);
            }
        } else {
            console.error(`Function ${functionName} not found.`);
        }
    };

    return (
        <Timer 
            firstDigit={firstDigit} 
            secondDigit={secondDigit}
            thirdDigit={thirdDigit}
            fourthDigit={fourthDigit}
            timerIsOn={timerIsOn}
            inWorkPhase={inWorkPhase}
            workIndicator={workIndicator}
            restIndicator={restIndicator}
            handleLeftButtonPress={toggleLeftButtonIsPressed}
            leftButtonIsPressed={leftButtonIsPressed}
            leftButtonFunction={leftButtonFunction}
            handleCenterButtonPress={toggleCenterButtonIsPressed}
            centerButtonIsPressed={centerButtonIsPressed}
            centerButtonFunction={centerButtonFunction}
            handleRightButtonPress={toggleRightButtonIsPressed}
            rightButtonIsPressed={rightButtonIsPressed}
            rightButtonFunction={rightButtonFunction}
            paused={paused}
            inSettingsMode={inSettingsMode}
        />
    );
};

export default TimerContainer;