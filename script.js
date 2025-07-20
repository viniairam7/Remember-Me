// script.js
function abrirAppBaseadoNoTexto(texto) {
    texto = texto.toLowerCase();

    if (texto.includes('data') || texto.includes('aniversário') || texto.includes('feriado') || texto.includes('reunião')) {
        window.location.href = 'calshow://'; // iOS Calendar
    } else if (texto.includes('tempo') || texto.includes('cronômetro') || texto.includes('minutos') || texto.includes('horas')) {
        window.location.href = 'clock://'; // iOS Clock
    } else if (texto.includes('mensagem') || texto.includes('ligação') || texto.includes('whatsapp')) {
        window.location.href = 'https://wa.me/';
    } else if (texto.includes('anotação') || texto.includes('nota') || texto.includes('notas')) {
        window.location.href = 'mobilenotes://'; // iOS Notes
    }
}

// Nova função para lidar com a entrada do usuário e agendar o lembrete
function handleUserInput() {
    const inputElement = document.getElementById('userInput');
    const userText = inputElement.value.trim();

    if (userText) {
        // Exibir a mensagem do usuário no chat
        addMessageToChat(userText, 'user');

        // Chamar a função para abrir o app relacionado
        abrirAppBaseadoNoTexto(userText);

        // Agendar notificação de lembrete
        scheduleNotification(userText);

        // Limpar o input
        inputElement.value = '';
    }
}

// Função para adicionar mensagens ao chat
function addMessageToChat(text, sender) {
    const chatContainer = document.getElementById('chat');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    messageDiv.textContent = text;
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight; // Rolar para a última mensagem
}

// Função para agendar a notificação
function scheduleNotification(message) {
    // Verificar se o Service Worker está registrado e se as notificações são suportadas
    if ('serviceWorker' in navigator && 'Notification' in window) {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                // Notificação agendada para 10 minutos (600.000 milissegundos)
                setTimeout(() => {
                    navigator.serviceWorker.ready.then(registration => {
                        registration.showNotification('Lembrete do Me Lembre!', {
                            body: `Você escreveu: "${message}"`,
                            icon: './icon-192.png', // Ícone para a notificação
                            tag: 'lembrete-me-lembre' // Para evitar notificações duplicadas
                        });
                    });
                }, 10 * 60 * 1000); // 10 minutos
            } else {
                console.warn('Permissão para notificações não concedida.');
            }
        });
    } else {
        console.warn('Service Worker ou Notificações não suportadas neste navegador.');
    }
}

// Adicionar evento ao botão de envio (já existe no index.html)
// document.querySelector('button').addEventListener('click', handleUserInput); // Isso será chamado via onclick no HTML agora
