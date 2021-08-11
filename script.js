class Calculator{
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear(){
        this.previousOperand= ''
        this.currentOperand = ''
        this.operation = undefined
    }
    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }
    appendNumber(number){
        if (number ==='.' && this.currentOperand.includes('.')) return 
        this.currentOperand = this.currentOperand.toString() +number.toString()

    }
    chooseOperation(operation){
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.operate()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''

    }
    operate(){
        let computation;
        let prev=parseFloat(this.previousOperand)
        let current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation){
            case '+':
                computation = add(prev, current)
                break
            case '-':
                computation = subtract(prev, current)
                break
            case '*':
                computation = multiply(prev, current)
                break
            case '÷':
                computation = divide(prev, current)
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    getDisplayNumber(number){

        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.'))
        const decimalDigits = stringNumber.split('.')[1]

        let integerDisplay
        if (isNaN(integerDigits)){
            integerDisplay = ''
        }
        else{
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0})
        }
        if (decimalDigits != null){
            return `${decimalDigits}`
        }
        return integerDisplay
    }

  updateDisplay() {
    this.currentOperandTextElement.innerText =
      this.getDisplayNumber(this.currentOperand)
    if (this.operation != null) {
      this.previousOperandTextElement.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    } else {
      this.previousOperandTextElement.innerText = ''
    }
  }
}



let add = (number, numberOne) => number + numberOne;


let subtract = (number, numberOne) => number - numberOne; 


let multiply = (number, numberOne) => number* numberOne;


let divide = (number, numberOne) => number / numberOne;



let numberButtons = document.querySelectorAll('[data-number]')
let operationButtons = document.querySelectorAll('[data-operation')
let equalsButton = document.querySelector('[data-equals')
let deleteButton = document.querySelector('[data-delete')
let clearAllButton = document.querySelector('[data-clear')
let previousOperandTextElement = document.querySelector('[data-previous-operand')
let currentOperandTextElement = document.querySelector('[data-current-operand')


//Using class to store the data
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)


// Whenever a number is pressed, convert the string to a number append the number to the currentOperand variable.

numberButtons.forEach(number => number.addEventListener('click',() => {
calculator.appendNumber(number.innerText)
calculator.updateDisplay()

}))
operationButtons.forEach(button => {
    button.addEventListener('click',() => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()

    })
})
equalsButton.addEventListener('click', button =>{
    calculator.operate()
    calculator.updateDisplay()
})

clearAllButton.addEventListener('click', button =>{
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button =>{
    calculator.delete()
    calculator.updateDisplay()
})