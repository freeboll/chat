const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 5050 }); 

server.on('connection', (ws) => {
    console.log('Новое соединение');

    // Обработчик получения сообщений от клиента
    ws.on('message', (message) => {
        console.log('Получено сообщение:', message);
        
        // Отправляем обратно всем клиентам
        server.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message); // Отправляем сообщение всем подключенным клиентам
            }
        });
    });

    // Обработчик закрытия соединения
    ws.on('close', () => {
        console.log('Соединение закрыто');
    });
});

console.log('Сервер запущен на порту 5050');
