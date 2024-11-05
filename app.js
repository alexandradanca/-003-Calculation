const total = document.querySelector(".total");
const calc = document.querySelector(".calculation");
const history = document.querySelector(".history");
let firstIteration = true;
let calculation = "";
let result = 0;
let lastWasOp = false;
let lastWasDecimal = false;
let lastTotal = 0;

const root_theme = document.querySelector(":root");
let currentImgIdx = 0;
const bgrImage = [
  {
    id: 1,
    img: "url(../images/dreamypixel.jpg)",
    colorTxt: "#121c26",
    colorBtn: "#6a94b9",
    colorBtnHover: "#5c8bb3",
    colorCalc: "#4a779e",
  },
  {
    id: 2,
    img: "url(../images/river.jpg)",
    colorTxt: "#d8f4f6",
    colorBtn: "#2bb0b7",
    colorBtnHover: "#28a1a7",
    colorCalc: "#208287",
  },
  {
    id: 3,
    img: "url(../images/beach.jpg)",
    colorTxt: "#efe3db",
    colorBtn: "#b88461",
    colorBtnHover: "#b27a54",
    colorCalc: "#996745",
  },
  {
    id: 4,
    img: "url(../images/sky.jpg)",
    colorTxt: "#e2f2fc",
    colorBtn: "#093d61",
    colorBtnHover: "#07324f",
    colorCalc: "#041b2b",
  },
  {
    id: 5,
    img: "url(../images/planet.jpg)",
    colorTxt: "#d9e8f6",
    colorBtn: "#163858",
    colorBtnHover: "#122e49",
    colorCalc: "#0a1a29",
  },
];

window.addEventListener("DOMContentLoaded", () => {
  if (window.innerWidth > 577) {
    setInterval(bgrChange, 6000);
    bgrChange();
  }
  calc.textContent = 0;
  total.textContent = 0;
  calculator();
});

function calculator() {
  document.querySelectorAll(".btn").forEach((button) => {
    button.addEventListener("click", () => {
      const nr = button.getAttribute("data-number");
      const op = button.getAttribute("data-operator");

      if (firstIteration) {
        if (nr && nr !== "0") {
          calculation += nr;
          firstIteration = false;
        } else if (op === "-") {
          calculation += op;
          firstIteration = false;
        } else if (button.id === "decimal") {
          calculation = "0.";
          firstIteration = false;
        }
      } else {
          if (nr) {
            calculation += nr;
            lastWasOp = false;
          } else if (op) {
            if (op === "^") {
              if (!lastWasOp) {
                calculation += "**";
                lastWasOp = true;
              }
            } else {
              if (!lastWasOp) {
                calculation += op;
                lastWasOp = true;
              }
            }
          } else if (button.id === "decimal") {
            if (
              calculation
                .split(/[\+\-\*\/\^]+/)
                .pop()
                .includes(".")
            ) {
              lastWasDecimal = true;
            }

            if (!lastWasDecimal) {
              calculation += ".";
              lastWasDecimal = true;
            }
          } else if (button.id === "delete") {
            if (calculation.length !== 1) {
              calculation = calculation.slice(0, -1);
            } else {
              calculation = calculation.slice(0, -1);
              firstIteration = true;
              total.textContent = 0;
            }
          } else if (button.id === "clear") {
            displayHistory(
              history,
              calculation,
              calculateResult(calculation, result)
            );
            calculation = "";
            result = 0;
            total.textContent = result;
            firstIteration = true;
          } else if (button.id === "equal") {
            calculation = calculation.replace(
              /(\d+)%/g,
              (match, number) => `${number}*0.01`
            );
            result = calculateResult(calculation, result);
            total.textContent = result;
            lastTotal = result;
            result = 0;
          }
        }
        if(calculation === ""){
          calc.textContent = 0;
        } else {
          calc.textContent = calculation;
        }
    });
  });
}

function calculateResult(calc, result) {
  result = eval(calc);
  return result;
}

function displayHistory(history, calc, result) {
  history.innerHTML += `<p class="calc-items">` + calc + ` = ${result}</p>`;
}

function bgrChange() {
  root_theme.style.setProperty("--bgr-img", bgrImage[currentImgIdx].img);
  root_theme.style.setProperty("--txt-color", bgrImage[currentImgIdx].colorTxt);
  root_theme.style.setProperty(
    "--bgr-calc-color-light",
    bgrImage[currentImgIdx].colorBtn
  );
  root_theme.style.setProperty(
    "--bgr-calc-color-light-hover",
    bgrImage[currentImgIdx].colorBtnHover
  );
  root_theme.style.setProperty(
    "--bgr-calc-color",
    bgrImage[currentImgIdx].colorCalc
  );
  currentImgIdx = (currentImgIdx + 1) % bgrImage.length;
}

total.addEventListener("mousemove", function (e) {
  const mouseX = e.clientX - total.getBoundingClientRect().left;
  const displayWidth = total.clientWidth;
  const scrollWidth = total.scrollWidth;
  const scrollPosition = (mouseX / displayWidth) * (scrollWidth - displayWidth);
  total.scrollLeft = scrollPosition;
});

calc.addEventListener("mousemove", function (e) {
  const mouseX = e.clientX - calc.getBoundingClientRect().left;
  const displayWidth = calc.clientWidth;
  const scrollWidth = calc.scrollWidth;
  const scrollPosition = (mouseX / displayWidth) * (scrollWidth - displayWidth);
  calc.scrollLeft = scrollPosition;
});
