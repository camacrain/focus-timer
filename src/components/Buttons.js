import { useState } from 'react';
import styles from './Buttons.module.css';
import playIcon from '../images/play.png';
import pauseIcon from '../images/pause.png';
import stopIcon from '../images/stop.png';
import togglePhaseIcon from '../images/togglePhase.png';
import settingsIcon from '../images/settings.png';
import acceptIcon from '../images/accept.png';
import increaseIcon from '../images/increase.png';
import decreaseIcon from '../images/decrease.png';

const Buttons = (props) => {
    const [leftButtonIsPressed, setLeftButtonIsPressed] = useState(false);
    const [centerButtonIsPressed, setCenterButtonIsPressed] = useState(false);
    const [rightButtonIsPressed, setRightButtonIsPressed] = useState(false);
    const settingsIconIsPressed = leftButtonIsPressed && props.leftButtonFunction && props.leftButtonFunction.name === props.toggleSettingsMode.name;
    const settingsIconIsVisible = props.leftButtonFunction && props.leftButtonFunction.name === props.toggleSettingsMode.name;
    const stopIconIsPressed = leftButtonIsPressed && props.leftButtonFunction && props.leftButtonFunction.name === props.stopTimer.name;
    const stopIconIsVisible = props.leftButtonFunction && props.leftButtonFunction.name === props.stopTimer.name;
    const decreaseIconIsPressed = leftButtonIsPressed && props.leftButtonFunction && props.leftButtonFunction.name === props.decreaseTimeSetting.name;
    const decreaseIconIsVisible = props.leftButtonFunction && props.leftButtonFunction.name === props.decreaseTimeSetting.name;
    const playIconIsPressed = centerButtonIsPressed && props.centerButtonFunction && props.centerButtonFunction.name === props.startTimer.name;
    const playIconIsVisible = props.centerButtonFunction && props.centerButtonFunction.name === props.startTimer.name;
    const pauseIconIsPressed = centerButtonIsPressed && props.centerButtonFunction && props.centerButtonFunction.name === props.pauseTimer.name;
    const pauseIconIsVisible = props.centerButtonFunction && props.centerButtonFunction.name === props.pauseTimer.name;
    const acceptIconIsPressed = centerButtonIsPressed && props.centerButtonFunction && (props.centerButtonFunction.name === props.acceptWorkTime.name || props.centerButtonFunction.name === props.acceptRestTime.name);
    const acceptIconIsVisible = props.centerButtonFunction && (props.centerButtonFunction.name === props.acceptWorkTime.name || props.centerButtonFunction.name === props.acceptRestTime.name);
    const togglePhaseIconIsPressed = rightButtonIsPressed && props.rightButtonFunction && props.rightButtonFunction.name === props.togglePhase.name;
    const togglePhaseIconIsVisible = props.rightButtonFunction && props.rightButtonFunction.name === props.togglePhase.name;
    const increaseIconIsPressed = rightButtonIsPressed && props.rightButtonFunction && props.rightButtonFunction.name === props.increaseTimeSetting.name;
    const increaseIconIsVisible = props.rightButtonFunction && props.rightButtonFunction.name === props.increaseTimeSetting.name;

    
    const onLeftButtonMouseDown = () => {
        setLeftButtonIsPressed(true);
    }

    const onLeftButtonMouseUp = () => {
        setLeftButtonIsPressed(false);
        props.leftButtonFunction();
    }

    const onCenterButtonMouseDown = () => {
        setCenterButtonIsPressed(true);
    }

    const onCenterButtonMouseUp = () => {
        setCenterButtonIsPressed(false);
        props.centerButtonFunction();
    }

    const onRightButtonMouseDown = () => {
        setRightButtonIsPressed(true);
    }

    const onRightButtonMouseUp = () => {
        setRightButtonIsPressed(false);
        props.rightButtonFunction();
    }

    return (
        <div className={styles.buttonsContainer}>
            <button 
                className={`${styles.leftButton} ${styles.button} ${leftButtonIsPressed ? styles.pressedButton : ''}`}
                onMouseDown={onLeftButtonMouseDown} 
                onMouseUp={onLeftButtonMouseUp}
            >
                <img 
                    className={`${styles.buttonIcon} ${settingsIconIsPressed ? styles.pressedButtonIcon : ''} ${settingsIconIsVisible ? '' : styles.hiddenButtonIcon}`}
                    src={settingsIcon} 
                />

                <img 
                    className={`${styles.buttonIcon} ${stopIconIsPressed ? styles.pressedButtonIcon : ''} ${stopIconIsVisible ? '' : styles.hiddenButtonIcon}`}
                    src={stopIcon} 
                />

                <img 
                    className={`${styles.buttonIcon} ${decreaseIconIsPressed ? styles.pressedButtonIcon : ''} ${decreaseIconIsVisible ? '' : styles.hiddenButtonIcon}`}
                    src={decreaseIcon} 
                />
            </button>

            <button 
                className={`${styles.centerButton} ${styles.button} ${centerButtonIsPressed ? styles.pressedButton : ''}`}
                onMouseDown={onCenterButtonMouseDown} 
                onMouseUp={onCenterButtonMouseUp}
            >   
                <img 
                    className={`${styles.buttonIcon} ${playIconIsPressed ? styles.pressedButtonIcon : ''} ${playIconIsVisible ? '' : styles.hiddenButtonIcon}`}
                    src={playIcon} 
                />

                <img 
                    className={`${styles.buttonIcon} ${pauseIconIsPressed ? styles.pressedButtonIcon : ''} ${pauseIconIsVisible ? '' : styles.hiddenButtonIcon}`}
                    src={pauseIcon} 
                />
                
                <img 
                    className={`${styles.buttonIcon} ${acceptIconIsPressed ? styles.pressedButtonIcon : ''} ${acceptIconIsVisible ? '' : styles.hiddenButtonIcon}`}
                    src={acceptIcon} 
                />
            </button>

            <button 
                className={`${styles.rightButton} ${styles.button} ${rightButtonIsPressed ? styles.pressedButton : ''}`}
                onMouseDown={onRightButtonMouseDown} 
                onMouseUp={onRightButtonMouseUp}
            >
                <img 
                    className={`${styles.buttonIcon} ${togglePhaseIconIsPressed ? styles.pressedButtonIcon : ''} ${togglePhaseIconIsVisible ? '' : styles.hiddenButtonIcon}`}
                    src={togglePhaseIcon} 
                />

                <img 
                    className={`${styles.buttonIcon} ${increaseIconIsPressed ? styles.pressedButtonIcon : ''} ${increaseIconIsVisible ? '' : styles.hiddenButtonIcon}`}
                    src={increaseIcon} 
                />
            </button>
        </div>
    )
};

export default Buttons;