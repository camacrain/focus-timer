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
        <p className={`${styles.credits} ${hasClickedTipLink ? styles.hiddenCredits : ''}`}>Like it? Help me make my first bucks on <a href='https://camcrain.gumroad.com/l/focustimer' target='_blank' onClick={() => saveHasClickedLink()}>Gumroad</a>!</p>
    )
}

export default Credits;