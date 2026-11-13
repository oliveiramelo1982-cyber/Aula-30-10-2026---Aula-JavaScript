# Inova9 — CRUD de Registros de Produção

**Atividade:** CRUD com JavaScript — Programação para WEB I  
**Grupo:** Inova9  
**Tema do PI:** Inova9 — acompanhamento do uso de recursos, produção e desperdícios nas empresas.

## Integrantes do grupo

| Aluno | RA |
|---|---:|
| Vitor Oliveira de Melo | 119074 |
| João Orlando | 118844 |
| Guilherme Santos | 118326 |
| Luiz Felipe | 119429 |
| Kauan Thomaz | 119260 |

> Confira a grafia dos nomes e complete eventuais sobrenomes conforme o cadastro oficial da turma antes da entrega.

## Sobre o sistema

O Inova9 permite cadastrar e acompanhar registros de produção. Cada registro reúne a máquina utilizada, o responsável, a data, a quantidade planejada e produzida, as peças perdidas, o consumo de água e energia e o material reciclado.

O sistema implementa as quatro operações do CRUD:
- **Create:** cadastrar um novo registro de produção.
- **Read:** listar os registros e consultar os indicadores.
- **Update:** editar um registro existente.
- **Delete:** excluir um registro após confirmação.

## Tecnologias e armazenamento

- HTML5 e CSS3.
- JavaScript puro, sem bibliotecas ou frameworks externos.
- `localStorage` do navegador para persistir os dados.

Os dados permanecem salvos no navegador utilizado. Como o armazenamento é local, os registros não são compartilhados automaticamente entre computadores ou navegadores diferentes.

## Como executar

1. Baixe ou clone este repositório.
2. Abra a pasta do projeto no Visual Studio Code.
3. Abra `index.html` no navegador. Também é possível usar a extensão Live Server.
4. Cadastre, edite e exclua registros para testar o CRUD.
5. Atualize a página: os registros devem continuar salvos no mesmo navegador.

## Organização dos arquivos

```text
inova9-crud-javascript/
├── README.md
├── index.html
├── css/estilo.css
├── dados/estrutura-dados.txt
└── js/
    ├── script-inicial.js
    ├── banco.js
    ├── crud.js
    └── interface.js
```

## Boas práticas utilizadas

- Separação dos arquivos por responsabilidade.
- Uso de `const` e `let`.
- Funções específicas para cada operação do CRUD.
- Validação dos campos antes de salvar.
- Tratamento de erros de leitura e gravação com `try/catch`.
- Confirmação antes de excluir um registro.
- Atualização dinâmica da interface sem recarregar a página.
- Identificação de cada registro por um `id`.

A estrutura dos campos e os dados iniciais estão documentados em `dados/estrutura-dados.txt`.
