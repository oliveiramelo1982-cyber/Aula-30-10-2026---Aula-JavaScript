/* INOVA9 — interface: DOM, validação e eventos. */
const formulario = document.getElementById("form-registro");
const corpoTabela = document.getElementById("corpo-tabela");
const estadoVazio = document.getElementById("estado-vazio");
const campoBusca = document.getElementById("busca-registros");
const campoIdEdicao = document.getElementById("id-edicao");
const campoData = document.getElementById("data-registro");
const campoMaquina = document.getElementById("maquina");
const campoResponsavel = document.getElementById("responsavel");
const campoPlanejada = document.getElementById("producao-planejada");
const campoProduzidas = document.getElementById("pecas-produzidas");
const campoPerdidas = document.getElementById("pecas-perdidas");
const campoAgua = document.getElementById("agua-litros");
const campoEnergia = document.getElementById("energia-kwh");
const campoReciclado = document.getElementById("material-reciclado");
const mensagemFeedback = document.getElementById("mensagem-feedback");

function escaparHTML(valor) {
    const caracteres = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" };
    return String(valor).replace(/[&<>"']/g, caractere => caracteres[caractere]);
}

function formatarNumero(valor) {
    return new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 2 }).format(Number(valor) || 0);
}

function formatarData(data) {
    if (!data) return "-";
    const partes = data.split("-");
    return partes.length === 3 ? `${partes[2]}/${partes[1]}/${partes[0]}` : data;
}

function mostrarFeedback(mensagem, tipo) {
    mensagemFeedback.textContent = mensagem;
    mensagemFeedback.className = `feedback ${tipo}`;
}

function limparFeedback() {
    mensagemFeedback.textContent = "";
    mensagemFeedback.className = "feedback";
}

function atualizarIndicadores(lista) {
    const produzidas = lista.reduce((soma, item) => soma + Number(item.pecasProduzidas || 0), 0);
    const perdidas = lista.reduce((soma, item) => soma + Number(item.pecasPerdidas || 0), 0);
    const agua = lista.reduce((soma, item) => soma + Number(item.aguaLitros || 0), 0);
    document.getElementById("total-registros").textContent = formatarNumero(lista.length);
    document.getElementById("total-produzidas").textContent = formatarNumero(produzidas);
    document.getElementById("total-perdidas").textContent = formatarNumero(perdidas);
    document.getElementById("total-agua").textContent = `${formatarNumero(agua)} L`;
}

function atualizarTabela() {
    const listaCompleta = listar();
    const termo = campoBusca.value.trim().toLocaleLowerCase("pt-BR");
    const listaFiltrada = listaCompleta.filter(item =>
        String(item.maquina || "").toLocaleLowerCase("pt-BR").includes(termo) ||
        String(item.responsavel || "").toLocaleLowerCase("pt-BR").includes(termo)
    );

    corpoTabela.innerHTML = "";
    listaFiltrada.forEach(item => {
        const linha = document.createElement("tr");
        linha.innerHTML = `
            <td>${escaparHTML(formatarData(item.dataRegistro))}</td>
            <td><strong>${escaparHTML(item.maquina)}</strong><span class="subtexto">${escaparHTML(item.responsavel)}</span></td>
            <td>${formatarNumero(item.producaoPlanejada)}</td>
            <td>${formatarNumero(item.pecasProduzidas)}</td>
            <td>${formatarNumero(item.pecasPerdidas)}</td>
            <td>${formatarNumero(item.aguaLitros)}</td>
            <td>${formatarNumero(item.energiaKwh)}</td>
            <td>${formatarNumero(item.materialRecicladoKg)}</td>
            <td><div class="acoes-linha">
                <button type="button" class="botao-acao" data-acao="editar" data-id="${Number(item.id)}">Editar</button>
                <button type="button" class="botao-acao excluir" data-acao="excluir" data-id="${Number(item.id)}">Excluir</button>
            </div></td>`;
        corpoTabela.appendChild(linha);
    });

    estadoVazio.hidden = listaFiltrada.length !== 0;
    document.getElementById("quantidade-exibida").textContent = `Exibindo ${listaFiltrada.length} de ${listaCompleta.length} registro(s)`;
    atualizarIndicadores(listaCompleta);
}

function validar(dados) {
    if (!dados.dataRegistro) {
        mostrarFeedback("Informe a data do registro.", "erro"); campoData.focus(); return false;
    }
    if (dados.maquina.trim() === "") {
        mostrarFeedback("Informe o nome da máquina.", "erro"); campoMaquina.focus(); return false;
    }
    if (dados.responsavel.trim() === "") {
        mostrarFeedback("Informe o responsável pelo registro.", "erro"); campoResponsavel.focus(); return false;
    }

    const camposNumericosObrigatorios = [campoPlanejada, campoProduzidas, campoPerdidas, campoAgua, campoEnergia, campoReciclado];
    if (camposNumericosObrigatorios.some(campo => campo.value.trim() === "")) {
        mostrarFeedback("Preencha todos os campos numéricos obrigatórios.", "erro");
        return false;
    }

    const numericos = [
        { nome: "produção planejada", valor: dados.producaoPlanejada },
        { nome: "peças produzidas", valor: dados.pecasProduzidas },
        { nome: "peças perdidas", valor: dados.pecasPerdidas },
        { nome: "água utilizada", valor: dados.aguaLitros },
        { nome: "energia utilizada", valor: dados.energiaKwh },
        { nome: "material reciclado", valor: dados.materialRecicladoKg }
    ];
    for (const campo of numericos) {
        if (!Number.isFinite(campo.valor) || campo.valor < 0) {
            mostrarFeedback(`Verifique o valor de ${campo.nome}. Ele deve ser igual ou maior que zero.`, "erro");
            return false;
        }
    }
    if (dados.producaoPlanejada <= 0) {
        mostrarFeedback("A produção planejada deve ser maior que zero.", "erro"); campoPlanejada.focus(); return false;
    }
    if (!Number.isInteger(dados.producaoPlanejada) || !Number.isInteger(dados.pecasProduzidas) || !Number.isInteger(dados.pecasPerdidas)) {
        mostrarFeedback("As quantidades de peças devem ser números inteiros.", "erro"); return false;
    }
    if (dados.pecasPerdidas > dados.pecasProduzidas) {
        mostrarFeedback("As peças perdidas não podem ser maior que as peças produzidas.", "erro"); campoPerdidas.focus(); return false;
    }
    return true;
}

function obterDadosFormulario() {
    return {
        dataRegistro: campoData.value,
        maquina: campoMaquina.value.trim(),
        responsavel: campoResponsavel.value.trim(),
        producaoPlanejada: Number(campoPlanejada.value),
        pecasProduzidas: Number(campoProduzidas.value),
        pecasPerdidas: Number(campoPerdidas.value),
        aguaLitros: Number(campoAgua.value),
        energiaKwh: Number(campoEnergia.value),
        materialRecicladoKg: Number(campoReciclado.value)
    };
}

function definirDataAtual() {
    const hoje = new Date();
    campoData.value = `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, "0")}-${String(hoje.getDate()).padStart(2, "0")}`;
}

function limparFormulario() {
    formulario.reset();
    campoIdEdicao.value = "";
    definirDataAtual();
    document.getElementById("titulo-formulario").textContent = "Novo registro";
    document.getElementById("texto-botao").textContent = "Salvar registro";
    document.getElementById("cancelar-edicao").hidden = true;
}

function preencherFormularioEdicao(id) {
    const item = prepararEdicao(id);
    if (!item) return;
    campoIdEdicao.value = item.id;
    campoData.value = item.dataRegistro;
    campoMaquina.value = item.maquina;
    campoResponsavel.value = item.responsavel;
    campoPlanejada.value = item.producaoPlanejada;
    campoProduzidas.value = item.pecasProduzidas;
    campoPerdidas.value = item.pecasPerdidas;
    campoAgua.value = item.aguaLitros;
    campoEnergia.value = item.energiaKwh;
    campoReciclado.value = item.materialRecicladoKg;
    document.getElementById("titulo-formulario").textContent = "Editar registro";
    document.getElementById("texto-botao").textContent = "Salvar alterações";
    document.getElementById("cancelar-edicao").hidden = false;
    mostrarFeedback("Registro carregado para edição.", "sucesso");
    formulario.scrollIntoView({ behavior: "smooth", block: "start" });
    campoMaquina.focus({ preventScroll: true });
}

// CREATE e UPDATE compartilham o mesmo formulário.
formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();
    limparFeedback();
    const dados = obterDadosFormulario();
    if (!validar(dados)) return;

    const idEdicao = campoIdEdicao.value;
    let salvou = false;
    if (idEdicao) {
        salvou = atualizar(Number(idEdicao), dados);
        if (salvou) mostrarFeedback("Registro atualizado com sucesso!", "sucesso");
    } else {
        salvou = criar(dados);
        if (salvou) mostrarFeedback("Registro cadastrado com sucesso!", "sucesso");
    }
    if (salvou) {
        limparFormulario();
        atualizarTabela();
    }
});

// Delegação de eventos para os botões de editar e excluir da tabela.
corpoTabela.addEventListener("click", function (evento) {
    const botao = evento.target.closest("button[data-acao]");
    if (!botao) return;
    const id = Number(botao.dataset.id);
    if (botao.dataset.acao === "editar") preencherFormularioEdicao(id);
    if (botao.dataset.acao === "excluir") {
        const excluiu = excluir(id);
        if (excluiu) {
            if (Number(campoIdEdicao.value) === id) limparFormulario();
            mostrarFeedback("Registro excluído com sucesso.", "sucesso");
            atualizarTabela();
        }
    }
});

document.getElementById("cancelar-edicao").addEventListener("click", function () {
    limparFormulario();
    limparFeedback();
});
campoBusca.addEventListener("input", atualizarTabela);

definirDataAtual();
atualizarTabela();
