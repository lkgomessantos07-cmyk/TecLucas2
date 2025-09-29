// Constantes para IDs dos elementos do DOM
const ID_FORM_TAREFA = "form-tarefa";
const ID_CAMPO_TITULO = "campo-titulo";
const ID_CAMPO_DESCRICAO = "campo-descricao";
const ID_CAMPO_DATA_INICIO = "campo-data-inicio";
const ID_CAMPO_DATA_FINAL = "campo-data-final";
const ID_CAMPO_STATUS = "campo-status";
const ID_TABELA_TAREFAS = "tabela-tarefas";
const ID_CAMPO_PESQUISA = "campo-pesquisa";
const ID_BTN_PESQUISAR = "btn-pesquisar";

// Chave para localStorage
const CHAVE_LOCALSTORAGE = "tarefas";

// Função para cadastrar nova tarefa
function cadastrarTarefa(event) {
  event.preventDefault();

  const titulo = document.getElementById(ID_CAMPO_TITULO).value.trim();
  const descricao = document.getElementById(ID_CAMPO_DESCRICAO).value.trim();
  const dataInicio = document.getElementById(ID_CAMPO_DATA_INICIO).value;
  const dataFinal = document.getElementById(ID_CAMPO_DATA_FINAL).value;
  const status = document.getElementById(ID_CAMPO_STATUS).value;

  const novaTarefa = {
    id: Date.now(), // ID único
    titulo,
    descricao,
    dataInicio,
    dataFinal,
    status
  };

  const tarefas = JSON.parse(localStorage.getItem(CHAVE_LOCALSTORAGE)) || [];
  tarefas.push(novaTarefa);
  localStorage.setItem(CHAVE_LOCALSTORAGE, JSON.stringify(tarefas));

  document.getElementById(ID_FORM_TAREFA).reset();
  renderizarTabela();
}

// Função para listar tarefas
function renderizarTabela(termoBusca = '') {
  const tarefas = JSON.parse(localStorage.getItem(CHAVE_LOCALSTORAGE)) || [];
  const corpoTabela = document.querySelector(`#${ID_TABELA_TAREFAS} tbody`);
  corpoTabela.innerHTML = "";

  const tarefasFiltradas = termoBusca 
    ? tarefas.filter(tarefa => 
        tarefa.titulo.toLowerCase().includes(termoBusca.toLowerCase()) || 
        tarefa.descricao.toLowerCase().includes(termoBusca.toLowerCase())
      )
    : tarefas;

  tarefasFiltradas.forEach(tarefa => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${tarefa.titulo}</td>
      <td>${tarefa.descricao}</td>
      <td>${tarefa.dataInicio}</td>
      <td>${tarefa.dataFinal}</td>
      <td>${tarefa.status}</td>
    `;

    const tdAcoes = document.createElement("td");
    tdAcoes.classList.add("acoes");

    // Botão Editar
    const btnEditar = document.createElement("button");
    btnEditar.innerText = "Editar";
    btnEditar.classList.add("editar");
    btnEditar.onclick = () => editarTarefa(tarefa.id);

    // Botão Remover
    const btnRemover = document.createElement("button");
    btnRemover.innerText = "Remover";
    btnRemover.classList.add("remover");
    btnRemover.onclick = () => removerTarefa(tarefa.id);

    tdAcoes.appendChild(btnEditar);
    tdAcoes.appendChild(btnRemover);
    tr.appendChild(tdAcoes);
    corpoTabela.appendChild(tr);
  });
}

// Remover tarefa
function removerTarefa(id) {
  const tarefas = JSON.parse(localStorage.getItem(CHAVE_LOCALSTORAGE)) || [];
  const novasTarefas = tarefas.filter(t => t.id !== id);
  localStorage.setItem(CHAVE_LOCALSTORAGE, JSON.stringify(novasTarefas));
  renderizarTabela('');
}

// Editar tarefa (simples com prompt)
function editarTarefa(id) {
  const tarefas = JSON.parse(localStorage.getItem(CHAVE_LOCALSTORAGE)) || [];
  const tarefa = tarefas.find(t => t.id === id);
  if (!tarefa) return;

  const novoTitulo = prompt("Novo título:", tarefa.titulo);
  const novaDescricao = prompt("Nova descrição:", tarefa.descricao);
  const novaDataInicio = prompt("Nova data de início (AAAA-MM-DD):", tarefa.dataInicio);
  const novaDataFinal = prompt("Nova data final (AAAA-MM-DD):", tarefa.dataFinal);
  const novoStatus = prompt("Novo status (Pendente, Em andamento, Concluída):", tarefa.status);

  if (novoTitulo && novaDescricao && novaDataInicio && novaDataFinal && novoStatus) {
    tarefa.titulo = novoTitulo;
    tarefa.descricao = novaDescricao;
    tarefa.dataInicio = novaDataInicio;
    tarefa.dataFinal = novaDataFinal;
    tarefa.status = novoStatus;
    localStorage.setItem(CHAVE_LOCALSTORAGE, JSON.stringify(tarefas));
    renderizarTabela('');
  }
}

// Função para pesquisar tarefas
function pesquisarTarefas() {
  const termoBusca = document.getElementById(ID_CAMPO_PESQUISA).value.trim();
  renderizarTabela(termoBusca);
}

// Inicialização
renderizarTabela();

// Adicionar evento de clique ao botão de pesquisar
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById(ID_BTN_PESQUISAR).addEventListener('click', pesquisarTarefas);
});
