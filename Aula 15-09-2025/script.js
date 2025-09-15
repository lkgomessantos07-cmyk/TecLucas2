let número1 = parseFloat(prompt("Digite o 1º número:"));
let número2 = parseFloat(prompt("Digite o 2º número:"));
let operador = prompt("Selecione o operador (/,*,+,-):");
let resultado;

if (operador === "/") {
    if (número2 !== 0) {
        resultado = número1 / número2;
    } else {
        alert("Erro: Divisão por zero!");
        resultado = null;
    }
} else if (operador === "*") {
    resultado = número1 * número2;
} else if (operador === "+") {
    resultado = número1 + número2;
} else if (operador === "-") {
    resultado = número1 - número2;
} else {
    alert("Operador inválido!");
    resultado = null;
}

if (resultado !== null) {
    alert(`O Resultado é: ${resultado}`);
}
