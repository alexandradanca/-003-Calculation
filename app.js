const btns = document.querySelectorAll(".op-n-container>button");
let btn_zero = document.querySelector(".zero");
let btn_zero_class = btn_zero.classList;
const total = document.querySelector(".total");
const calc = document.querySelector(".calculation");
const history = document.querySelector(".history");
const root_theme = document.querySelector(':root');
let currentImgIdx = 0;
let init_parenthesis = 0;
let start_parenthesis = 0;
let idx_op_nonsingle = 2;
let e_class = 0;
let e_txt_content = 0;
let first_iteration = 0;
let init_groupNrs = 0;
let groupNrs = 0;
let actualGroupNrs = 0;
let actual_btn = 0;
let totalV = 0;
let first_minus = 0;
let arrNrsCalcDisplay = [];
let arrGroupNrs = [];
let arrActualGroupNrs = [];
let arrOperators = [];
let arrtotalV = [];
let arrAll = [];
let arrAllClass = [];
const bgrImage = [
  {
    id: 1,
    img: "url(../images/dreamypixel.jpg)",
    colorTxt: '#121c26',
    colorBtn: '#6a94b9',
    colorBtnHover: '#5c8bb3',
    colorCalc: '#4a779e'
  },
  {
    id: 2,
    img: "url(../images/river.jpg)",
    colorTxt: '#d8f4f6',
    colorBtn: '#2bb0b7',
    colorBtnHover: '#28a1a7',
    colorCalc: '#208287'
  },
  {
    id: 3,
    img: "url(../images/beach.jpg)",
    colorTxt: '#efe3db',
    colorBtn: '#b88461',
    colorBtnHover: '#b27a54',
    colorCalc: '#996745'
  },
  {
    id: 4,
    img: "url(../images/sky.jpg)",
    colorTxt: '#e2f2fc',
    colorBtn: '#093d61',
    colorBtnHover: '#07324f',
    colorCalc: '#041b2b'
  },
  {
    id: 5,
    img: "url(../images/planet.jpg)",
    colorTxt: '#d9e8f6',
    colorBtn: '#163858',
    colorBtnHover: '#122e49',
    colorCalc: '#0a1a29'
  }
];

window.addEventListener("DOMContentLoaded", () => {
  if (window.innerWidth > 577) {
  setInterval(bgrChange, 6000);
  bgrChange();
  }
  firstDisplay();
  calculator();
});


function calculator() {
  btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e_class = e.target.classList;
      e_txt_content = e.target.textContent;

      actual_btn = e_class;

      if (first_iteration == 1) {
        first_iteration = 0;
        if (actual_btn.contains("nr")) {
          if (e_txt_content === "0" || e_txt_content === "00") {
            replace(total, "0");
            replace(calc, "0");
            totalV = 0;
            first_iteration = 1;
          } else {
            init_groupNrs = 1;
            actualGroupNrs = concatenate(arrGroupNrs, e_txt_content);
            arrActualGroupNrs.push(actualGroupNrs);
            totalV = actualGroupNrs;
            arrtotalV.push(totalV);
            updateDisplay(arrNrsCalcDisplay, arrAll, e_txt_content);
            updateArrClass(arrAllClass, actual_btn);
          }
        } else if (actual_btn.contains("minus")) {
          first_minus = 1;
          actualGroupNrs = concatenate(arrGroupNrs, "-");
          arrActualGroupNrs.push(actualGroupNrs);
          totalV = actualGroupNrs;
          arrtotalV.push(totalV);
          updateDisplay(arrNrsCalcDisplay, arrAll, "-");
          updateArrClass(arrAllClass, actual_btn);
          totalV = 0;
        }
      } else if (first_iteration == 0 && totalV === 0 && first_minus === 1) {
        if (
          actual_btn.contains("nr") &&
          !actual_btn.contains("zero") &&
          !actual_btn.contains("double-zero")
        ) {
          init_groupNrs = 1;
          actualGroupNrs = concatenate(arrGroupNrs, e_txt_content);
          arrActualGroupNrs.push(actualGroupNrs);
          totalV = actualGroupNrs;
          arrtotalV.push(totalV);
          updateDisplay(arrNrsCalcDisplay, arrAll, e_txt_content);
          updateArrClass(arrAllClass, actual_btn);
        } else if (
          actual_btn.contains("zero") ||
          actual_btn.contains("double-zero") ||
          actual_btn.contains("op")
        ) {
          firstDisplay();
        }
        first_minus = 0;
      } else {
        if (actual_btn.contains("nr")) {
          init_groupNrs = 1;
          if (init_groupNrs === 1) {
            if (actual_btn.contains("double-zero")) {
              for (let i = 0; i < 2; i++) {
                actualGroupNrs += "0";
                arrActualGroupNrs.push(actualGroupNrs);
                arrGroupNrs.push(actualGroupNrs);
                if (arrOperators.length === 0) {
                  totalV = actualGroupNrs;
                } else {
                  let lastTotal =
                    arrtotalV[arrtotalV.length - arrActualGroupNrs.length];
                  totalV = calculation(
                    lastTotal,
                    arrOperators[arrOperators.length - 1],
                    arrActualGroupNrs[arrActualGroupNrs.length - 1]
                  );
                }
                arrtotalV.push(totalV);
                updateDisplay(arrNrsCalcDisplay, arrAll, "0");
                updateArrClass(arrAllClass, btn_zero_class);
              }
            } else {
              actualGroupNrs += e_txt_content;
              arrActualGroupNrs.push(actualGroupNrs);
              arrGroupNrs.push(actualGroupNrs);
              let z = 0;
              for (let i = 0; i < actualGroupNrs.length - 1; i++) {
                if (actualGroupNrs[i] === ".") {
                  z = 1;
                }
              }
              if (arrOperators.length === 0) {
                totalV = actualGroupNrs;
              } else if (z === 1) {
                let x =
                  arrtotalV[arrtotalV.length - (arrActualGroupNrs.length - 1)];
                totalV = calculation(
                  x,
                  arrOperators[arrOperators.length - 1],
                  actualGroupNrs
                );
              } else {
                let lastTotal =
                  arrtotalV[arrtotalV.length - arrActualGroupNrs.length];
                totalV = calculation(
                  lastTotal,
                  arrOperators[arrOperators.length - 1],
                  actualGroupNrs
                );
              }
              arrtotalV.push(totalV);
              updateDisplay(arrNrsCalcDisplay, arrAll, e_txt_content);
              updateArrClass(arrAllClass, actual_btn);
            }
          }
        } else if (actual_btn.contains("point")) {
          let i = actualGroupNrs.length;
          let x = 0;
          for (i; i > 0; i--) {
            if (actualGroupNrs[i] === ".") {
              x = 1;
            }
          }
          if (arrAllClass[arrAllClass.length - 1].contains("nr") && x === 0) {
            actualGroupNrs += ".";
            arrActualGroupNrs.push(actualGroupNrs);
            arrGroupNrs.push(actualGroupNrs);
            if (groupNrs === 0) {
              totalV = actualGroupNrs;
            }

            updateDisplay(arrNrsCalcDisplay, arrAll, ".");
            updateArrClass(arrAllClass, actual_btn);
          }
        } else if (actual_btn.contains("clear")) {
          displayHistory(arrNrsCalcDisplay, totalV);
          firstDisplay();
        } else if (actual_btn.contains("delete")) {
          if (arrAllClass[arrAllClass.length - 1].contains("nr")) {
            arrAllClass.pop();
            arrAll.pop();
            arrNrsCalcDisplay.pop();
            arrActualGroupNrs.pop();
            arrGroupNrs.pop();
            actualGroupNrs = arrActualGroupNrs[arrActualGroupNrs.length - 1];

            if (arrtotalV.length - 1 === 0) {
              firstDisplay();
            } else {
              arrtotalV.pop();
              totalV = arrtotalV[arrtotalV.length - 1];
            }

            display(arrNrsCalcDisplay);
          } else if (arrAllClass[arrAllClass.length - 1].contains("op")) {
            if (arrtotalV.length === 0 || arrOperators[0].contains("single")) {
              arrtotalV.pop();
              totalV = arrtotalV[arrtotalV.length - 1];
            } else if (
              !arrAllClass[arrAllClass.length - 1].contains("single") &&
              arrAllClass[arrAllClass.length - 2].contains("single")
            ) {
              totalV = arrtotalV[arrtotalV.length - 1];
            } else if (
              arrAllClass[arrAllClass.length - 1].contains("single") &&
              arrAllClass[arrAllClass.length - 2].contains("single")
            ) {
              arrtotalV.pop();
              totalV = arrtotalV[arrtotalV.length - 1];
            }

            arrAllClass.pop();
            arrAll.pop();
            arrOperators.pop();
            arrNrsCalcDisplay.pop();
            if (arrNrsCalcDisplay[arrNrsCalcDisplay.length - 1] === ")") {
              let i = arrNrsCalcDisplay.length - 1;
              let stop = 0;

              for (i; i >= 0; i--) {
                if (stop === 0) {
                  if (arrNrsCalcDisplay[i] === "(") {
                    arrNrsCalcDisplay.splice(i, 1);
                    arrNrsCalcDisplay.pop();
                    stop = 1;
                  }
                }
              }
            }

            display(arrNrsCalcDisplay);
          } else if (arrAllClass[arrAllClass.length - 1].contains("point")) {
            arrAllClass.pop();
            arrAll.pop();
            arrActualGroupNrs.pop();
            arrGroupNrs.pop();
            arrNrsCalcDisplay.pop();
            actualGroupNrs = arrActualGroupNrs[arrActualGroupNrs.length - 1];
            groupNrs = arrGroupNrs[arrGroupNrs.length - 1];
            totalV = arrtotalV[arrtotalV.length - 1];
            display(arrNrsCalcDisplay);
          }
        } else if (actual_btn.contains("op") && actual_btn.contains("single")) {
          init_groupNrs = 0;
          if (arrAllClass[arrAllClass.length - 1].contains("single")) {
            let lGr = arrActualGroupNrs[arrActualGroupNrs.length - 1].length;
            let lDif = arrNrsCalcDisplay.length - 1 - lGr;

            if (init_parenthesis === 0) {
              arrNrsCalcDisplay.splice(lDif, 0, "(");
              init_parenthesis = 1;
            } else {
              start_parenthesis += 2;
              arrNrsCalcDisplay.splice(lDif - start_parenthesis, 0, "(");
            }
            arrNrsCalcDisplay.push(")");
          } else {
            init_parenthesis = 0;
          }

          arrOperators.push(actual_btn);

          if (arrOperators.length === 0 || arrOperators.length === 1) {
            totalV = calculation(totalV, actual_btn, 0);
          } else if (
            !arrOperators[arrOperators.length - idx_op_nonsingle].contains(
              "single"
            )
          ) {
            totalV = calculation(actualGroupNrs, actual_btn, 0);
            actualGroupNrs = totalV;
            let lastTotal =
              arrtotalV[arrtotalV.length - 1 - arrActualGroupNrs.length];
            totalV = calculation(
              lastTotal,
              arrOperators[arrOperators.length - idx_op_nonsingle],
              actualGroupNrs
            );
            idx_op_nonsingle++;
          } else {
            totalV = calculation(totalV, actual_btn, 0);
          }

          arrtotalV.push(totalV);

          updateArrClass(arrAllClass, actual_btn);
          updateDisplay(arrNrsCalcDisplay, arrAll, e_txt_content);
        } else if (
          actual_btn.contains("op") &&
          !actual_btn.contains("single")
        ) {
          init_groupNrs = 0;
          arrActualGroupNrs = [];
          groupNrs = actualGroupNrs;
          actualGroupNrs = "";

          if (
            arrAllClass[arrAllClass.length - 1].contains("op") &&
            !arrAllClass[arrAllClass.length - 1].contains("single")
          ) {
            arrOperators[arrOperators.length - 1] = actual_btn;
            arrAll[arrAll.length - 1] = actual_btn;
            arrAllClass[arrAllClass.length - 1] = actual_btn;
            arrNrsCalcDisplay[arrNrsCalcDisplay.length - 1] = e_txt_content;
            display(arrNrsCalcDisplay);
          } else {
            arrOperators.push(actual_btn);
            updateArrClass(arrAllClass, actual_btn);
            updateDisplay(arrNrsCalcDisplay, arrAll, e_txt_content);
          }
        }
      }
    });
  });
}

function updateArrElemDeleted(arr) {
  arr.pop();
}

function updateDisplay(arrDisplay, arr, x) {
  concatenate(arr, x);
  arrDisplay.push(x);
  display(arrDisplay);
}

function updateArrClass(arr, x) {
  concatenate(arr, x);
}

function firstDisplay() {
  total.innerHTML = "0";
  calc.innerHTML = "0";
  init_groupNrs = 0;
  groupNrs = 0;
  actualGroupNrs = 0;
  actual_btn = 0;
  totalV = 0;
  first_iteration = 1;

  arrNrsCalcDisplay = [];
  arrGroupNrs = [];
  arrActualGroupNrs = [];
  arrOperators = [];
  arrtotalV = [];
  arrAll = [];
  arrAllClass = [];
}

function concatenate(arr, x) {
  arr.push(x);
  return arr.join("");
}

function display(arr) {
  total.innerHTML = totalV;
  calc.innerHTML = arr.join("");
}

function replace(elem, replace) {
  elem.innerHTML = replace;
}

function displayHistory(cont, t) {
  let displayCalc = cont.map((item) => {
    return `${item}`;
  });

  displayCalc = displayCalc.join("");
  history.innerHTML += `<p class="calc-items">` + displayCalc + ` = ${t}</p>`;
}

function calculation(lastNr, op, newNr) {
  let res = 0;
  let x = parseFloat(lastNr);
  let y = parseFloat(newNr);

  if (op.contains("plus")) {
    res = addition(x, y);
  } else if (op.contains("minus")) {
    res = substraction(x, y);
  } else if (op.contains("multiply")) {
    res = multiplication(x, y);
  } else if (op.contains("divide")) {
    res = division(x, y);
  } else if (op.contains("percent")) {
    res = procent(lastNr);
  } else if (op.contains("exponent")) {
    res = xSquared(lastNr);
  } else {
    res = newNr;
  }

  return res;
}

function addition(x, y) {
  return x + y;
}

function substraction(x, y) {
  return x - y;
}

function multiplication(x, y) {
  return x * y;
}

function division(x, y) {
  return x / y;
}

function procent(x) {
  return x / 100;
}

function xSquared(x) {
  return x * x;
}

total.addEventListener('mousemove', function(e) {
    // mouse position raported to container
    const mouseX = e.clientX - total.getBoundingClientRect().right;
    const displayWidth = total.clientWidth;
    const scrollWidth = total.scrollWidth;  
    // margin in %. Distance mouse from container margin
    const scrollPosition = (mouseX / displayWidth) * (scrollWidth - displayWidth);  
    // scroll position set
    total.scrollLeft = scrollPosition;
});

calc.addEventListener('mousemove', function(e) {
  const mouseX = e.clientX - calc.getBoundingClientRect().right;
  const displayWidth = calc.clientWidth;
  const scrollWidth = calc.scrollWidth;
  const scrollPosition = (mouseX / displayWidth) * (scrollWidth - displayWidth);
  calc.scrollLeft = scrollPosition;
});

function bgrChange(){
  root_theme.style.setProperty('--bgr-img', bgrImage[currentImgIdx].img);
  root_theme.style.setProperty('--txt-color', bgrImage[currentImgIdx].colorTxt);
  root_theme.style.setProperty('--bgr-calc-color-light', bgrImage[currentImgIdx].colorBtn);
  root_theme.style.setProperty('--bgr-calc-color-light-hover', bgrImage[currentImgIdx].colorBtnHover);
  root_theme.style.setProperty('--bgr-calc-color', bgrImage[currentImgIdx].colorCalc);
  currentImgIdx = (currentImgIdx + 1) % bgrImage.length;
}
