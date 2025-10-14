function gerarTabuada() {
    // No JS para declarar uma variavel usamos o let
    // parseInt pegara o conteudo do numero e convertera para numero inteiro
  let n = parseInt(document.getElementById("numero").value);
  let saida = document.getElementById("resultado");
  saida.textContent = "";
//   O laço for é uma repetição até que determinada condição seja atendida.
// no caso, a variavel i de incremento, repetira o laço 10 vezes

  for (let i = 1; i <= 10; i = i + 1) {
    // Saida: o numero digitado vezes o incremento i. o \n pula linha no JS
    saida.textContent += `${n} x ${i} = ${n * i}\n`; 
                        
  }
}
