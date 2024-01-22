import styles from './Timer.module.css';
import PhaseIndicators from './PhaseIndicators.js';
import Buttons from './Buttons.js';
import colon from '../images/colon.png';

function Timer(props) {
    return (
        <div className={styles.container}>
            <div className={styles.base}>
                <div className={styles.baseLight}></div>

                <div className={styles.screenOuter}>
                    <div className={styles.screenLight}></div>

                    <div className={styles.screenInner}>
                        <PhaseIndicators inWorkPhase={props.inWorkPhase} />
                    
                        <div className={styles.timeContainer}>
                            <div className={styles.time}>
                                <div className={styles.digitContainer}>
                                    <img className={styles.digit} src={props.firstDigit} />
                                </div>
                                <div className={styles.digitContainer}>
                                    <img className={styles.digit} src={props.secondDigit} />
                                </div>
                                <div className={styles.colonContainer}>
                                    <img className={styles.colon} src={colon} />
                                </div>
                                <div className={styles.digitContainer}>
                                    <img className={styles.digit} src={props.thirdDigit} />
                                </div>
                                <div className={styles.digitContainer}>
                                    <img className={styles.digit} src={props.fourthDigit} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Buttons
                    leftButtonFunction={props.leftButtonFunction}
                    centerButtonFunction={props.centerButtonFunction}
                    rightButtonFunction={props.rightButtonFunction}
                    toggleSettingsMode={props.toggleSettingsMode}
                    stopTimer={props.stopTimer}
                    decreaseTimeSetting={props.decreaseTimeSetting}
                    startTimer={props.startTimer}
                    pauseTimer={props.pauseTimer}
                    acceptRestTime={props.acceptRestTime}
                    acceptWorkTime={props.acceptWorkTime}
                    togglePhase={props.togglePhase}
                    increaseTimeSetting={props.increaseTimeSetting}
                />
            </div>
        </div>
    )
};

export default Timer;