import styles from './Screen.module.css';

export const Screen = (props) => {
    return (
        <div className={styles.screenOuter}>
            <div className={styles.screenLight}></div>

            <div className={styles.screenInner}>
                {props.children}
            </div>
        </div>
    );
};