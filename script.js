// script.js
const apiKey = 'YOUR_API_KEY'; //"Nhập API Key mà bạn đã tạo vào đây"
const apiUrl = 'https://api.openai.com/v1/engines/davinci/completions';

function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    appendMessage('user', userInput);
    document.getElementById('user-input').value = '';

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            prompt: userInput,
            max_tokens: 150
        })
    })
    .then(response => response.json())
    .then(data => {
        const botResponse = data.choices[0].text.trim();
        appendMessage('bot', botResponse);
    })
    .catch(error => console.error('Error:', error));
}

function appendMessage(sender, message) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add(sender === 'bot' ? 'bot-message' : 'user-message');
    messageElement.innerText = message;
    chatBox.appendChild(messageElement);
}
