import React from 'react';
import styles from './Digit.module.css';

export const Digit = React.memo((props) => {
    return (
        <div className={styles.digitContainer}>
            <img className={styles.digit} src={props.digit} />
        </div>
    );
}, (prevProps, nextProps) => {
    return prevProps.digit === nextProps.digit;
});