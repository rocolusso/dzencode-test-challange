// server.js
const express = require('express');
const { createServer } = require('http');
const next = require('next');
const { Server } = require('socket.io');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const expressApp = express();
    const httpServer = createServer(expressApp);
    const io = new Server(httpServer);

    // 1. Socket.io логика
    io.on('connection', (socket) => {
        console.log('Client connected:', socket.id);
        io.emit('active-sessions', io.engine.clientsCount);

        socket.on('disconnect', () => {
            io.emit('active-sessions', io.engine.clientsCount);
        });
    });

    // 2. Ваши кастомные Express API (если нужны)
    expressApp.get('/api/test', (req, res) => {
        res.json({ message: 'Это Express сервер' });
    });

    // 3. ОБЯЗАТЕЛЬНО: Всё остальное отдает Next.js
    expressApp.all('*', (req, res) => {
        return handle(req, res);
    });

    httpServer.listen(3000, (err) => {
        if (err) throw err;
        console.log('> Ready on http://localhost:3000');
    });
});
