import React, { useState, useRef } from "react";

const Stopwatch: React.FC = () => {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const intervalRef = useRef<number | null>(null);

  const handleStart = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = window.setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }
  };

  const handleStop = () => {
    if (isRunning) {
      setIsRunning(false);
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  };

  const handleReset = () => {
    setTime(0);
  };

  const formatTime = (milliseconds: number): string => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const centiseconds = Math.floor((milliseconds % 1000) / 10);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}.${centiseconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="stopwatch">
      <div className="stopwatch-timer">{formatTime(time)}</div>
      <div className="stopwatch-buttons">
      <button className="start-button stopwatch-button" onClick={handleStart} disabled={isRunning}>
        Start
      </button>
      <button className="stop-button stopwatch-button" onClick={handleStop} disabled={!isRunning}>
        Stop
      </button>
      <button className="reset-button stopwatch-button" onClick={handleReset} disabled={isRunning}>
        Reset
      </button>
      </div>
    </div>
  );
};

export default Stopwatch;