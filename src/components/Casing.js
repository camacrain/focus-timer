import styles from './Casing.module.css';

export const Casing = (props) => {
    return (
        <div className={styles.casing}>
            <div className={styles.casingLight}></div>
            {props.children}
        </div>
    );
};