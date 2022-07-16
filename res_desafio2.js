"use strict";
// Como podemos melhorar o esse código usando TS? 
var PROFISSAO;
(function (PROFISSAO) {
    PROFISSAO[PROFISSAO["padeiro"] = 0] = "padeiro";
    PROFISSAO[PROFISSAO["atriz"] = 1] = "atriz";
})(PROFISSAO || (PROFISSAO = {}));
let pessoa1 = {
    nome: 'maria',
    idade: 29,
    profissao: PROFISSAO.atriz
};
let pessoa2 = {
    nome: 'roberto',
    idade: 19,
    profissao: PROFISSAO.padeiro
};
let pessoa3 = {
    nome: 'laura',
    idade: 32,
    profissao: PROFISSAO.atriz
};
let pessoa4 = {
    nome: "carlos",
    idade: 19,
    profissao: PROFISSAO.padeiro
};
console.log(pessoa1);
console.log(pessoa2);
console.log(pessoa3);
console.log(pessoa4);
/*
let pessoa1 = {};
pessoa1.nome = "maria";
pessoa1.idade = 29;
pessoa1.profissao = "atriz"

let pessoa2 = {}
pessoa2.nome = "roberto";
pessoa2.idade = 19;
pessoa2.profissao = "Padeiro";

let pessoa3 = {
    nome: "laura",
    idade: "32",
    profissao: "Atriz"
};

let pessoa4 = {
    nome = "carlos",
    idade = 19,
    profissao = "padeiro"
}
*/
