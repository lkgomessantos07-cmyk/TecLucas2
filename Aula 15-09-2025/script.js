function apresentar() {
    let nome = prompt("Digite o seu nome: ")

    alert(`Olá, meu nome é ${nome}!`)

    let anoNascimento = Number(prompt("Digite o seu ano de nascimento: "))

    let idade = 2025 - anoNascimento

    alert(`Eu tenho ${idade} anos de idade.`)

    if (idade >= 18) {
        alert("Acesso Liberado!")
    } else {
        alert("Acesso Negado!")
    }
}
// let operador = "+"


// if (operador == "+"){
//     print("Resultado da soma")
// }else if (operador == "-") {
//     print("Resultado da subtração")
// }

// Crie um arquivo script.js que implementa uma calculadora básica:

// - Pedir ao usuário as informações número 1, número 2 e operador(+,-,*,/)
// - Imprima na tela o resultado da operação adequada
function calculadoraSimples() {
    let numero1 = 0
    let numero2 = 0
    let operador = ""
    let resultado = 0


    numero1 = Number(prompt("Digite um número: "))

    if (!numero1) {
        alert("Você digitou um número inválido.")
        return
    }

    operador = prompt("Digite o operador desejado (+,-,*,/):")

    if (['+', '-', '*', '/'].includes(operador)) {

        numero2 = Number(prompt("Digite um número: "))

        if (!numero2) {
            alert("Número digitado inválido!")
            return
        }


        if (operador === "+") {
            resultado = numero1 + numero2
        } else if (operador === "-") {
            resultado = numero1 - numero2
        } else if (operador === "*") {
            resultado = numero1 * numero2
        } else if (operador === "/") {
            if (numero2 !== 0) {
                resultado = numero1 / numero2
            }
            else {
                alert("Tentativa de Divisão por 0")
                return
            }
        } else {
            alert("Operador inválido!")
        }

    } else {
        alert("Você digitou um operador inválido!")
        return
    }

    alert(`${numero1} ${operador} ${numero2} = ${resultado}`)

}

// Interface da Calculadora
let display = document.getElementById('display');
let currentInput = '';
let operator = '';
let previousInput = '';

function appendNumber(number) {
    currentInput += number;
    display.value = currentInput;
}

function setOperator(op) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        calculate();
    }
    operator = op;
    previousInput = currentInput;
    currentInput = '';
}

function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(current)) return;
    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        default:
            return;
    }
    display.value = result;
    currentInput = result.toString();
    operator = '';
    previousInput = '';
}

function clearDisplay() {
    display.value = '';
    currentInput = '';
    operator = '';
    previousInput = '';
}

function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    display.value = currentInput;
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.num').forEach(button => {
        button.addEventListener('click', () => appendNumber(button.dataset.value));
    });
    document.querySelectorAll('.op').forEach(button => {
        button.addEventListener('click', () => setOperator(button.dataset.value));
    });
    document.getElementById('equals').addEventListener('click', calculate);
    document.getElementById('clear').addEventListener('click', clearDisplay);
    document.getElementById('delete').addEventListener('click', deleteLast);
});
