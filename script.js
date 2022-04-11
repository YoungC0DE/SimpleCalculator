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

const clearNum = () => {
    let value = currentNumber.textContent
    currentNumber.textContent = value.substring(0, value.length - 1)
}

const clearAll = entry => {
    if (entry == "C") {
        cacheNumber.textContent = ''
        currentNumber.textContent = '0'
        operation = ''
        pendentOperation = false
    }
    if (entry = "₠") {
        currentNumber.textContent = '0'
    }

}

const setAccount = simble => {
    cacheNumber.textContent += currentNumber.textContent + simble
    operation += currentNumber.textContent + simble
    currentNumber.textContent = ''
    pendentOperation = true
}

const powCalc = () => {
    currentNumber.textContent = Math.pow(currentNumber.textContent, 2)
}

const fractCalc = () => {
    currentNumber.textContent = (1 / currentNumber.textContent).toFixed(4)
}

const parseNegative = value => {
    if (value.substr(0, 1) == "-") currentNumber.textContent = value.substring(1)
    else currentNumber.textContent = "-" + value
}

// Função pra adicionar elemento na tela
const addNumber = number => {
    pendentOperation = false
    if (currentNumber.textContent == '0') currentNumber.textContent = number
    else currentNumber.textContent += number
}

const resultOfAll = () => {
    operation += currentNumber.textContent

    if ((parseInt(eval(operation)) % 2 != 0 && operation.includes("/")) ||
        (parseInt(eval(operation)) % 2 != 0 && operation.includes("-")) ||
        (parseInt(eval(operation)) % 2 != 0 && operation.includes("*"))) {

        currentNumber.textContent = eval(operation).toFixed(2)
    }

    else currentNumber.textContent = eval(operation)
    cacheNumber.textContent = ''
    operation = ''
}

window.addEventListener('keypress', ({ key }) => {
    let validate = pendentOperation == false && currentNumber.textContent != '0'

    if (key == "+" && validate) setAccount("+")
    if (key == "-" && validate) setAccount("-")
    if (key == "*" && validate) setAccount("*")
    if (key == "/" && validate) setAccount("/")

    if (parseInt(key) >= 0 && parseInt(key) <= 9) addNumber(key)
    if (key == "Enter") resultOfAll()
    if (key == '') clearAll("C")
})

buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (!specialKeys.includes(button.textContent)) { addNumber(button.textContent) }

        if (specialKeys.includes(button.textContent)) {
            let validate = pendentOperation == false && currentNumber.textContent != '0'

            if (button.textContent == "+" && validate) setAccount('+')
            if (button.textContent == "-" && validate) setAccount('-')
            if (button.textContent == "x" && validate) setAccount('*')
            if (button.textContent == "/" && validate) setAccount('/')

            if (button.textContent == "Χ²" && validate) powCalc()
            if (button.textContent == "⅟" && validate) fractCalc()

            if (button.textContent == "⌫" && validate) clearNum()
            if (button.textContent == "C") clearAll("C")
            if (button.textContent == "₠") clearAll("₠")

            if (button.textContent == "." && pendentOperation == false) currentNumber.textContent += '.'
            if (button.textContent == "=" && operation != "" && pendentOperation == false) resultOfAll()
            if (button.textContent == "±" && validate) parseNegative(currentNumber.textContent)
        }

    })
})