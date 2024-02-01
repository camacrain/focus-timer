import React from 'react';
import { useEffect } from 'react';
import styles from './Time.module.css';
import colon from '../images/colon.png';

export const Time = React.memo((props) => {
    useEffect(() => {
        console.log('Time rerendered');
    });

    return (
        <div className={styles.time}>
            <div className={styles.digitContainer}>
                <img className={styles.digit} src={props.digits.firstDigit} />
            </div>

            <div className={styles.digitContainer}>
                <img className={styles.digit} src={props.digits.secondDigit} />
            </div>

            <div className={styles.colonContainer}>
                <img className={styles.colon} src={colon} />
            </div>

            <div className={styles.digitContainer}>
                <img className={styles.digit} src={props.digits.thirdDigit} />
            </div>

            <div className={styles.digitContainer}>
                <img className={styles.digit} src={props.digits.fourthDigit} />
            </div>
        </div>
    );
}, (prevProps, nextProps) => {
    return prevProps.digits === nextProps.digits;
});