let editIndex = -1;

function cadastrarFuncionario(e) {
  e.preventDefault();

  const funcionario = {
    nome: document.getElementById("nome").value,
    idade: document.getElementById("idade").value,
    cargo: document.getElementById("cargo").value,
    salario: document.getElementById("salario").value,
    departamento: document.getElementById("departamento").value,
  };

  let funcionarios = JSON.parse(localStorage.getItem("funcionarios")) || [];

  if (editIndex >= 0) {
    funcionarios[editIndex] = funcionario;
    editIndex = -1;
    document.getElementById("submitBtn").textContent = "Cadastrar";
  } else {
    funcionarios.push(funcionario);
  }

  localStorage.setItem("funcionarios", JSON.stringify(funcionarios));

  carregarFuncionarios();
  e.target.reset();
}

function editarFuncionario(index) {
  let funcionarios = JSON.parse(localStorage.getItem("funcionarios")) || [];
  let f = funcionarios[index];

  document.getElementById("nome").value = f.nome;
  document.getElementById("idade").value = f.idade;
  document.getElementById("cargo").value = f.cargo;
  document.getElementById("salario").value = f.salario;
  document.getElementById("departamento").value = f.departamento;
  document.getElementById("editIndex").value = index;

  editIndex = index;
  document.getElementById("submitBtn").textContent = "Atualizar";
}

function carregarFuncionarios() {
  const tabela = document.querySelector("#tabela-funcionarios tbody");
  tabela.innerHTML = "";

  let funcionarios = JSON.parse(localStorage.getItem("funcionarios")) || [];

  funcionarios.forEach((f, index) => {
    let tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${f.nome}</td>
      <td>${f.idade}</td>
      <td>${f.cargo}</td>
      <td>${f.salario}</td>
      <td>${f.departamento}</td>
      <td>
        <button onclick="mostrarFuncionario(${index})">Ver</button>
        <button onclick="editarFuncionario(${index})">Editar</button>
        <button onclick="removerFuncionario(${index})">Remover</button>
      </td>
    `;

    tabela.appendChild(tr);
  });
}

function mostrarFuncionario(index) {
  let funcionarios = JSON.parse(localStorage.getItem("funcionarios")) || [];
  let f = funcionarios[index];
  alert(
    `Nome: ${f.nome}\nIdade: ${f.idade}\nCargo: ${f.cargo}\nSalário: ${f.salario}\nDepartamento: ${f.departamento}`
  );
}

function removerFuncionario(index) {
  let funcionarios = JSON.parse(localStorage.getItem("funcionarios")) || [];
  funcionarios.splice(index, 1); 
  localStorage.setItem("funcionarios", JSON.stringify(funcionarios));
  carregarFuncionarios(); 
}

window.onload = carregarFuncionarios;