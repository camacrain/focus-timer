import styles from './Time.module.css';
import colon from '../images/colon.png';

export const Time = (props) => {
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
};