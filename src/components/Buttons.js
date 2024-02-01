import styles from './Buttons.module.css';

export const Buttons = (props) => {
    return (
        <div className={styles.buttonsContainer}>
            {props.children}
        </div>
    )
};