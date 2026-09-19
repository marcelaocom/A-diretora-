// ==========================================
// MUSIC PILOT CORE - MÓDULO TÁTICO DUPLO (v2.0)
// ==========================================

window.MusicPilot = {
    audioEmMemoria: null,
    audioIdAtual: null,
    mediaRecorder: null,
    audioChunks: [],

    // --- MODO 1: IA / TEXTO (Ordens Rápidas) ---
    processarTextoIA: async function(textoFalado) {
        atualizarTerminal("A ENVIAR COMANDO IA PARA A VERCEL...");
        
        // [ETAPA 2] Aqui entrará o fetch para a API da Vercel
        // const response = await fetch('/api/diretora/texto', { ... });
        
        setTimeout(() => atualizarTerminal("COMANDO IA PROCESSADO. [SIMULAÇÃO]"), 1500);
    },

    // --- MODO 2: RÁDIO / ÁUDIO (Gravação Física) ---
    iniciarGravacaoRadio: async function() {
        try {
            // Pede permissão e abre o microfone real do aparelho
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            this.mediaRecorder = new MediaRecorder(stream);
            this.audioChunks = [];

            this.mediaRecorder.ondataavailable = e => {
                if (e.data.size > 0) this.audioChunks.push(e.data);
            };

            this.mediaRecorder.onstop = () => {
                // Empacota o áudio num arquivo .webm quando o dedo solta o botão
                const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
                this.transmitirPacoteRadio(audioBlob);
                
                // Desliga o microfone para poupar bateria
                stream.getTracks().forEach(track => track.stop());
            };

            this.mediaRecorder.start();
        } catch (err) {
            atualizarTerminal("ERRO: MICROFONE BLOQUEADO OU INACESSÍVEL.");
            console.error(err);
        }
    },

    pararGravacaoRadio: function() {
        if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
            this.mediaRecorder.stop();
        }
    },

    transmitirPacoteRadio: async function(audioBlob) {
        atualizarTerminal("A TRANSMITIR ARQUIVO PARA O SUPABASE...");
        
        // [ETAPA 2/3] Aqui faremos o upload do Blob para o Supabase Storage via Vercel
        
        setTimeout(() => atualizarTerminal("PACOTE ENTREGUE NA NAVE MÃE. [SIMULAÇÃO]"), 1500);
    },

    // --- MÓDULO VOLÁTIL (RECEBIMENTO E AUTODESTRUIÇÃO) ---
    simularChegadaMensagem: function(urlAudioMock, idMensagem) {
        atualizarTerminal("ALERTA: MENSAGEM SECRETA NA ESCUTA.");
        this.audioIdAtual = idMensagem;
        
        // Injeta o áudio diretamente na memória RAM (sem guardar ficheiro)
        // Usando um som de bip genérico para testes
        this.audioEmMemoria = new Audio('https://www.soundjay.com/buttons/beep-01a.mp3'); 
        
        // Troca os painéis
        document.getElementById('mainControlPanel').classList.add('hidden');
        document.getElementById('playerVolatil').classList.remove('hidden');
    },

    tocarAudioVolatil: function() {
        if(this.audioEmMemoria) {
            atualizarTerminal("A REPRODUZIR GRAVAÇÃO TÁTICA...");
            this.audioEmMemoria.play();
        }
    },

    destruirAudioVolatil: function() {
        atualizarTerminal("A DESTRUIR EVIDÊNCIAS LOCAIS...");
        
        // 1. Mata a RAM
        if(this.audioEmMemoria) {
            this.audioEmMemoria.pause();
            this.audioEmMemoria = null; 
        }
        
        // 2. Avisa a nuvem (Supabase) para apagar o arquivo do Galpão
        atualizarTerminal(`A EXCLUIR ID ${this.audioIdAtual} NO SERVIDOR...`);
        this.audioIdAtual = null;

        // 3. Restaura o painel
        setTimeout(() => {
            document.getElementById('playerVolatil').classList.add('hidden');
            document.getElementById('mainControlPanel').classList.remove('hidden');
            atualizarTerminal("PAINEL LIMPO E OPERACIONAL.");
        }, 1000);
    }
};
