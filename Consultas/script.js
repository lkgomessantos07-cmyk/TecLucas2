const form = document.getElementById("formConsulta");
const lista = document.getElementById("listaConsultas");
const estatisticas = document.getElementById("estatisticas");
const messageDiv = document.getElementById("message");

let consultas = JSON.parse(localStorage.getItem("consultas")) || [];

function showMessage(message, type = "error") {
  messageDiv.textContent = message;
  messageDiv.className = `message ${type}`;
  messageDiv.style.display = "block";
  setTimeout(() => {
    messageDiv.style.display = "none";
  }, 5000);
}

function validarConsulta(nome, especialidade, turno) {
  if (nome === "") {
    return "O nome não pode estar vazio!";
  }
  if (consultas.some(c => c.nome.toLowerCase() === nome.toLowerCase() && c.turno === turno)) {
    return "O paciente já possui consulta neste turno!";
  }
  const totalTurno = consultas.filter(c => c.turno === turno).length;
  if (totalTurno >= 5) {
    return "Este turno já possui 5 consultas agendadas!";
  }
  return null;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const especialidade = document.getElementById("especialidade").value;
  const turno = document.querySelector("input[name='turno']:checked").value;

  const error = validarConsulta(nome, especialidade, turno);
  if (error) {
    showMessage(error);
    return;
  }

  const consulta = { nome, especialidade, turno };
  consultas.push(consulta);
  localStorage.setItem("consultas", JSON.stringify(consultas));

  atualizarLista();
  form.reset();
  showMessage("Consulta agendada com sucesso!", "success");
});

function atualizarLista() {
  lista.innerHTML = "";

  consultas.forEach((consulta) => {
    const li = document.createElement("li");
    li.textContent = `${consulta.nome} - ${consulta.especialidade} - ${consulta.turno}`;
    lista.appendChild(li);
  });

  atualizarEstatisticas();
}

function atualizarEstatisticas() {
  let resumo = {};
  consultas.forEach(c => {
    resumo[c.especialidade] = (resumo[c.especialidade] || 0) + 1;
  });

  let texto = "Consultas por especialidade: ";
  for (let esp in resumo) {
    texto += `${esp}: ${resumo[esp]} | `;
  }

  estatisticas.textContent = texto;
}

// Initialize on load
atualizarLista();
