function clicou(){
    alert("Fui clicado!")
}

function cadastrarFuncionario(event) {
    event.preventDefault();

    const id = document.getElementById('campoid').value;
    const nome = document.getElementById('nome').value;
    const salario = document.getElementById('salario').value;
    const cargo = document.getElementById('cargo').value;
    const departamento = document.getElementById('departamento').value;

    if (!id || !nome || !salario || !cargo || !departamento) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    const lista = document.getElementById('lista-funcionarios');
    const item = document.createElement('li');
    item.textContent = `ID: ${id} - Nome: ${nome} - Salário: R$${salario} - Cargo: ${cargo} - Departamento: ${departamento}`;
    lista.appendChild(item);

    // Limpar o formulário após cadastro
    event.target.reset();
}
