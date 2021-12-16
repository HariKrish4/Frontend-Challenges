var buttons = document.querySelectorAll(".btn").length;

for (var i = 0; i < buttons; i++) {
  document.querySelectorAll(".btn")[i].addEventListener("click", function () {
    clickedKey(this.innerHTML);
  });
}

function clickedKey(key) {
  var label = document.querySelector(".label");
  switch (key) {
    case "+":
      alert(calculate(2, 3, add));
      break;
    case "-":
      alert(calculate(4, 2, sub));
      break;
    default:
      label.innerHTML += key;
      break;
  }
}

function add(num1, num2) {
  return num1 + num2;
}

function sub(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function calculate(num1, num2, operator) {
  return operator(num1, num2);
}
