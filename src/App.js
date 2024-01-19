import { useState, useEffect } from 'react';
import styles from './App.module.css';
import TimerContainer from './TimerContainer.js';
import Credits from './Credits.js';

function App() {
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsHidden(false);
    }, 500);
  }, [])

  return (
    <div className={`${styles.container} ${isHidden ? styles.hiddenContainer : ''}`}>
      <TimerContainer />
      <Credits />
    </div>
  );
}

export default App;