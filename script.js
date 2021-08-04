function add(number, numberOne){

}
function subtract(number, numberOne){

}
function multiply(number, numberOne){

}
function divide(number, numberOne){

}
function operate(number, numberOne){
    return multiply(number, numberOne)

}

calculator_button = document.querySelectorAll("button")
calculator_button.forEach(element => element.addEventListener('click', () => console.log(element)))