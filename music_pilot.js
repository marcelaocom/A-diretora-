// ==========================================
// MUSIC PILOT CORE - MÓDULO TÁTICO DUPLO
// ==========================================

const MusicPilot = {
    audioEmMemoria: null, // O "Buffer" que guarda o áudio sem baixar pro celular
    audioIdAtual: null,
    
    // --- FUNÇÕES DA INTERFACE ---
    log: function(msg) {
        const consoleEl = document.getElementById('debugConsole');
        const span = document.createElement('div');
        span.textContent = `> ${msg}`;
        span.className = 'text-green-500';
        consoleEl.appendChild(span);
        consoleEl.scrollTop = consoleEl.scrollHeight;
    },

    // --- MODO 1: IA / TEXTO (Processamento Rápido) ---
    processarTextoIA: async function(textoFalado) {
        this.log(`[IA] Comando reconhecido: "${textoFalado}"`);
        this.log("[IA] Solicitando processamento na Nave Mãe...");
        
        // Na Etapa 2, conectaremos isso à Vercel
        // const response = await fetch('/api/diretora/texto', { ... });
        
        setTimeout(() => this.log("[IA] Comando processado com sucesso. (Simulação)"), 1000);
    },

    // --- MODO 2: RÁDIO / ÁUDIO (Gravação Física) ---
    iniciarGravacaoRadio: async function() {
        this.log("[RÁDIO] Gravando áudio tático...");
        // A lógica do MediaRecorder entrará aqui na Etapa 2 quando ligarmos a Vercel
    },

    pararGravacaoRadio: async function() {
        this.log("[RÁDIO] Áudio finalizado. Transmitindo pacote...");
        // O upload do arquivo .webm pro Supabase acontecerá aqui na Etapa 3
    },

    // --- MÓDULO DE RECEBIMENTO E AUTODESTRUIÇÃO ---
    // Simula a chegada de uma mensagem (chamaremos via WebSocket no futuro)
    simularChegadaMensagem: function(urlAudioMock, idMensagem) {
        this.log("[SISTEMA] Alerta: Nova mensagem tática na escuta.");
        this.audioIdAtual = idMensagem;
        this.audioEmMemoria = new Audio(urlAudioMock);
        
        // Oculta os botões de gravação e mostra o painel volátil
        document.getElementById('mainControlPanel').classList.add('hidden');
        document.getElementById('playerVolatil').classList.remove('hidden');
        
        this.tocarAudioVolatil();
    },

    tocarAudioVolatil: function() {
        if(this.audioEmMemoria) {
            this.log("[PLAYER] Reproduzindo fita...");
            this.audioEmMemoria.play();
        }
    },

    destruirAudioVolatil: function() {
        this.log("[SISTEMA] Destruindo evidências locais...");
        
        // 1. Mata o áudio da memória RAM
        if(this.audioEmMemoria) {
            this.audioEmMemoria.pause();
            this.audioEmMemoria = null; 
        }
        
        // 2. Avisa a nuvem para apagar o arquivo do galpão (Faremos na Etapa 3)
        this.log(`[SUPABASE] Comando de exclusão enviado para ID: ${this.audioIdAtual}`);
        this.audioIdAtual = null;

        // 3. Limpa a tela
        document.getElementById('playerVolatil').classList.add('hidden');
        document.getElementById('mainControlPanel').classList.remove('hidden');
        this.log("[SISTEMA] Painel limpo e pronto.");
    }
};

// ==========================================
// CONTROLES DE BOTÃO (TOUCH/MOUSE)
// ==========================================

// Variáveis nativas de conversão de voz (Para o Botão Texto)
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;
if(recognition) recognition.lang = 'pt-BR';

// Botão 1: TEXTO / IA
const btnText = document.getElementById('btnText');
btnText.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    btnText.classList.add('recording-text');
    document.getElementById('iconText').classList.add('pulse-icon');
    document.getElementById('labelText').textContent = "ESCUTANDO";
    document.getElementById('labelText').classList.replace('text-gray-400', 'text-white');
    if(recognition) recognition.start();
});

btnText.addEventListener('pointerup', (e) => {
    e.preventDefault();
    btnText.classList.remove('recording-text');
    document.getElementById('iconText').classList.remove('pulse-icon');
    document.getElementById('labelText').textContent = "IA / TEXTO";
    document.getElementById('labelText').classList.replace('text-white', 'text-gray-400');
    if(recognition) recognition.stop();
});

if(recognition) {
    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        MusicPilot.processarTextoIA(transcript);
    };
}

// Botão 2: ÁUDIO / RÁDIO
const btnRadio = document.getElementById('btnRadio');
btnRadio.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    btnRadio.classList.add('recording-audio');
    document.getElementById('iconRadio').classList.add('pulse-icon');
    document.getElementById('labelRadio').textContent = "GRAVANDO";
    document.getElementById('labelRadio').classList.replace('text-gray-400', 'text-white');
    MusicPilot.iniciarGravacaoRadio();
});

btnRadio.addEventListener('pointerup', (e) => {
    e.preventDefault();
    btnRadio.classList.remove('recording-audio');
    document.getElementById('iconRadio').classList.remove('pulse-icon');
    document.getElementById('labelRadio').textContent = "RÁDIO PURO";
    document.getElementById('labelRadio').classList.replace('text-white', 'text-gray-400');
    MusicPilot.pararGravacaoRadio();
});
