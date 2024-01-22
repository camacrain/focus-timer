import styles from './Buttons.module.css';
import { Button } from './Button.js';
import playIcon from '../images/play.png';
import pauseIcon from '../images/pause.png';
import stopIcon from '../images/stop.png';
import togglePhaseIcon from '../images/togglePhase.png';
import settingsIcon from '../images/settings.png';
import acceptIcon from '../images/accept.png';
import increaseIcon from '../images/increase.png';
import decreaseIcon from '../images/decrease.png';

export const Buttons = (props) => {
    return (
        <div className={styles.buttonsContainer}>
            <Button 
                currentFunction={props.leftButtonFunction}
                functions={[props.toggleSettingsMode, props.stopTimer, props.decreaseTimeSetting]}
                icons={[settingsIcon, stopIcon, decreaseIcon]} 
                isCenterButton={false}
            />

            <Button 
                currentFunction={props.centerButtonFunction}
                functions={[props.startTimer, props.pauseTimer, props.acceptWorkTime, props.acceptRestTime]}
                icons={[playIcon, pauseIcon, acceptIcon]} 
                isCenterButton={true}
            />

            <Button 
                currentFunction={props.rightButtonFunction}
                functions={[props.togglePhase, props.increaseTimeSetting]}
                icons={[togglePhaseIcon, increaseIcon]} 
                isCenterButton={false}
            />
        </div>
    )
};