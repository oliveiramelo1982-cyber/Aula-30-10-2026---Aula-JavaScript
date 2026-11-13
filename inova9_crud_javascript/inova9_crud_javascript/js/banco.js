/* INOVA9 — camada única de acesso aos dados do localStorage. */
function carregarDados() {
    try {
        const json = localStorage.getItem(CHAVE_DADOS);
        if (json === null) return [];
        const lista = JSON.parse(json);
        if (!Array.isArray(lista)) throw new Error("O conteúdo salvo não é uma lista.");
        return lista;
    } catch (erro) {
        console.error("Erro ao carregar os dados:", erro);
        alert("Não foi possível carregar os registros. Verifique o armazenamento do navegador.");
        return [];
    }
}

function salvarDados(lista) {
    try {
        if (!Array.isArray(lista)) throw new Error("A lista de registros é inválida.");
        localStorage.setItem(CHAVE_DADOS, JSON.stringify(lista));
        return true;
    } catch (erro) {
        console.error("Erro ao salvar os dados:", erro);
        alert("Não foi possível salvar os dados. Verifique o espaço disponível no navegador.");
        return false;
    }
}

// Insere os exemplos somente na primeira execução, sem sobrescrever registros existentes.
function inicializarArmazenamento() {
    try {
        if (localStorage.getItem(CHAVE_DADOS) === null) {
            localStorage.setItem(CHAVE_DADOS, JSON.stringify(DADOS_INICIAIS));
        }
    } catch (erro) {
        console.error("Erro ao inicializar o armazenamento:", erro);
        alert("Não foi possível preparar o armazenamento local do sistema.");
    }
}

inicializarArmazenamento();
