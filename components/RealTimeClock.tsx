'use client'
import React, { useState, useEffect } from 'react';

export default function RealTimeClock() {
    const [time, setTime] = useState<Date | null>(null);

    useEffect(() => {
        setTime(new Date());

        const timerId = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timerId);
    }, []);

    if (!time) {
        return (
            <div className="text-end">
                <div className="text-dark">Загрузка...</div>
                <div className="text-muted small">-- ---, ---- &nbsp; <span className="text-success">⏱ --:--</span></div>
            </div>
        );
    }


    const dayName = time.toLocaleDateString('ru-RU', { weekday: 'long' });
    const dateStr = time.toLocaleDateString('ru-RU', { day: '2-digit', month: 'short', year: 'numeric' });
    const timeStr = time.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });

    return (
        <div className="text-end">

            <div className="text-dark text-capitalize">{dayName}</div>
            <div className="text-muted small">
                {dateStr.replace(' г.', '')} &nbsp; <span className="text-success">⏱ {timeStr}</span>
            </div>
        </div>
    );
}
