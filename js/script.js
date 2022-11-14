const previousOperationsText = document.querySelector("#previos-operation")
const currentOperationsText = document.querySelector("#current-operation")
const buttons = document.querySelectorAll("#buttons-container button")

class Calculator {
    constructor(previousOperationsText, currentOperationsText) {
        this.previousOperationsText = previousOperationsText;
        this.currentOperationsText = currentOperationsText;
        this.digitaAgora = ""; // vai digitar na hora 
    }
    // adiciona numeros a tela
    addDigit(digit) {
       // console.log(digit);
        // checa para ver se a op ja tem um ponto 
        if (digit === "." && this.currentOperationsText.innerText.includes(".")) {
            return;
        }
        this.digitaAgora = digit;
        this.updateScreen();
    }
    // processa todos  metotos da calculadora 
    processOperation(operation) {
        // checar se o curren esta vasiu
        if (this.currentOperationsText.innerText === "" && operation !== "C") {
            if (this.previousOperationsText.innerText !== "") {
                // mudar o operação 
                this.changeOperation(operation);
            }
            return;
        }

        // preciso saber do atual para o proximo
        let operationValue;
        const previos = +this.previousOperationsText.innerText.split(" ")[0];
        const current = +this.currentOperationsText.innerText;

        switch (operation) {
            case "+":
                operationValue = previos + current;
                this.updateScreen(operationValue, operation, current, previos);
                break;
            case "-":
                operationValue = previos - current;
                this.updateScreen(operationValue, operation, current, previos);
                break;
            case "/":
                operationValue = previos / current;
                this.updateScreen(operationValue, operation, current, previos);
                break;
            case "*":
                operationValue = previos * current;
                this.updateScreen(operationValue, operation, current, previos);
                break;
            case "%":
                operationValue = previos * current / 100;
                this.updateScreen(operationValue, operation, current, previos);
                break;
            case "A":
                this.precessAOperator();
                break;
            case "C":
                this.precessClearOperation();
                break;
            case "=":
                this.precessEqualOperation();
                break;
            default:
                return;
        }
    }

    // muda valores na tela 
    updateScreen(
        operationValue = null, // resulta na operacao acima
        operation = null, // quand o usuario envia 
        current = null, //
        previos = null // a de cima e essa é o precessoOperation
    ) {
        if (operationValue === null) {
            this.currentOperationsText.innerText += this.digitaAgora;
        } else {
            // checar se o valor é zero e so precisa add o valor para cima
            if (previos === 0) {
                operationValue = current;
            }
                // adiciona o valor atual e zera o mesmo 
                this.previousOperationsText.innerText = `${operationValue} ${operation}`; // op contatenada
                this.currentOperationsText.innerText = "";
            
        }
    }
    // op matematicas 
    changeOperation(operation) {
        const mathOperations = ["*", "/", "+", "-"]
        if (!mathOperations.includes(operation)) {
            return;
        }
        this.previousOperationsText.innerText =
            this.previousOperationsText.innerText.slice(0, -1) + operation;

    }
    // op deletar A
    precessAOperator() {
        this.currentOperationsText.innerText = 
        this.currentOperationsText.innerText.slice(0, -1);
    }
    // deletatudo 
    precessClearOperation(){
        this.currentOperationsText.innerText = "";
        this.previousOperationsText.innerText = "";
    }
    //igual 
    precessEqualOperation(){
        let operation = this.previousOperationsText.innerText.split(" ")[1];

        this.processOperation(operation);
    }

}

const calc = new Calculator(previousOperationsText, currentOperationsText);


buttons.forEach((btn) => {
    btn.addEventListener("click", (evento) => {
        const value = evento.target.innerText;

        if (+value >= 0 || value === ".") {
            calc.addDigit(value);
        } else {
            calc.processOperation(value);
        }
    });
});
