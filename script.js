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

let operation = '', // Recebe todas as operações.
    pendentOperation = false

// Limpa valores, um por um.
const clearNum = () => currentNumber.textContent =
    currentNumber.textContent.substring(0, currentNumber.textContent.length - 1)

// Limpa todos os valores 'cacheNumber' e 'currentNumber'.
const clearAll = simble => {
    // Se o simbolo for 'C' ele limpa tudo.
    if (simble == "C") {
        operation, cacheNumber.textContent = ''
        currentNumber.textContent = '0'
        pendentOperation = false
    }
    // Se for '₠' ele limpa somente o valor atual.
    if (simble = "₠") currentNumber.textContent = '0'
}

// Concatena valores nos campos e na operação.
const setAccount = simble => {
    cacheNumber.textContent += currentNumber.textContent + simble
    operation += currentNumber.textContent + simble
    currentNumber.textContent = ''

    // 'pendentOperation' fica true pois um simbolo está no final da operação.
    pendentOperation = true
}

// Calcula exponenciação.
const powCalc = () => currentNumber.textContent = Math.pow(currentNumber.textContent, 2)

// Transforma o valor atual em sua forma fracionária.
const fractCalc = () => currentNumber.textContent = (1 / currentNumber.textContent).toFixed(4)

// Retorna na tela a porcentagem do valor digitado.
const porcentCalc = () => {
    currentNumber.textContent = (currentNumber.textContent / 100).toString()
    operation += currentNumber.textContent + "*"
}

// Retorna na tela a raiz quadrada do valor digitado.
const sqrtCalc = () => {
    currentNumber.textContent = Math.sqrt(parseInt((currentNumber.textContent))).toFixed(2)
    operation += currentNumber.textContent
}

// Adiciona ponto no número.
const addPoint = () => {
    // So adiciona o ponto se ele não tiver sido usado.
    if (!operation.includes('.') && !currentNumber.textContent.includes('.')) {
        currentNumber.textContent += '.'
        pendentOperation = true
    }
}

// Adiciona ou remove simbolo negativo. 
const parseNegative = value => {
    if (value.substr(0, 1) == "-") currentNumber.textContent = value.substring(1)
    else currentNumber.textContent = "-" + value
}

// Função pra adicionar elemento na tela.
const addNumber = number => {
    pendentOperation = false
    if (currentNumber.textContent == '0') currentNumber.textContent = number
    else currentNumber.textContent += number
}

// Pega a variavel 'operation' e transforma em uma operação matemática, 
// retornando na tela o resultado da operação.
const resultOfAll = () => {
    operation += currentNumber.textContent

    // Validação: se um valor for quebrado ou tiver operações com '/, -, *' ele limita as casas decimais.
    if ((parseInt(eval(operation)) % 2 != 0 && operation.includes("/")) ||
        (parseInt(eval(operation)) % 2 != 0 && operation.includes("-")) ||
        (parseInt(eval(operation)) % 2 != 0 && operation.includes("*"))) { currentNumber.textContent = eval(operation).toFixed(2) }

    // Se for inteiro ele não limita as casas decimais.
    else currentNumber.textContent = eval(operation)

    cacheNumber.textContent = ''
    operation = ''
}

// Escutador para teclas pressionadas.
window.addEventListener('keypress', ({ key }) => {
    let validate = pendentOperation == false && currentNumber.textContent != '0'

    if (key == "+" && validate) setAccount("+")
    if (key == "-" && validate) setAccount("-")
    if (key == "*" && validate) setAccount("*")
    if (key == "/" && validate) setAccount("/")

    if (key == "%" && validate) porcentCalc()

    if (parseInt(key) >= 0 && parseInt(key) <= 9) addNumber(key)
    if (key == "Enter") resultOfAll()
    if (key == '') clearAll("C")
})

// Adiciona o escutador 'click' para todos os botões.
buttons.forEach(button => {
    button.addEventListener('click', () => {
        // Se botão clicado não tiver um simbolo especial, então ele adiciona o número na tela.
        if (!specialKeys.includes(button.textContent)) addNumber(button.textContent)

        // Se botão clicado tiver um simbolo especial, então ele irá executar uma ação ou chamar uma função.
        if (specialKeys.includes(button.textContent)) {
            let validate = pendentOperation == false && currentNumber.textContent != '0'

            if (button.textContent == "+" && validate) setAccount('+')
            if (button.textContent == "-" && validate) setAccount('-')
            if (button.textContent == "x" && validate) setAccount('*')
            if (button.textContent == "/" && validate) setAccount('/')

            if (button.textContent == "Χ²" && validate) powCalc()
            if (button.textContent == "⅟" && validate) fractCalc()
            if (button.textContent == "√" && validate) sqrtCalc()
            if (button.textContent == "%" && validate) porcentCalc()

            if (button.textContent == "⌫" && currentNumber.textContent != '') clearNum()
            if (button.textContent == "C") clearAll("C")
            if (button.textContent == "₠") clearAll("₠")

            if (button.textContent == "=" && operation != "" && pendentOperation == false) resultOfAll()
            if (button.textContent == "±" && validate) parseNegative(currentNumber.textContent)
            if (button.textContent == "." && pendentOperation == false) addPoint()

        }
    })
})