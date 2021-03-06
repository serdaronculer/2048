var rows = document.querySelectorAll(".row");
var score = document.querySelector(".score");
var newGameButton = document.querySelector(".new-game");
var end = document.querySelector(".end");
var point = document.querySelector(".point");
var restart = document.querySelector(".restart");
var arrowKey;
(function (arrowKey) {
    arrowKey[arrowKey["ArrowDown"] = 40] = "ArrowDown";
    arrowKey[arrowKey["ArrowUp"] = 38] = "ArrowUp";
    arrowKey[arrowKey["ArrowLeft"] = 37] = "ArrowLeft";
    arrowKey[arrowKey["ArrowRight"] = 39] = "ArrowRight";
})(arrowKey || (arrowKey = {}));
;
document.addEventListener("keydown", function (e) {
    if (e.keyCode == arrowKey.ArrowLeft && end.style.display == "none") {
        var blockArray_1 = [];
        var blocks = document.querySelectorAll(".block");
        blocks.forEach(function (item) {
            blockArray_1.push(item);
        });
        var ok = blockArray_1.every(function (item) { return item.children.length > 0; });
        var flag = moveLeft();
        var flagII = leftInsertBlock();
        if (!ok && flag > 0 || flagII > 0) {
            valueGenerator();
        }
    }
    if (e.keyCode == arrowKey.ArrowUp && end.style.display == "none") {
        var blockArray_2 = [];
        var blocks = document.querySelectorAll(".block");
        blocks.forEach(function (item) {
            blockArray_2.push(item);
        });
        var ok = blockArray_2.every(function (item) { return item.children.length > 0; });
        var flag = moveUp();
        var flagII = upInstertBlock();
        if (!ok && flag > 0 || flagII > 0) {
            valueGenerator();
        }
    }
    if (e.keyCode == arrowKey.ArrowDown && end.style.display == "none") {
        var blockArray_3 = [];
        var blocks = document.querySelectorAll(".block");
        blocks.forEach(function (item) {
            blockArray_3.push(item);
        });
        var ok = blockArray_3.every(function (item) { return item.children.length > 0; });
        var flag = moveDown();
        var flagII = downInsertBlock();
        if (!ok && flag > 0 || flagII > 0) {
            valueGenerator();
        }
    }
    if (e.keyCode == arrowKey.ArrowRight && end.style.display == "none") {
        var blockArray_4 = [];
        var blocks = document.querySelectorAll(".block");
        blocks.forEach(function (item) {
            blockArray_4.push(item);
        });
        var ok = blockArray_4.every(function (item) { return item.children.length > 0; });
        var flag = moveRight();
        var flagII = rightInsertBlock();
        if (!ok && flag > 0 || flagII > 0) {
            valueGenerator();
        }
    }
    gameOverCheck();
});
document.addEventListener("DOMContentLoaded", function (e) {
    rows.forEach(function (item) {
        for (var index = 0; index < 4; index++) {
            item.appendChild(createBlock());
        }
    });
    valueGenerator();
});
function valueGenerator() {
    var _loop_1 = function (index) {
        var selectedRow = rows[randomNumberGenarate(4)];
        var selectedBlock = selectedRow.children[randomNumberGenarate(4)];
        if (selectedBlock.children.length < 1) {
            var cell_1 = createCell();
            selectedBlock.appendChild(cell_1);
            setTimeout(function () {
                cell_1.style.opacity = "1";
                cell_1.style.transform = "scale(1)";
            }, 0.8);
            return "break";
        }
    };
    for (var index = 0;; index++) {
        var state_1 = _loop_1(index);
        if (state_1 === "break")
            break;
    }
}
function randomNumberGenarate(number) {
    var index = Math.floor(Math.random() * number);
    return index;
}
function createBlock() {
    var block = document.createElement("div");
    block.style.width = "100px";
    block.style.height = "100px";
    block.style.background = "rgba(238,228,218,.35)";
    block.classList.add("block");
    return block;
}
function createCell() {
    var randomNumber = [2, 2, 4, 2];
    var index = randomNumberGenarate(randomNumber.length);
    var cell = document.createElement("div");
    cell.classList.add("cell");
    cell.style.color = "#776E65";
    cell.style.background = "#EEE4DA";
    cell.style.fontWeight = "bold";
    cell.style.opacity = "0.2";
    cell.style.transform = "scale(0.4)";
    cell.style.margin = "auto";
    cell.style.transition = "opacity 1s, transform 1s";
    cell.innerHTML = randomNumber[index].toString();
    return cell;
}
function moveLeft() {
    var rowsArray = rowsArrayXFunc();
    var flag = 0;
    for (var a = 0; a < 3; a++) {
        for (var i = 0; i < 4; i++) {
            for (var j = a + 1; j < 4; j++) {
                if ((rowsArray[i])[a] == "" && (rowsArray[i])[j] != "") {
                    var cell = ((rows[i]).children[j]).children[0];
                    cell.remove();
                    ((rows[i]).children[a]).appendChild(cell);
                    rowsArray = rowsArrayXFunc();
                    flag++;
                }
            }
        }
        rowsArray = rowsArrayXFunc();
    }
    return flag;
}
function moveRight() {
    var rowsArray = rowsArrayXFunc();
    var flag = 0;
    for (var a = 3; a > 0; a--) {
        for (var i = 0; i < 4; i++) {
            for (var j = a - 1; j >= 0; j--) {
                if ((rowsArray[i])[a] == "" && (rowsArray[i])[j] != "") {
                    var cell = ((rows[i]).children[j]).children[0];
                    cell.remove();
                    ((rows[i]).children[a]).appendChild(cell);
                    rowsArray = rowsArrayXFunc();
                    flag++;
                }
            }
        }
        rowsArray = rowsArrayXFunc();
    }
    return flag;
}
function moveUp() {
    var flag = 0;
    var rowsArray = rowsArrayXFunc();
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            for (var k = i + 1; k < 4; k++) {
                if (rowsArray[i][j] == "" && rowsArray[k][j] != "") {
                    var cell = ((rows[k]).children[j]).children[0];
                    cell.remove();
                    ((rows[i]).children[j]).appendChild(cell);
                    rowsArray = rowsArrayXFunc();
                    flag++;
                }
            }
        }
        rowsArray = rowsArrayXFunc();
    }
    return flag;
}
function moveDown() {
    var flag = 0;
    var rowsArray = rowsArrayXFunc();
    for (var i = 3; i > 0; i--) {
        for (var j = 0; j < 4; j++) {
            for (var k = i - 1; k >= 0; k--) {
                if (rowsArray[i][j] == "" && rowsArray[k][j] != "") {
                    var cell = ((rows[k]).children[j]).children[0];
                    cell.remove();
                    ((rows[i]).children[j]).appendChild(cell);
                    rowsArray = rowsArrayXFunc();
                    flag++;
                }
            }
        }
        rowsArray = rowsArrayXFunc();
    }
    return flag;
}
function leftInsertBlock() {
    var flagII = 0;
    var rowsArray = rowsArrayXFunc();
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 3; j++) {
            if (rowsArray[i][j] == rowsArray[i][j + 1] && rowsArray[i][j] != "") {
                var cell = ((rows[i]).children[j + 1]).children[0];
                cell.remove();
                var newCell = ((rows[i]).children[j]).children[0];
                var number = parseInt(newCell.textContent);
                newCell.textContent = (number * 2).toString();
                cellColor(number, newCell);
                rowsArray = rowsArrayXFunc();
                var totalPoint = parseInt(score.textContent);
                totalPoint += number * 2;
                score.textContent = totalPoint.toString();
                flagII++;
            }
        }
    }
    moveLeft();
    return flagII;
}
function cellColor(number, cell) {
    switch (number * 2) {
        case 8:
            cell.style.background = "#F3B27A";
            cell.style.color = "#FFF";
            break;
        case 16:
            cell.style.background = "#F69664";
            break;
        case 32:
            cell.style.background = "#F77C5F";
            break;
        case 64:
            cell.style.background = "##F75F3B";
            break;
        case 128:
            cell.style.background = "#EDD073";
            cell.style.textShadow = "rgb(255, 255, 255) 0px 0px 5px, rgb(255, 255, 255) 0px 0px 10px";
            break;
        case 256 || 512 || 1024 || 2048:
            cell.style.background = "#EDCC62";
            cell.style.textShadow = "0 0 5px #FFF, 0 0 10px #FFF, 0 0 15px #FFF, 0 0 20px #EDCC62, 0 0 30px #EDCC62, 0 0 40px #EDCC62, 0 0 55px #EDCC62";
    }
}
function rightInsertBlock() {
    var flagII = 0;
    var rowsArray = rowsArrayXFunc();
    for (var i = 0; i < 4; i++) {
        for (var j = 3; j > 0; j--) {
            if (rowsArray[i][j] == rowsArray[i][j - 1] && rowsArray[i][j] != "") {
                var cell = ((rows[i]).children[j - 1]).children[0];
                cell.remove();
                var newCell = ((rows[i]).children[j]).children[0];
                var number = parseInt(newCell.textContent);
                newCell.textContent = (number * 2).toString();
                cellColor(number, newCell);
                rowsArray = rowsArrayXFunc();
                var totalPoint = parseInt(score.textContent);
                totalPoint += number * 2;
                score.textContent = totalPoint.toString();
                flagII++;
            }
        }
    }
    moveRight();
    return flagII;
}
function upInstertBlock() {
    var flagII = 0;
    var rowsArray = rowsArrayXFunc();
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 4; j++) {
            if (rowsArray[i][j] == rowsArray[i + 1][j] && rowsArray[i][j] != "") {
                var cell = ((rows[i + 1]).children[j]).children[0];
                cell.remove();
                var newCell = ((rows[i]).children[j]).children[0];
                var number = parseInt(newCell.textContent);
                newCell.textContent = (number * 2).toString();
                cellColor(number, newCell);
                rowsArray = rowsArrayXFunc();
                var totalPoint = parseInt(score.textContent);
                totalPoint += number * 2;
                score.textContent = totalPoint.toString();
                flagII++;
            }
        }
    }
    moveUp();
    return flagII;
}
function downInsertBlock() {
    var flagII = 0;
    var rowsArray = rowsArrayXFunc();
    for (var i = 3; i > 0; i--) {
        for (var j = 0; j < 4; j++) {
            if (rowsArray[i][j] == rowsArray[i - 1][j] && rowsArray[i][j] != "") {
                var cell = ((rows[i - 1]).children[j]).children[0];
                cell.remove();
                var newCell = ((rows[i]).children[j]).children[0];
                var number = parseInt(newCell.textContent);
                newCell.textContent = (number * 2).toString();
                cellColor(number, newCell);
                rowsArray = rowsArrayXFunc();
                var totalPoint = parseInt(score.textContent);
                totalPoint += number * 2;
                score.textContent = totalPoint.toString();
                flagII++;
            }
        }
    }
    moveDown();
    return flagII;
}
function rowsArrayXFunc() {
    var rowsArray = [];
    for (var i = 0; i < 4; i++) {
        var XLocation = [];
        for (var j = 0; j < 4; j++) {
            var selectedRow = rows[i];
            var selectedBlock = selectedRow.children[j].textContent;
            XLocation.push(selectedBlock);
        }
        rowsArray.push(XLocation);
    }
    return rowsArray;
}
function gameOverCheck() {
    var blockArray = [];
    var blocks = document.querySelectorAll(".block");
    blocks.forEach(function (item) {
        blockArray.push(item);
    });
    var notEmpty = blockArray.every(function (item) { return item.children.length > 0; });
    var rowsArray = rowsArrayXFunc();
    var control = false;
    for (var i = 0; i < 4; i++) {
        if (control)
            break;
        for (var j = 0; j < 3; j++) {
            if (rowsArray[i][j] == rowsArray[i][j + 1] && rowsArray[i][j] != "") {
                console.log(rowsArray[i][j]);
                control = true;
                break;
            }
        }
    }
    if (!control) {
        for (var i = 0; i < 4; i++) {
            if (control)
                break;
            for (var j = 0; j < 3; j++) {
                if (rowsArray[j][i] != "" && rowsArray[j][i] == rowsArray[j + 1][i]) {
                    console.log(rowsArray[j][i]);
                    control = true;
                }
            }
        }
    }
    if (!control && notEmpty) {
        end.style.display = "flex";
        newGame();
        restart.addEventListener("click", function () {
            end.style.display = "none";
        });
    }
}
newGameButton.addEventListener("click", newGame);
function newGame() {
    point.textContent = "Point : ".concat(score.textContent);
    score.textContent = "0";
    var blocks = document.querySelectorAll(".block");
    blocks.forEach(function (item) {
        if (item.children.length > 0)
            item.children[0].remove();
    });
    valueGenerator();
}
