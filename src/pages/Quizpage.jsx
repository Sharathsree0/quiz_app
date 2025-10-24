import React, { useEffect, useRef, useState } from 'react'

export default function Quizpage() {
  const [lightColor, setLightColor] = useState('green');
    const timerIdRef = useRef(null);

  const startTrafficLight = () => {
    if (timerIdRef.current) {
      clearInterval(timerIdRef.current);
    }

    timerIdRef.current = setInterval(() => {
      setLightColor(prevColor => {
        if (prevColor === 'green') return 'red';
        if (prevColor === 'yellow') return 'green';
        if (prevColor === 'red') return 'yellow';
      });
    }, 3000); 
  };
  useEffect(() => {
    startTrafficLight();
    return () => clearInterval(timerIdRef.current);
  }, []);
  const handleStop = () => {
    clearInterval(timerIdRef.current);
    setLightColor('red');
  };

  return (
    <div>
      <div style={{
        width: '100px',
        height: '300px',
        backgroundColor: 'black',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '10px'
      }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: lightColor === 'red' ? 'red' : 'grey' }}></div>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: lightColor === 'yellow' ? 'yellow' : 'grey' }}></div>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: lightColor === 'green' ? 'green' : 'grey' }}></div>
      </div>
      <button onClick={handleStop}>Stop</button>
      <button onClick={startTrafficLight}>Restart</button>
    </div>
  );
}

