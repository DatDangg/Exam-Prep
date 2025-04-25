import React, { useEffect, useImperativeHandle, useState, forwardRef } from "react";
import styles from '../pages/PracticePage/PracticeTest/PracticeTest.module.css';

const CountdownTimer = forwardRef(({ initialSeconds = 3600, onTimeUp }, ref) => {
    const [timeLeft, setTimeLeft] = useState(() => {
        const savedEndTime = localStorage.getItem("countdownEndTime");
        if (savedEndTime) {
            const remaining = Math.floor((+savedEndTime - Date.now()) / 1000);
            return remaining > 0 ? remaining : 0;
        } else {
            const newEndTime = Date.now() + initialSeconds * 1000;
            localStorage.setItem("countdownEndTime", newEndTime);
            return initialSeconds;
        }
    });

    useEffect(() => {
        if (timeLeft <= 0) return;

        const interval = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(interval);
                    onTimeUp?.();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [timeLeft]);

    useImperativeHandle(ref, () => ({
        getTimeTaken: () => initialSeconds - timeLeft,
    }));

    const formatTime = (seconds) => {
        const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
        const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
        const secs = String(seconds % 60).padStart(2, "0");
        return `${hrs}:${mins}:${secs}`;
    };

    return (
        <div className={styles.time}>
            <svg className={styles.icon} width="24" height="24" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="7.25" stroke="currentColor" strokeWidth="2"></circle>
                <path stroke="currentColor" strokeWidth="2" d="M12 8V12L14 14"></path>
            </svg>
            {formatTime(timeLeft)}
        </div>
    );
})

export default CountdownTimer;
