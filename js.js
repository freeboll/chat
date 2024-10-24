const socket = new WebSocket('ws://127.0.0.1:5500/html.html');
document.getElementById("send-button").addEventListener("click", function () {
  sendMessage();
});
function sendMessage() {
  const messageInput = document.getElementById("message-input");
  const message = messageInput.value.trim();

  if (message !== "") {
    addMessageToChat(message, "You");
    messageInput.value = "";
    socket.send(JSON.stringify({ message }));
        messageInput.value = '';
  }
}
function addMessageToChat(content, sender) {
  const messageContainer = document.getElementById("message-container");
  const messageElement = document.createElement("div");
  messageElement.classList.add("message");
  messageElement.textContent = `${sender}: ${content}`;
  messageContainer.appendChild(messageElement);
  messageContainer.scrollTop = messageContainer.scrollHeight;
}


socket.addEventListener('open', function (event) {
  console.log('Соединение установлено');
});

socket.addEventListener('message', function (event) {
  const data = JSON.parse(event.data);
  addMessageToChat(data.message, "Server"); // Выводим сообщения от сервера
});
const sendButton = document.getElementById("send-button");
sendButton.disabled = true; // Отключаем кнопку до установки соединения

socket.addEventListener('open', function (event) {
    console.log('Соединение установлено');
    sendButton.disabled = false; // Включаем кнопку, когда соединение открыто
});


