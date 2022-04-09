const cacheNumber = document.getElementById('cacheNumber'),
    currentNumber = document.getElementById('currentNumber'),
    buttons = document.querySelectorAll('.grade button')

const specialKeys =
    [
        '√', 'Χ²',
        '⅟', '%', '₠',
        'C', '⌫', '/',
        'x', '-', '+',
        '±', '.', '='
    ]

let operation = '',
    pendentOperation = false

const clearAll = () => {
    cacheNumber.textContent = ''
    currentNumber.textContent = '0'
    operation = ''
    pendentOperation = false
}

const operationResult = simble => {
    cacheNumber.textContent += currentNumber.textContent + simble
    operation += currentNumber.textContent + simble
    currentNumber.textContent = ''
    pendentOperation = true
}

// Função pra adicionar elemento na tela
buttons.forEach(button => {

    button.addEventListener('click', () => {

        if (!specialKeys.includes(button.textContent)) {
            pendentOperation = false
            if(currentNumber.textContent == '0') currentNumber.textContent = button.textContent
            else currentNumber.textContent += button.textContent
        }

        if (specialKeys.includes(button.textContent)) {
            let validate = pendentOperation == false && currentNumber.textContent != '0'
            
            if (button.textContent == "+" && validate) operationResult('+')
            if (button.textContent == "-" && validate) operationResult('-')
            if (button.textContent == "x" && validate) operationResult('*')
            if (button.textContent == "/" && validate) operationResult('/')
            if (button.textContent == "C" || button.textContent == "₠") clearAll()

            if (button.textContent == "." && pendentOperation == false) {
                currentNumber.textContent += '.'
            }

            if (button.textContent == "=" && operation != "" && pendentOperation == false) {
                operation += currentNumber.textContent
                currentNumber.textContent = eval(operation)
                cacheNumber.textContent = ''
                operation = ''
            }
        }
    })

})