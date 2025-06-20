
let chat = document.getElementById('chat');
let awaitingLightTime = false;

function appendMessage(text, sender, withButton = false, buttonLink = '') {
    let messageDiv = document.createElement('div');
    messageDiv.className = 'message ' + sender;
    messageDiv.innerHTML = text;

    if (withButton) {
        let button = document.createElement('button');
        button.textContent = '📅 Abrir Calendário';
        button.onclick = function() {
            window.location.href = buttonLink;
        };
        messageDiv.appendChild(document.createElement('br'));
        messageDiv.appendChild(button);
    }

    chat.appendChild(messageDiv);
    chat.scrollTop = chat.scrollHeight;
}

function handleUserInput() {
    let input = document.getElementById('userInput');
    let userText = input.value.trim();
    if (userText === '') return;

    appendMessage(userText, 'user');
    input.value = '';

    let lowerInput = userText.toLowerCase();

    if (awaitingLightTime) {
        appendMessage('⏰ Lembrete criado para ' + userText + ': Não esquecer de desligar a luz! 💡', 'bot');
        awaitingLightTime = false;
        return;
    }

    if (lowerInput.includes('aniversário')) {
        appendMessage('🎉 Ótima ideia! Toque abaixo para abrir o app Calendário. 🗓️', 'bot', true, 'calshow://');
    } else if (lowerInput.includes('luz')) {
        appendMessage('🔌 Que horas você vai sair de casa?', 'bot');
        awaitingLightTime = true;
    } else {
        appendMessage('🤖 Ainda estou aprendendo a te ajudar com isso 😊', 'bot');
    }
}
