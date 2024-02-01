import { useState, useEffect } from 'react';
import styles from './Credits.module.css';

function Credits() {
    const [hasClickedTipLink, setHasClickedTipLink] = useState(false);

    useEffect(() => {
        const savedHasClickedTipLink = localStorage.getItem('hasClickedTipLink');

        if (savedHasClickedTipLink) {
            setHasClickedTipLink(true);
        }
    }, []);

    const saveHasClickedLink = () => {
        setHasClickedTipLink(true);
        localStorage.setItem('hasClickedTipLink', true);
    }

    return (
        <p className={`${styles.credits} ${hasClickedTipLink ? styles.hiddenCredits : ''}`}>Made by <a href='https://twitter.com/camacrain' target='_blank' onClick={() => saveHasClickedLink()}>Cam Crain</a></p>
    )
}

export default Credits;