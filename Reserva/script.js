window.onload = function() {
    const hoje = new Date().toISOString().split('T')[0];
    document.getElementById('dataEntrada').setAttribute('min', hoje);
    document.getElementById('dataEntrada').addEventListener('change', function() {
        document.getElementById('dataSaida').setAttribute('min', this.value);
    });
};

function CadastrarHóspede(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const quartoSelect = document.getElementById('Quarto');
    const Quarto = quartoSelect.options[quartoSelect.selectedIndex].text;
    const dataEntrada = document.getElementById('dataEntrada').value;
    const dataSaida = document.getElementById('dataSaida').value;
    const Café_Manhã = document.querySelector('input[name="Café_Manhã"]:checked').value;

    
    const entrada = new Date(dataEntrada);
    const saida = new Date(dataSaida);

    if (saida < entrada) {
        alert("Data de saída não pode ser menor que a data de entrada.");
        return false;
    }

    const diffTime = saida - entrada;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    
    let precoPorDia = 0;
    if (Quarto.includes('Simples')) precoPorDia = 100;
    else if (Quarto.includes('Duplo')) precoPorDia = 150;
    else if (Quarto.includes('Suíte')) precoPorDia = 200;

    const valorTotal = precoPorDia * diffDays;

    const lista = document.getElementById('Lista_Hóspedes');
    const item = document.createElement('li');
    item.innerHTML = `
        <strong>Nome:</strong> ${nome}<br>
        <strong>Quarto:</strong> ${Quarto}<br>
        <strong>Data Entrada:</strong> ${dataEntrada}<br>
        <strong>Data Saída:</strong> ${dataSaida}<br>
        <strong>Dias:</strong> ${diffDays}<br>
        <strong>Valor Total:</strong> R$ ${valorTotal.toFixed(2)}<br>
        <strong>Café da Manhã:</strong> ${Café_Manhã}
    `;
    lista.appendChild(item);

    
    document.getElementById('nome').value = '';
    document.getElementById('Quarto').selectedIndex = 0;
    document.getElementById('dataEntrada').value = '';
    document.getElementById('dataSaida').value = '';
    document.querySelector('input[name="Café_Manhã"][value="Sim"]').checked = true;

    return false;
}
