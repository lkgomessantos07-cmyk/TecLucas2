let funcionarios = [];
let editingIndex = null;

function cadastrarFuncionario(e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const salario = parseFloat(document.getElementById("salario").value);
    const cargo = document.getElementById("cargo").value;
    const CPF = document.getElementById("CPF").value;
    const idade = parseInt(document.getElementById("idade").value);
    const departamento = document.getElementById("departamento").value;
    const estadoCivil = document.querySelector("input[name='estadoCivil']:checked").value;

    const funcionario = { nome, salario, cargo, CPF, idade, departamento, estadoCivil };

    if (editingIndex !== null) {
        funcionarios[editingIndex] = funcionario;
        editingIndex = null;
        document.querySelector('button[type="submit"]').textContent = 'Cadastrar';
    } else {
        funcionarios.push(funcionario);
    }

    displayFuncionarios();
    document.querySelector('form').reset();
}

function displayFuncionarios() {
    const ul = document.getElementById('lista-funcionarios');
    ul.innerHTML = '';
    funcionarios.forEach((func, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div>
                Nome: ${func.nome}<br>
                Salário: R$ ${func.salario}<br>
                Cargo: ${func.cargo}<br>
                CPF: ${func.CPF}<br>
                Idade: ${func.idade} anos<br>
                Departamento: ${func.departamento}<br>
                Estado Civil: ${func.estadoCivil}
            </div>
            <div class="actions">
                <button onclick="editarFuncionario(${index})">Editar</button>
                <button onclick="removerFuncionario(${index})">Remover</button>
            </div>
        `;
        ul.appendChild(li);
    });
}

function editarFuncionario(index) {
    const func = funcionarios[index];
    document.getElementById('nome').value = func.nome;
    document.getElementById('salario').value = func.salario;
    document.getElementById('cargo').value = func.cargo;
    document.getElementById('CPF').value = func.CPF;
    document.getElementById('idade').value = func.idade;
    document.getElementById('departamento').value = func.departamento;
    document.querySelector(`input[name="estadoCivil"][value="${func.estadoCivil}"]`).checked = true;
    editingIndex = index;
    document.querySelector('button[type="submit"]').textContent = 'Atualizar';
}

function removerFuncionario(index) {
    funcionarios.splice(index, 1);
    displayFuncionarios();
}
