const perguntas = [
  {
    pergunta: "Qual é o nome do primeiro computador eletrônico?",
    opcoes: ["ENIAC", "IBM 701", "Z1", "ABC"],
    resposta: "ENIAC",
  },
  {
    pergunta: "Qual é o nome do primeiro computador pessoal?",
    opcoes: ["Altair 8800", "IBM 610", "Kenbak-1", "Simon"],
    resposta: "Altair 8800",
  },
  {
    pergunta: "Qual é o jogo mais vendido de todos os tempos?",
    opcoes: ["Minecraft", "Tetris", "GTA V", "Wii Sports"],
    resposta: "Minecraft",
  },
  {
    pergunta: "Qual é o nome da consola lançada pela Sony em 1994?",
    opcoes: ["PlayStation", "Nintendo 64", "Xbox", "Sega Saturn"],
    resposta: "PlayStation",
  },
  {
    pergunta: "Qual é o nome do primeiro jogo da série GTA?",
    opcoes: [
      "Grand Theft Auto",
      "Grand Theft Auto 2",
      "Grand Theft Auto III",
      "Grand Theft Auto: London 1969",
    ],
    resposta: "Grand Theft Auto",
  },
  {
    pergunta:
      "Qual é o tipo de memória que não perde os dados quando o computador é desligado?",
    opcoes: ["RAM", "ROM", "Cache", "Virtual"],
    resposta: "ROM",
  },
  {
    pergunta: "Qual é o nome do primeiro sistema operativo?",
    opcoes: ["UNIX", "Windows", "Mac OS", "Linux"],
    resposta: "UNIX",
  },
  {
    pergunta: "Qual é o nome do primeiro navegador de internet?",
    opcoes: [
      "Netscape Navigator",
      "Mozilla Firefox",
      "Internet Explorer",
      "Google Chrome",
    ],
    resposta: "Netscape Navigator",
  },
  {
    pergunta: "Qual é o nome do primeiro smartphone?",
    opcoes: [
      "IBM Simon",
      "BlackBerry",
      "Nokia 9000 Communicator",
      "Motorola DynaTAC 8000X",
    ],
    resposta: "IBM Simon",
  },
  {
    pergunta: "Qual é o nome do primeiro sistema operativo para smartphones?",
    opcoes: ["Android", "iOS", "Windows Phone", "Symbian"],
    resposta: "Symbian",
  },
  {
    pergunta: "Qual é o tipo de música mais ouvida no mundo?",
    opcoes: ["Rock", "Pop", "Hip Hop", "Rap"],
    resposta: "Hip Hop",
  },
  {
    pergunta: "Qual é o nome do primeiro filme da saga Star Wars?",
    opcoes: [
      "Star Wars: Episode I - The Phantom Menace",
      "Star Wars: Episode II - Attack of the Clones",
      "Star Wars: Episode III - Revenge of the Sith",
      "Star Wars: Episode IV - A New Hope",
    ],
    resposta: "Star Wars: Episode IV - A New Hope",
  },
  {
    pergunta: "Qual é o nome do primeiro filme da saga Harry Potter?",
    opcoes: [
      "Harry Potter and the Philosopher's Stone",
      "Harry Potter and the Chamber of Secrets",
      "Harry Potter and the Prisoner of Azkaban",
      "Harry Potter and the Goblet of Fire",
    ],
    resposta: "Harry Potter and the Philosopher's Stone",
  },
  {
    pergunta: "Qual é o nome do primeiro filme da saga Senhor dos Anéis?",
    opcoes: [
      "The Lord of the Rings: The Fellowship of the Ring",
      "The Lord of the Rings: The Two Towers",
      "The Lord of the Rings: The Return of the King",
      "The Hobbit: An Unexpected Journey",
    ],
    resposta: "The Lord of the Rings: The Fellowship of the Ring",
  },
  {
    pergunta: "Qual é o tipo de música que eu mais gosto?",
    opcoes: ["Forró", "Phonk", "Funk MTG", "Funk Carioca"],
    resposta: "Funk MTG",
  },
];
// Total de perguntas do quiz - 15

const pElem = document.querySelector("#pergunta"); // Elemento que contme o quiz (perguntas e respostas), querySelector() retorna o primeiro elemento que corresponde ao seletor especifiacdo
const rElem = document.querySelectorAll(".respostas"); // Elemento que contm as respostas do quiz, querySelectorAll() retorna todos os elementos que correspondem ao seletor especifiacdo
const pBtn = document.querySelector("#prox"); // Botao para passar para a prxoima pergunta
const pontosElem = document.querySelector("#p-num"); // Elemento que contem os pontos do quiz
const eElem = document.querySelector("#e-num"); // Elemento que contem os erros do quiz

let pAtual = 0; // Pergunta atual
let pontos = 0; // Pontos do quiz
let perguntasCertas = 0; // Perguntas certas do quiz
let erros = 0; // Erros do quiz
let rSelecionada = false; // Resposta selecionada

// Funcao para carregar as perguntas e respostas
carregarPerguntas = () => {
  const p = perguntas[pAtual];
  pElem.innerHTML = p.pergunta;

  const pTexto = baralhador(p.opcoes);

  for (let i = 0; i < rElem.length; i++) {
    rElem[i].innerHTML = pTexto[i];
    rElem[i].classList.remove("selecionada");
    rElem[i].style.display = "inline-block";
  }

  rSelecionada = false;
};

baralhador = (array) => {
  let currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex); // Gerar um idnce aleatorei
    currentIndex -= 1;

    temporaryValue = array[currentIndex]; // Armazenar o valor atual
    array[currentIndex] = array[randomIndex]; // Trocar o valor atual pelo valor aleatorio
    array[randomIndex] = temporaryValue; // Trocar o valor aleatorio pelo valor atual
  }
  return array;
};

// Funcao de verif resposta
verificarR = (e) => {
  if (rSelecionada) return;

  rSelecionada = true;

  if (e.target.innerHTML === perguntas[pAtual].resposta) {
    // Se a resposta estiver correta
    pontos += 5;
    perguntasCertas++;
    pontosElem.innerHTML = pontos;
    console.info("Resposta correta!");
    pElem.innerHTML = "<b style='color: green;'>Resposta correta!</b>";
  } else {
    erros++;
    eElem.innerHTML = erros;
    console.info("Resposta errada!");
    pElem.innerHTML = "<b style='color:red;'>Resposta errada!</b>";
  }
  mostrarCorreta(rElem, perguntas[pAtual].resposta);
  pararTemporizador();
};

// Mostrar resposta correta
mostrarCorreta = (elementos, res) => {
  for (let i = 0; i < elementos.length; i++) {
    elementos[i].style.display = "none";
  }
  for (let i = 0; i < elementos.length; i++) {
    if (elementos[i].innerHTML === res) {
      elementos[i].style.display = "block";
      elementos[i].classList.add("selecionada");
      //elementos[i].style.backgroundImage = "linear-gradient(to right, #00b09b, #96c93d)";
    }
  }
}

rElem.forEach((rBtn) => {
  // Para cada resposta, adicionar um event listener ao botao
  rBtn.addEventListener("click", verificarR);
});

pBtn.addEventListener("click", () => {
  // Carregar em proxima pergunta
  if (!rSelecionada) return;

  pAtual++;

  if (pAtual === perguntas.length) {
    pElem.innerHTML = "Fim do quiz!";
    pBtn.style.display = "none";
    document.getElementById("temporizador").style.display = "none";
    document.getElementById("pontos").style.display = "block";
    document.getElementById("erros").style.display = "block";

    for (let i = 0; i < rElem.length; i++) {
      rElem[i].style.display = "none";
    }
    document.getElementsByClassName("quiz-container")[0].style.height = "530px";
    document.querySelector(".quiz-container").innerHTML+="<p>Total de perguntas certas: <b style='color: green;'>"+perguntasCertas+"</b>/<b style='color:red;'>"+perguntas.length+"</b></p>";
      //document.querySelector(".quiz-container").innerHTML +=
      "<button class='recomecar' onclick='location.reload()'>Recomeçar</button>";
      atualizarPontuacao(document.getElementsByTagName("h1")[0].innerHTML, pontos);
      topJogadoresPontos();
    return; // Retornar
  } else {
    pararTemporizador();
    temporizador(90);
    if (rSelecionada) {
      for (let i = 0; i < rElem.length; i++) {
        rElem[i].style.display = "block";
      }
      rSelecionada = false;
    }
  }

  carregarPerguntas(); // Carregar as perguntas e respostas
});

baralhador(perguntas); // Baralhar as perguntas

comecarQuiz = () => {
  let nome = document.getElementById("nome").value;
  if (nome == "") {
    alert("Escreve o teu nome para começar!");
    return;
  } else if (antiDuplicacao(nome)) {
    alert("Esse nome já está a ser usado!");
    return;
  } else {
    document.getElementsByClassName("quiz-container")[0].style.height = "500px";
    document.getElementsByTagName("h1")[0].innerHTML = nome;
    const elementosComecar = document.getElementsByClassName("comecar");
    for (let i = 0; i < elementosComecar.length; i++) {
      elementosComecar[i].style.display = "none";
    }

    document.getElementById("pergunta").style.display = "block";
    document.getElementById("temporizador").style.display = "block";
    for (let i = 0; i < rElem.length; i++) {
      rElem[i].style.display = "inline-block";
    }
    document.getElementById("prox").style.display = "block";
    temporizador(90);
    carregarPerguntas();
    audio.pause();
    let jogadores = JSON.parse(localStorage.getItem('jogadores')) || {};
    jogadores[nome] = 0; // Inicializa a pontuação do jogador como 0
    localStorage.setItem('jogadores', JSON.stringify(jogadores));
  }
};

temporizador = (tempo) => {
  var tempoEmSegundos = tempo;
  var minutos = Math.floor(tempoEmSegundos / 60);
  var segundos = tempoEmSegundos % 60;

  timerId = setTimeout(function () {
    if (tempoEmSegundos <= 0) {
      document.getElementById("t-num").innerHTML = "Acabou o tempo!";
      document.getElementById("prox").style.display = "none";
      setTimeout(function () {
        document.getElementById("prox").style.display = "block";
        pAtual++;
        carregarPerguntas();
        erros++;
        temporizador(90);
      }, 5000);
    } else {
      document.getElementById("t-num").innerHTML = minutos + ":" + segundos;
      tempoEmSegundos--;
      temporizador(tempoEmSegundos);
    }
  }, 1000);
};

pararTemporizador = () => {
  clearTimeout(timerId);
};

atualizarPontuacao = (nome, pontos) => {
  let jogadores = JSON.parse(localStorage.getItem('jogadores'));
  jogadores[nome] += pontos;
  localStorage.setItem('jogadores', JSON.stringify(jogadores));
};

topJogadoresPontos = () => {
  let jogadores = JSON.parse(localStorage.getItem('jogadores'));
  let jogadoresOrdenados = Object.entries(jogadores).sort((a, b) => b[1] - a[1]);
  document.querySelector(".quiz-container").innerHTML += "<h4>Top jogadores</h4>";
  if (jogadoresOrdenados.length < 3) {
    for (let i = 0; i < jogadoresOrdenados.length; i++) {
      document.querySelector(".quiz-container").innerHTML += "<p>#"+(i+1)+" - "+jogadoresOrdenados[i][0]+": "+jogadoresOrdenados[i][1]+" pontos</p>";
    }
    document.querySelector(".quiz-container").innerHTML += "<button class='recomecar' onclick='location.reload()'><b>Recomeçar</b></button>";
    return;
  }
  for (let i = 0; i < 3; i++) {
    document.querySelector(".quiz-container").innerHTML += "<p>#"+(i+1)+" - "+jogadoresOrdenados[i][0]+": "+jogadoresOrdenados[i][1]+" pontos</p>";
  }
  document.querySelector(".quiz-container").innerHTML += "<button class='recomecar' onclick='location.reload()'><b>Recomeçar</b></button>";
};
  
antiDuplicacao = (nick) => {
  let jogadores = JSON.parse(localStorage.getItem('jogadores'));
  if (jogadores == null) {
    return false;
  }
  if (jogadores[nick] != undefined) {
    return true;
  }
  return false;
}

// Script de musica
var audio = new Audio("https://server1.mtabrasil.com.br/youtube/play?id=ZiRzL_N8meU");
audio.volume = 0.3;
audio.play();

audio.onended = function() {
  audio.currentTime = 0;
  audio.play();
}