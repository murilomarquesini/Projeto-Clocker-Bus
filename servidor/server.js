
const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);

// O 'socket.io' é a mágica do tempo real (os "túneis")
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: "*", // Permite que o seu site (Front-end) se conecte de qualquer lugar
        methods: ["GET", "POST"]
    }
});


// Quando um celular/computador se conecta ao nosso servidor
io.on('connection', (socket) => {
    console.log('Um novo usuário se conectou! ID:', socket.id);

    socket.on('enviar_gps', (dadosDoGps) => { 
        socket.broadcast.emit('receber_gps', dadosDoGps);
    });

    // Quando o usuário fechar a aba do navegador
    socket.on('disconnect', () => {
        console.log('Usuário desconectou:', socket.id);
    });
});

const PORTA = 3000;

server.listen(PORTA, () => {
    console.log(`🚀 Servidor GPS rodando na porta ${PORTA}`);
    console.log(`Esperando a conexão dos motoristas e passageiros...`);
});