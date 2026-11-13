/* INOVA9 — funções responsáveis pelas quatro operações CRUD. */

// CREATE: adiciona um novo registro e salva a lista completa.
function criar(item) {
    const lista = carregarDados();
    item.id = Date.now();
    lista.push(item);
    return salvarDados(lista);
}

// READ: retorna todos os registros armazenados.
function listar() {
    return carregarDados();
}

// UPDATE: localiza pelo id e substitui os campos atualizados.
function atualizar(id, novosDados) {
    const lista = carregarDados();
    const indice = lista.findIndex(item => item.id === id);
    if (indice === -1) {
        alert("Registro não encontrado!");
        return false;
    }
    lista[indice] = { ...lista[indice], ...novosDados, id };
    return salvarDados(lista);
}

// Recupera um registro para preencher o formulário de edição.
function prepararEdicao(id) {
    const item = carregarDados().find(registro => registro.id === id);
    if (!item) alert("Não foi possível localizar o registro para edição.");
    return item || null;
}

// DELETE: pede confirmação e salva a lista sem o registro escolhido.
function excluir(id) {
    if (!confirm("Deseja realmente excluir este registro?")) return false;
    const listaAtual = carregarDados();
    const novaLista = listaAtual.filter(item => item.id !== id);
    if (novaLista.length === listaAtual.length) {
        alert("Registro não encontrado!");
        return false;
    }
    return salvarDados(novaLista);
}
