import React from 'react';
import styles from './PhaseIndicator.module.css';
import workOnIndicator from '../images/workOn.png';
import workOffIndicator from '../images/workOff.png';
import restOnIndicator from '../images/restOn.png';
import restOffIndicator from '../images/restOff.png';

export const PhaseIndicator = React.memo((props) => {
    let indicator;

    if (props.isWorkIndicator) {
        indicator = props.inWorkPhase ? workOnIndicator : workOffIndicator;
    } else {
        indicator = props.inWorkPhase ? restOffIndicator : restOnIndicator;
    }

    return (
        <img className={styles.phaseIndicator} src={indicator} />
    );
}, (prevProps, nextProps) => {
    return prevProps.inWorkPhase === nextProps.inWorkPhase;
});