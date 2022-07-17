"use strict";
let button = document.getElementById('button1');
let input1 = document.getElementById('input1');
let input2 = document.getElementById('input2');
function adiconarnumeros(numero1, numero2) {
    return numero1 + numero2;
}
if (button) {
    button.addEventListener('click', () => {
        if (input1 && input2) {
            console.log(adiconarnumeros(Number(input1.value), Number(input2.value)));
        }
    });
}


function exibe({param1, param2, ...ovo}){
    console.log(param1)
    console.log(param2)
    console.log(ovo)
  }
  
  
  exibe(param1= 'carro', param2 = 'sopa', 5,6,7,8)
  
  