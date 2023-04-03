const cacheNumber = document.getElementById("cacheNumber"),
  currentNumber = document.getElementById("currentNumber"),
  buttons = document.querySelectorAll(".grade button"),
  // Buttons to change theme.
  theme1 = document.getElementById("theme1"),
  theme2 = document.getElementById("theme2"),
  theme3 = document.getElementById("theme3"),
  main = document.querySelector("main");

const specialKeys = [
  "√",
  "Χ²",
  "⅟",
  "%",
  "₠",
  "C",
  "⌫",
  "/",
  "x",
  "-",
  "+",
  "±",
  ".",
  "=",
];

let operation = "", // Recive all operations.
  pendentOperation = false;

// Clear single values.
const clearNum = () =>
  (currentNumber.textContent = currentNumber.textContent.substring(
    0,
    currentNumber.textContent.length - 1
  ));

// Clear all values
const clearAll = (simble) => {
  if (simble == "C") {
    operation, (cacheNumber.textContent = "");
    currentNumber.textContent = "0";
    pendentOperation = false;
  }
  // Just to clear the current value.
  if ((simble = "₠")) currentNumber.textContent = "0";
};

// Concat the values on operation.
const setAccount = (simble) => {
  cacheNumber.textContent += currentNumber.textContent + simble;
  operation += currentNumber.textContent + simble;
  currentNumber.textContent = "";

  // 'pendentOperation' after the math operator.
  pendentOperation = true;
};

// Calculate exponential.
const powCalc = () =>
  (currentNumber.textContent = Math.pow(currentNumber.textContent, 2));

// Transform current value in fraction.
const fractCalc = () =>
  (currentNumber.textContent = (1 / currentNumber.textContent).toFixed(4));

// Returns percentage of the entered value.
const porcentCalc = () => {
  currentNumber.textContent = (currentNumber.textContent / 100).toString();
  operation += currentNumber.textContent + "*";
};

// Returns the square root of the typed value to the screen.
const sqrtCalc = () => {
  currentNumber.textContent = Math.sqrt(
    parseInt(currentNumber.textContent)
  ).toFixed(2);
  operation += currentNumber.textContent;
};

// Add point to number.
const addPoint = () => {
  if (!operation.includes(".") && !currentNumber.textContent.includes(".")) {
    currentNumber.textContent += ".";
    pendentOperation = true;
  }
};

// Add or remove negative symbol.
const parseNegative = (value) => {
  if (value.substr(0, 1) == "-") currentNumber.textContent = value.substring(1);
  else currentNumber.textContent = "-" + value;
};

const addNumber = (number) => {
  pendentOperation = false;
  if (currentNumber.textContent == "0") currentNumber.textContent = number;
  else currentNumber.textContent += number;
};

// Resolve the values of "operation".
const resultOfAll = () => {
  operation += currentNumber.textContent;

  if (
    (parseInt(eval(operation)) % 2 != 0 && operation.includes("/")) ||
    (parseInt(eval(operation)) % 2 != 0 && operation.includes("-")) ||
    (parseInt(eval(operation)) % 2 != 0 && operation.includes("*"))
  ) {
    currentNumber.textContent = eval(operation).toFixed(2);
  } else currentNumber.textContent = eval(operation);

  cacheNumber.textContent = "";
  operation = "";
};

window.addEventListener("keypress", ({ key }) => {
  let validate = pendentOperation == false && currentNumber.textContent != "0";

  if (key == "+" && validate) setAccount("+");
  if (key == "-" && validate) setAccount("-");
  if (key == "*" && validate) setAccount("*");
  if (key == "/" && validate) setAccount("/");

  if (key == "%" && validate) porcentCalc();

  if (parseInt(key) >= 0 && parseInt(key) <= 9) addNumber(key);
  if (key == "Enter") resultOfAll();
  if (key == "") clearAll("C");
});

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (!specialKeys.includes(button.textContent))
      addNumber(button.textContent);

    if (specialKeys.includes(button.textContent)) {
      let validate =
        pendentOperation == false && currentNumber.textContent != "0";

      if (button.textContent == "+" && validate) setAccount("+");
      if (button.textContent == "-" && validate) setAccount("-");
      if (button.textContent == "x" && validate) setAccount("*");
      if (button.textContent == "/" && validate) setAccount("/");

      if (button.textContent == "Χ²" && validate) powCalc();
      if (button.textContent == "⅟" && validate) fractCalc();
      if (button.textContent == "√" && validate) sqrtCalc();
      if (button.textContent == "%" && validate) porcentCalc();

      if (button.textContent == "⌫" && currentNumber.textContent != "")
        clearNum();
      if (button.textContent == "C") clearAll("C");
      if (button.textContent == "₠") clearAll("₠");

      if (
        button.textContent == "=" &&
        operation != "" &&
        pendentOperation == false
      )
        resultOfAll();
      if (button.textContent == "±" && validate)
        parseNegative(currentNumber.textContent);
      if (button.textContent == "." && pendentOperation == false) addPoint();
    }
  });
});

const clearTheme = () => {
  theme1.classList.remove("selectedTheme");
  theme2.classList.remove("selectedTheme");
  theme3.classList.remove("selectedTheme");

  main.classList.remove("theme1", "theme2", "theme3");
};

theme1.addEventListener("click", () => {
  clearTheme();
  main.classList.add("theme1");
  theme1.classList.add("selectedTheme");
});

theme2.addEventListener("click", () => {
  clearTheme();
  main.classList.add("theme2");
  theme2.classList.add("selectedTheme");
});

theme3.addEventListener("click", () => {
  clearTheme();
  main.classList.add("theme3");
  theme3.classList.add("selectedTheme");
});
