import styles from './Digit.module.css';

export const Digit = (props) => {
    return (
        <div className={styles.digitContainer}>
            <img className={styles.digit} src={props.digit} />
        </div>
    );
};