document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('task-list');
    let isEditing = false;
    let editingId = null;

    // Carregar tarefas do localStorage ao iniciar
    loadTasks();

    // Evento de submissão do formulário
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addTask();
    });

    // Event listeners para botões de editar e remover
    taskList.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-btn')) {
            const id = parseInt(e.target.dataset.id);
            removeTask(id);
        } else if (e.target.classList.contains('edit-btn')) {
            const id = parseInt(e.target.dataset.id);
            editTask(id);
        }
    });

    // Função para obter as tarefas salvas
    function getTasks() {
        const tasks = localStorage.getItem('tasks');
        return tasks ? JSON.parse(tasks) : [];
    }

    // Função para salvar as tarefas
    function saveTasks(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Função para adicionar ou atualizar uma tarefa
    function addTask() {
        const name = document.getElementById('task-name').value;
        const status = document.getElementById('task-status').value;
        const date = document.getElementById('task-date').value;
        const description = document.getElementById('task-description').value;

        if (isEditing) {
            // Atualizar tarefa existente
            const tasks = getTasks();
            const taskIndex = tasks.findIndex(t => t.id === editingId);
            if (taskIndex !== -1) {
                tasks[taskIndex] = { ...tasks[taskIndex], name, status, date, description };
                saveTasks(tasks);
                displayTasks(tasks);
                resetForm();
            }
        } else {
            // Adicionar nova tarefa
            const newTask = {
                id: Date.now(), // ID único baseado no timestamp
                name,
                status,
                date,
                description
            };

            const tasks = getTasks();
            tasks.push(newTask);
            saveTasks(tasks);

            // Limpar o formulário e recarregar a lista
            taskForm.reset();
            displayTasks(tasks);
        }
    }

    // Função para exibir as tarefas na interface
    function displayTasks(tasks) {
        // Limpa a lista antes de reconstruir
        taskList.innerHTML = '';

        if (tasks.length === 0) {
            taskList.innerHTML = '<p style="text-align: center; color: #6c757d;">Nenhuma tarefa cadastrada. Adicione uma!</p>';
            return;
        }

        tasks.forEach(task => {
            // CRIAÇÃO DO ELEMENTO HTML COM A CLASSE DINÂMICA
            const listItem = document.createElement('li');
            listItem.className = `task-item status-${task.status}`; // Aplica a classe de status!
            listItem.dataset.id = task.id;

            // Formata a data para exibição
            let displayDate = 'Não definida';
            if (task.date) {
                const parts = task.date.split('-'); // ["YYYY", "MM", "DD"]
                if (parts.length === 3) {
                    const year = parseInt(parts[0], 10);
                    const month = parseInt(parts[1], 10) - 1; // zero-based month
                    const day = parseInt(parts[2], 10);
                    const localDate = new Date(year, month, day);
                    displayDate = localDate.toLocaleDateString('pt-BR');
                }
            }

            listItem.innerHTML = `
                <div class="task-details">
                    <span class="task-name"><strong>${task.name}</strong></span> 
                    <span class="task-status-text"> (${task.status.toUpperCase()})</span>
                    <br>
                    <small>Data: ${displayDate}</small>
                    ${task.description ? `<p class="task-description">${task.description}</p>` : ''}
                </div>
                <div class="task-actions">
                    <button class="edit-btn" data-id="${task.id}">Editar</button>
                    <button class="remove-btn" data-id="${task.id}">Remover</button>
                </div>
            `;

            taskList.appendChild(listItem);
        });
    }

    // Função para remover uma tarefa
    function removeTask(id) {
        if (confirm('Tem certeza que deseja remover esta tarefa?')) {
            const tasks = getTasks();
            const updatedTasks = tasks.filter(task => task.id !== id);
            saveTasks(updatedTasks);
            displayTasks(updatedTasks);
        }
    }

    // Função para editar uma tarefa
    function editTask(id) {
        const tasks = getTasks();
        const task = tasks.find(t => t.id === id);
        if (task) {
            document.getElementById('task-name').value = task.name;
            document.getElementById('task-status').value = task.status;
            document.getElementById('task-date').value = task.date;
            document.getElementById('task-description').value = task.description;
            isEditing = true;
            editingId = id;
            document.querySelector('.btn-submit').textContent = 'Atualizar Tarefa';
        }
    }

    // Função para resetar o formulário
    function resetForm() {
        taskForm.reset();
        isEditing = false;
        editingId = null;
        document.querySelector('.btn-submit').textContent = 'Adicionar Tarefa';
    }

    // Função principal de carregamento
    function loadTasks() {
        const tasks = getTasks();
        displayTasks(tasks);
    }
});
