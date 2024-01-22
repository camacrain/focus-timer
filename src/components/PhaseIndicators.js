import styles from './PhaseIndicators.module.css';

export const PhaseIndicators = (props) => {
    return (
        <div className={styles.phaseIndicatorsContainer}>
            {props.children}
        </div>
    );
};