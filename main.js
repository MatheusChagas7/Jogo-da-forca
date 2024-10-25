// imports
import jogo from './funcoes/funcoes.js';
import input from 'readline-sync';


// Título
console.log("\n\n--------------- JOGO DA FORCA ---------------\n\n");

console.log("Escolha o modo de jogo:");
console.log("0 - Sem dica");
console.log("1 - Com dica\n");

let escolha = input.question("Modo: ");

let opcao = Number(escolha);

jogo(opcao);
