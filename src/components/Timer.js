import styles from './Timer.module.css';
import { PhaseIndicators } from './PhaseIndicators.js';
import { PhaseIndicator } from './PhaseIndicator.js';
import { Buttons } from './Buttons.js';
import { Button } from './Button.js';
import { Time } from './Time.js';
import { Digit } from './Digit.js';
import { Colon } from './Colon.js';
import playIcon from '../images/play.png';
import pauseIcon from '../images/pause.png';
import stopIcon from '../images/stop.png';
import togglePhaseIcon from '../images/togglePhase.png';
import settingsIcon from '../images/settings.png';
import acceptIcon from '../images/accept.png';
import increaseIcon from '../images/increase.png';
import decreaseIcon from '../images/decrease.png';

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

                <Buttons>
                    <Button 
                        currentFunction={props.leftButtonFunction}
                        functions={[props.toggleSettingsMode, props.stopTimer, props.decreaseTimeSetting]}
                        icons={[settingsIcon, stopIcon, decreaseIcon]} 
                        isCenterButton={false}
                    />

                    <Button 
                        currentFunction={props.centerButtonFunction}
                        functions={[props.startTimer, props.pauseTimer, props.acceptWorkTime, props.acceptRestTime]}
                        icons={[playIcon, pauseIcon, acceptIcon]} 
                        isCenterButton={true}
                    />

                    <Button 
                        currentFunction={props.rightButtonFunction}
                        functions={[props.togglePhase, props.increaseTimeSetting]}
                        icons={[togglePhaseIcon, increaseIcon]} 
                        isCenterButton={false}
                    />
                </Buttons>
            </div>
        </div>
    )
};