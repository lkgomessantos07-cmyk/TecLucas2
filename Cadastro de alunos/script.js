function CadastrarAlunos(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const curso = document.getElementById('Curso').value;
    const modalidade = document.querySelector('input[name="Modalidade"]:checked').value;

    const lista = document.getElementById('listaAlunos');
    const item = document.createElement('li');
    item.innerHTML = `Nome: ${nome}<br>
                      Email: ${email}<br>
                      Curso: ${curso}<br>
                      Modalidade: ${modalidade}`;
    item.classList.add(modalidade.toLowerCase());

    // Add delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Apagar';
    deleteBtn.className = 'delete-btn';
    deleteBtn.onclick = function() {
        lista.removeChild(item);
    };
    item.appendChild(deleteBtn);

    lista.appendChild(item);

    document.querySelector('form').reset();

    return false;
}

// Filter functions
function showAll() {
    const items = document.querySelectorAll('#listaAlunos li');
    items.forEach(item => item.style.display = 'block');
}

function showEAD() {
    const items = document.querySelectorAll('#listaAlunos li');
    items.forEach(item => {
        if (item.classList.contains('ead')) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

function showPresencial() {
    const items = document.querySelectorAll('#listaAlunos li');
    items.forEach(item => {
        if (item.classList.contains('presencial')) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Add event listeners to filter buttons
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('showAll').addEventListener('click', showAll);
    document.getElementById('showEAD').addEventListener('click', showEAD);
    document.getElementById('showPresencial').addEventListener('click', showPresencial);
});
