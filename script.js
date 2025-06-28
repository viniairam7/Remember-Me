
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

document.querySelector('button').addEventListener('click', function() {
    const input = document.querySelector('input[type="text"]');
    abrirAppBaseadoNoTexto(input.value);
});
