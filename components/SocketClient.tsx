'use client';

import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io();

export default function SocketClient() {
    const [sessions, setSessions] = useState(0);

    useEffect(() => {
        socket.on('active-sessions', (count) => {
            setSessions(count);
        });

        return () => {
            socket.off('active-sessions');
        };
    }, []);

    return <div>Активных сессий: {sessions}</div>;
}
