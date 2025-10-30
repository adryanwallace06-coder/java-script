// script.js
// Elementos do DOM - Passando os parametros do html para o js
const nomeCorSelecionada = document.getElementById("nome-cor-selecionada");
const tituloProduto = document.getElementById("titulo-produto");
const imagemVisualizacao = document.getElementById("imagem-visualizacao");
const opcaoImagem0 = document.getElementById("0-imagem-miniatura");
const opcaoImagem1 = document.getElementById("1-imagem-miniatura");
const opcaoImagem2 = document.getElementById("2-imagem-miniatura");

// Objetos das opções de cores
const verdeCipreste = {
  nome: "Verde-cipreste",
  nomePastaImagens: "imagens-verde-cipreste",
};

const azulInverno = {
  nome: "Azul-inverno",
  nomePastaImagens: "imagens-azul-inverno",
};

const meiaNoite = {
  nome: "Meia-noite",
  nomePastaImagens: "imagens-meia-noite",
  emEstoque: false,
};

const estelar = {
  nome: "Estelar",
  nomePastaImagens: "imagens-estelar",
};

const rosaClaro = {
  nome: "Rosa-claro",
  nomePastaImagens: "imagens-rosa-claro",
};

// Objetos das opções de cores em um array 
const opcoesCores = [verdeCipreste, azulInverno, meiaNoite, estelar, rosaClaro];
// Objetos das opções de tamanhos
const opcoesTamanho = ["41 mm", "45 mm"];

let corSelecionada = 1;
let tamanhoSelecionado = 1;
let imagemSelecionada = 1;

function atualizarCorSelecionada() {
  //
  const numeroCorSelecionada = document
    .querySelector('[name="opcao-cor"]:checked')
    .id.charAt(0);

  corSelecionada = numeroCorSelecionada;

  nomeCorSelecionada.innerText = `Cor - ${opcoesCores[corSelecionada].nome}`;
  tituloProduto.innerText = `Pulseira loop esportiva ${opcoesCores[
    corSelecionada
  ].nome.toLowerCase()} para caixa de ${opcoesTamanho[tamanhoSelecionado]}`;
  // Atualiza as imagens de visualização e miniaturas
  imagemVisualizacao.src = `./imagens/opcoes-cores/${opcoesCores[corSelecionada].nomePastaImagens}/imagem-${imagemSelecionada}.jpeg`;
  opcaoImagem0.src = `./imagens/opcoes-cores/${opcoesCores[corSelecionada].nomePastaImagens}/imagem-0.jpeg`;
  opcaoImagem1.src = `./imagens/opcoes-cores/${opcoesCores[corSelecionada].nomePastaImagens}/imagem-1.jpeg`;
  opcaoImagem2.src = `./imagens/opcoes-cores/${opcoesCores[corSelecionada].nomePastaImagens}/imagem-2.jpeg`;
}

function atualizarTamanho() {
    // Atualiza o tamanho selecionado
  const opcaoTamanhoSelecionado = document
    .querySelector('[name="opcao-tamanho"]:checked')
    .id.charAt(0);

  tamanhoSelecionado = opcaoTamanhoSelecionado;
  // Verifica se o tamanho selecionado é 41 mm para ajustar a classe CSS
  if (opcoesTamanho[tamanhoSelecionado] === "41 mm") {
    imagemVisualizacao.classList.add("caixa-pequena");

    tituloProduto.innerText = `Pulseira loop esportiva ${opcoesCores[
      corSelecionada
    ].nome.toLowerCase()} para caixa de ${opcoesTamanho[tamanhoSelecionado]}`;

    return;
  }

  imagemVisualizacao.classList.remove("caixa-pequena");

  tituloProduto.innerText = `Pulseira loop esportiva ${opcoesCores[
    corSelecionada
  ].nome.toLowerCase()} para caixa de ${opcoesTamanho[tamanhoSelecionado]}`;
}

function atualizarImagemSelecionada() {
// Atualiza a imagem selecionada
  const opcaoImagemSelecionada = document
    .querySelector('[name="opcao-imagem"]:checked')
    .id.charAt(0);

  imagemSelecionada = opcaoImagemSelecionada;
  imagemVisualizacao.src = `./imagens/opcoes-cores/${opcoesCores[corSelecionada].nomePastaImagens}/imagem-${imagemSelecionada}.jpeg`;
}
