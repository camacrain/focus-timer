import { useState } from 'react';
import styles from './Button.module.css';

const Button = (props) => {
    const [isPressed, setIsPressed] = useState(false);

    const setIcon = (iconNumber) => {
        // If there is no icon at iconNumber index, return null 
        // (for left button, where there's only two functions)
        if (!props.icons[iconNumber]) { return };

        const iconIsPressed = props.currentFunction ? isPressed && props.currentFunction.name === props.functions[iconNumber].name : false;
        let iconIsVisible;

        // If center button and accept icon, make icon visible both when 
        // currentFunction is acceptWorkTime and acceptRestTime
        if (props.isCenterButton && iconNumber === 2) { 
            iconIsVisible = props.currentFunction ? (props.currentFunction.name === props.functions[iconNumber].name || props.currentFunction.name === props.functions[iconNumber + 1].name) : false;
        } else {
            iconIsVisible = props.currentFunction ? props.currentFunction.name === props.functions[iconNumber].name : false;
        }

        return (
            <img 
                className={`${styles.buttonIcon} ${iconIsPressed ? styles.pressedButtonIcon : ''} ${iconIsVisible ? '' : styles.hiddenButtonIcon}`}
                src={props.icons[iconNumber]} 
            />
        )
    };

    const handleMouseDown = () => {
        setIsPressed(true);
    };

    const handleMouseUp = () => {
        setIsPressed(false);
        props.currentFunction();
    };

    return (
        <button 
            className={`${styles.button} ${props.isCenterButton ? styles.centerButton : ''} ${isPressed ? styles.pressedButton : ''}`}
            onMouseDown={handleMouseDown} 
            onMouseUp={handleMouseUp}
        >
            {setIcon(0)}
            {setIcon(1)}
            {setIcon(2)}
        </button>
    );
};

export default Button;