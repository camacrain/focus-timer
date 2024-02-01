import styles from './Colon.module.css';
import colon from '../images/colon.png';

export const Colon = () => {
    return (
        <div className={styles.colonContainer}>
            <img className={styles.colon} src={colon} />
        </div>
    );
};