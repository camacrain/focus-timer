import { useEffect } from 'react';
import styles from './Timer.module.css';
import colon from './images/colon.png';
import playIcon from './images/play.png';
import pauseIcon from './images/pause.png';
import stopIcon from './images/stop.png';
import togglePhaseIcon from './images/togglePhase.png';
import settingsIcon from './images/settings.png';
import acceptIcon from './images/accept.png';
import increaseIcon from './images/increase.png';
import decreaseIcon from './images/decrease.png';

function Timer(props) {
//     useEffect(() => {
//         console.log(`Left Button Function: ${props.leftButtonFunction ? props.leftButtonFunction.name : null}
// Center Button Function: ${props.centerButtonFunction ? props.centerButtonFunction.name : null}
// Right Button Function: ${props.rightButtonFunction ? props.rightButtonFunction.name : null}`)
//     }, []);

    useEffect(() => {
        console.log(`props.leftButtonFunction: ${props.leftButtonFunction ? props.leftButtonFunction.name : null}`)
    }, [props.leftButtonFunction]);

    useEffect(() => {
        console.log(`props.centerButtonFunction: ${props.centerButtonFunction ? props.centerButtonFunction.name : null}`)
    }, [props.centerButtonFunction]);

    useEffect(() => {
        console.log(`props.rightButtonFunction: ${props.rightButtonFunction ? props.rightButtonFunction.name : null}`)
    }, [props.rightButtonFunction]);

    useEffect(() => {
        console.log(`props.leftButtonIsPressed: ${props.leftButtonIsPressed !== null ? props.leftButtonIsPressed : null}`)
    }, [props.leftButtonIsPressed]);

    useEffect(() => {
        console.log(`props.centerButtonIsPressed: ${props.centerButtonIsPressed !== null ? props.centerButtonIsPressed : null}`)
    }, [props.centerButtonIsPressed]);

    useEffect(() => {
        console.log(`props.rightButtonIsPressed: ${props.rightButtonIsPressed !== null ? props.rightButtonIsPressed : null}`)
    }, [props.rightButtonIsPressed]);

    return (
        <div className={styles.base}>
            <div className={styles.baseLight}></div>

            <div className={styles.screenOuter}>
                <div className={styles.screenLight}></div>

                <div className={styles.screenInner}>
                    <div className={styles.phaseContainer}>
                        <img className={styles.phaseIndicator} src={props.workIndicator} />
                        <img className={styles.phaseIndicator} src={props.restIndicator} />
                    </div>
                
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

            <div className={styles.buttons}>
                <button 
                    className={`
                        ${styles.leftButton} 
                        ${styles.button} 
                        ${props.leftButtonIsPressed ? styles.pressedButton : ''}
                    `} 
                    onClick={props.handleLeftButtonClick} 
                    onMouseDown={props.handleLeftButtonPress} 
                    onMouseUp={props.handleLeftButtonPress}
                >
                    <img className={`
                            ${styles.buttonIcon} 
                            ${props.leftButtonIsPressed && props.leftButtonFunction && props.leftButtonFunction.name === props.toggleSettingsModeFunction.name ? styles.pressedButtonIcon : ''} 
                            ${props.leftButtonFunction && props.leftButtonFunction.name !== props.toggleSettingsModeFunction.name ? styles.hiddenButtonIcon : ''}
                        `} 
                        src={settingsIcon} 
                    />
                    <img className={`${styles.buttonIcon} ${props.leftButtonIsPressed && props.leftButtonFunction && props.leftButtonFunction.name === 'stopTimer' ? styles.pressedButtonIcon : ''} ${props.leftButtonFunction && props.leftButtonFunction.name !== 'stopTimer' ? styles.hiddenButtonIcon : ''}`} src={stopIcon} />
                    <img className={`${styles.buttonIcon} ${props.leftButtonIsPressed && props.leftButtonFunction && props.leftButtonFunction.name === 'decreaseTimeSetting' ? styles.pressedButtonIcon : ''} ${props.leftButtonFunction && props.leftButtonFunction.name !== 'decreaseTimeSetting' ? styles.hiddenButtonIcon : ''}`} src={decreaseIcon} />
                </button>

                <button 
                    className={`${styles.centerButton} ${styles.button} ${props.centerButtonIsPressed ? styles.pressedButton : ''}`} 
                    onClick={props.handleCenterButtonClick}
                    onMouseDown={props.handleCenterButtonPress} 
                    onMouseUp={props.handleCenterButtonPress}
                >   
                    <img className={`${styles.buttonIcon} ${props.centerButtonIsPressed && props.centerButtonFunction && props.centerButtonFunction.name === 'startTimer' ? styles.pressedButtonIcon : ''} ${props.centerButtonFunction && props.centerButtonFunction.name !== 'startTimer' ? styles.hiddenButtonIcon : ''}`} src={playIcon} />
                    <img className={`${styles.buttonIcon} ${props.centerButtonIsPressed && props.centerButtonFunction && props.centerButtonFunction.name === 'pauseTimer' ? styles.pressedButtonIcon : ''} ${props.centerButtonFunction && props.centerButtonFunction.name !== 'pauseTimer' ? styles.hiddenButtonIcon : ''}`} src={pauseIcon} />
                    <img className={`${styles.buttonIcon} ${props.centerButtonIsPressed && props.centerButtonFunction && props.centerButtonFunction.name === ('acceptWorkTime' || 'acceptRestTime') ? styles.pressedButtonIcon : ''} ${props.centerButtonFunction && (props.centerButtonFunction.name !== 'acceptWorkTime' && props.centerButtonFunction.name !== 'acceptRestTime') ? styles.hiddenButtonIcon : ''}`} src={acceptIcon} />
                    
                </button>

                <button 
                    className={`${styles.rightButton} ${styles.button} ${props.rightButtonIsPressed ? styles.pressedButton : ''}`} 
                    onClick={props.handleRightButtonClick}
                    onMouseDown={props.handleRightButtonPress} 
                    onMouseUp={props.handleRightButtonPress}
                >
                    <img className={`${styles.buttonIcon} ${props.rightButtonIsPressed && props.rightButtonFunction && props.rightButtonFunction.name === 'togglePhase' ? styles.pressedButtonIcon : ''} ${props.rightButtonFunction && props.rightButtonFunction.name !== 'togglePhase' ? styles.hiddenButtonIcon : ''}`} src={togglePhaseIcon} />
                    <img className={`${styles.buttonIcon} ${props.rightButtonIsPressed && props.rightButtonFunction && props.rightButtonFunction.name === 'increaseTimeSetting' ? styles.pressedButtonIcon : ''} ${props.rightButtonFunction && props.rightButtonFunction.name !== 'increaseTimeSetting' ? styles.hiddenButtonIcon : ''}`} src={increaseIcon} />
                </button>
            </div>
        </div>
    )
};

export default Timer;