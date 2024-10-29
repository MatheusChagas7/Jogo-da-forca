import listaDeFrutas from "../dados/dados.js";
import input from 'readline-sync';

// Seleciona a fruta aleatorizada que será utilizada no jogo.
let palavraSorteada = listaDeFrutas[Math.floor(Math.random(0, 1) * listaDeFrutas.length)];

// Converte para minusculo, garantindo que a verificação das letras será correta
palavraSorteada = palavraSorteada.toLowerCase();

// Armazea as letras da palavra sorteada em um array para que possa percorrê-lo
const palavraSortArray = palavraSorteada.split('');

// Salva a quantidade total de caracteres da fruta sorteada.
const tamanhoFruta = palavraSorteada.length;

// Variável responsável por armazenar e exibir as letras que o usuário acertar.
let palavraOculta = [];

// Percorre o array palavraOculta e adiciona um underscore em cada
// posição de elemento do array, estes serão subistituidos na função jogo
// pelas letras que o usuário acertar
for (let contador = 0; contador < tamanhoFruta; contador++) {
    palavraOculta[contador] = '_';
}

//Armazena o número de tentativas iniciais do usuário
let tentativas = 4;

// Armazena o número de acertos do usuário
let acertos = 0;



// Sem dica = caso o usuário escolha o modo de jogo 0, não será
// apresentado ao usuário a primeira letra da fruta e o número de 
// acertos se inicia com 0
const semDica = () => {

    console.log(`\n\nAdivinhe o nome da fruta com ${tamanhoFruta} letras:`);
    console.log(`\n\nFruta: ${palavraOculta.join('')}`);
    forca();
}



// Com dica = caso o usuário escolha o modo de jogo 1, a quantidades
// de acertos é iniciada com um acerto, para que o controlador seja finalizado 
// corretamente ao acertar a palavra completa, também é mostrado a primeira
// letra da fruta ao usuário.
const comDica = () => {

    acertos++

    palavraOculta[0] = palavraSortArray[0].toUpperCase();

    console.log(`\n\nAdivinhe o nome da fruta com ${tamanhoFruta} letras:`);
    console.log(`\n\nFruta: ${palavraOculta.join('')}`)
    forca();

}



// Função responsável por iniciar o modo de jogo escolhido pelo usuário
const jogo = (opcao) => {

    switch (opcao) {
        case 0:
            semDica();
            break;
        case 1:
            comDica();
            break
        default:
            console.log("\nOPÇÃO INVÁLIDA!\n");
            break;
    }

}



// Função principal
const forca = () => {
    let letra = '';

    do {

        letra = input.question("\nDigite uma letra: ").toString();

        // transoforma a letra digitada em minúsculo, para ser compativél
        // com todas as letras da palavra armazenada durante a verificação
        letra = letra.toLowerCase();

        // A regex /[a-zA-z]/ foi utilizada para garantir que os digitos
        // sejam apenas letras de A a Z, maiúsculo ou minúsculo
        if (letra.length === 1 && letra.match(/[a-zA-z]/)) {

            let posicaoLetra = palavraSorteada.indexOf(letra);

            if (posicaoLetra > -1) {

                console.log('\nLetra encontrada!\n');

                // Percorre o array da palavra sorteada buscando a posição em que a letra foi encontrada
                // e atualiza o array de palavraOculta adicionado a letra no mesmo índice 
                // que a foi encontrada a letra no array palavraSortArray.
                for (let contador = 0; contador < tamanhoFruta; contador++) {

                    if (palavraSortArray[contador] == letra) {

                        // para cada letra encontrada os acertos são incrementos em 1
                        if(palavraOculta[contador] != letra ){

                            acertos++;

                        }

                        // Se o índice da letra encontrada foi 0 ou seja a primeira letra da palavra
                        // ela será transformada em maiúsculo.
                        if (posicaoLetra == 0) {

                            letra = letra.toLocaleUpperCase();

                        }

                        palavraOculta[contador] = letra;

                    }
                }

                // A função nativa .join foi utilizado para juntar as letras
                // do array novamente em uma string só
                console.log(palavraOculta.join(''));

            } else {

                // Caso a palavra não possua a letra as tentativas são decrementadas em 1
                tentativas--
                console.log(`\nA fruta não possui a letra ${letra}`);

                // Caso ainda possua tentativas, uma mensagem é exibida mostrando o número de tentativas restante
                // e também as letras encontradas da palavra até então.
                if (tentativas >= 1) {

                    console.log(`\nVocê ainda possui ${tentativas} tentativas!\n`);

                    console.log(palavraOculta.join(''));


                } else {

                    console.log("\n------------------------VOCÊ PERDEU!!-------------------")
                    console.log(`\nA palavra era: ${palavraSorteada}\n`)
                    console.log("----------------------------------------------------------\n")

                }
            }

            // Caso tenha acertado todas as letras uma mensagem de vitória será exibida e a palavra revelada.
            if (acertos == tamanhoFruta) {
                console.log("\n------------------------VITÓRIA!!-------------------")
                console.log(`\nVocê acertou, a fruta era: ${palavraSorteada}\n`)
                console.log("------------------------------------------------------\n")
                break;
            }

        }else{
            console.log("\nDÍGITO INVÁLIDO! Somente uma letra por vez de (a) a (z)\n");
            console.log(palavraOculta.join(''));
        }

    } while (tentativas > 0);

}


export default jogo;