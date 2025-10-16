function gerarTabuada() {
    // No JS para declarar uma variavel usamos o let
    // parseInt Pegará o conteúdo do numero e converterá para numero inteiro
    let n = parseInt(document.getElementById("numero").value);
    let saida = document.getElementById("resultado");
    saida.textContent = "";
    // O laço for é uma repetição até que determinada condição seja atendida.
    // No caso, a variavel i de incremento, repetirá o laço 10 vezes
    for (let i =1; i <= 10 ; i++) {
        // saída: o numero digitado Vezes o incremento i. O \n pula linha no JS
        saida.textContent += `${n} X ${i} = ${n * i}\n` ;
    }

}