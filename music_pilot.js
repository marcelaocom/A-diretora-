// ==========================================
// MUSIC PILOT CORE (NÚCLEO M1)
// ==========================================
const MusicPilot = {
    
    // Função principal de análise lógica
    processarComando: function(textoFalado) {
        const texto = textoFalado.toLowerCase();
        let resposta = { acao: "registrar_log", dados: { nota: textoFalado } };

        console.log("[M1 CORE] Analisando sintaxe neural...");

        // Regras de negócio da M1 (Aqui entrará a API do Gemini futuramente)
        if (texto.includes("despesa") || texto.includes("gasto") || texto.includes("paguei")) {
            resposta = {
                acao: "lancar_despesa",
                dados: {
                    descricao: textoFalado,
                    valor: 150.00, // Valor tático para o teste
                    categoria: "Operacional M1",
                    forma_pagamento: "Pix"
                }
            };
        } 
        else if (texto.includes("agenda") || texto.includes("show")) {
            resposta = {
                acao: "consultar_agenda",
                dados: {
                    resposta_falada: "Operação confirmada. O próximo evento na base é no Bar do Zé."
                }
            };
        }

        console.log(`[M1 CORE] JSON de Saída: ${JSON.stringify(resposta)}`);
        return resposta;
    }
};