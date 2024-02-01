import styles from './Time.module.css';

export const Time = (props) => {
    return (
        <div className={styles.time}>
            {props.children}
        </div>
    );
};