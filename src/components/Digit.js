import { useState, useEffect } from 'react';
import styles from './Digit.module.css';
import noDigit from '../images/none.png';
import zeroDigit from '../images/zero.png';
import oneDigit from '../images/one.png';
import twoDigit from '../images/two.png';
import threeDigit from '../images/three.png';
import fourDigit from '../images/four.png';
import fiveDigit from '../images/five.png';
import sixDigit from '../images/six.png';
import sevenDigit from '../images/seven.png';
import eightDigit from '../images/eight.png';
import nineDigit from '../images/nine.png';

export const Digit = (props) => {
    const [digit, setDigit] = useState(zeroDigit);

    useEffect(() => {
        if (props.showTime) {
            updateDigit();
        } else {
            turnDigitOff();
        }
    }, [props.timeLeft, props.showTime])

    const updateDigit = () => {
        // Update digit based on timeLeft if the digit has changed
        const minutes = Math.floor(props.timeLeft / 60);
        const seconds = props.timeLeft % 60;
        let digitValue = '0';

        if (props.digit === 'first') {
            digitValue = minutes.toString().padStart(2, '0')[0];
        } else if (props.digit === 'second') {
            digitValue = minutes.toString().padStart(2, '0')[1];
        } else if (props.digit === 'third') {
            digitValue = seconds.toString().padStart(2, '0')[0];
        } else if (props.digit === 'fourth') {
            digitValue = seconds.toString().padStart(2, '0')[1];
        }

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

        const newDigit = digitToSvg[digitValue] || zeroDigit;

        if (newDigit !== digit) {
            setDigit(newDigit);
        }
    };

    const turnDigitOff = () => {
        setDigit(noDigit);
    };

    return (
        <div className={styles.digitContainer}>
            <img className={styles.digit} src={digit} />
        </div>
    );
};