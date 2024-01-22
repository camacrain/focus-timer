import styles from './PhaseIndicators.module.css';
import workOnIndicator from '../images/workOn.png';
import workOffIndicator from '../images/workOff.png';
import restOnIndicator from '../images/restOn.png';
import restOffIndicator from '../images/restOff.png';

export const PhaseIndicators = (props) => {
    const workIndicator = props.inWorkPhase ? workOnIndicator : workOffIndicator;
    const restIndicator = props.inWorkPhase ? restOffIndicator : restOnIndicator;

    return (
        <div className={styles.phaseIndicatorsContainer}>
            <img className={styles.phaseIndicator} src={workIndicator} />
            <img className={styles.phaseIndicator} src={restIndicator} />
        </div>
    );
};