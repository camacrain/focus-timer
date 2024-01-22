import styles from './Timer.module.css';
import { PhaseIndicators } from './PhaseIndicators.js';
import { PhaseIndicator } from './PhaseIndicator.js';
import { Buttons } from './Buttons.js';
import { Time } from './Time.js';
import { Digit } from './Digit.js';
import { Colon } from './Colon.js';

export const Timer = (props) => {
    return (
        <div className={styles.container}>
            <div className={styles.base}>
                <div className={styles.baseLight}></div>

                <div className={styles.screenOuter}>
                    <div className={styles.screenLight}></div>

                    <div className={styles.screenInner}>
                        <PhaseIndicators inWorkPhase={props.inWorkPhase}>
                            <PhaseIndicator inWorkPhase={props.inWorkPhase} isWorkIndicator={true} />
                            <PhaseIndicator inWorkPhase={props.inWorkPhase} isWorkIndicator={false} />
                        </PhaseIndicators>
                    
                        <Time>
                            <Digit digit={props.firstDigit} />
                            <Digit digit={props.secondDigit} />
                            <Colon />
                            <Digit digit={props.thirdDigit} />
                            <Digit digit={props.fourthDigit} />
                        </Time>
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