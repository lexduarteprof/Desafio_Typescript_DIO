// Como podemos rodar isso em um arquivo .ts sem causar erros? 

/*
let employee = {};
employee.code = 10;
employee.name = "John";
*/


interface employee {
    code: number,
    name: String
}

let john: employee ={
    code: 10,
    name: 'John'
}


console.log(john)
