
function showAnswer(id, text) {
    document.getElementById(id).textContent = text;
    console.log(text);
}


function countYears(m, s) {
    let debt = m;
    let years = 0;

    while (debt <= s) {
        debt = debt * 1.2;
        years++;
    }

    return { years: years, debt: debt };
}

function task1() {
    let m = Number(document.getElementById("loan").value);
    let s = Number(document.getElementById("limit").value);

    if (m <= 0) {
        showAnswer("answer1", "Ошибка: M должно быть больше нуля");
        return;
    }

    let result = countYears(m, s);
    showAnswer("answer1",
        "Долг превысит " + s + " тыс. руб. через " + result.years + " лет(года).\n" +
        "Долг в этот момент: " + result.debt.toFixed(2) + " тыс. руб.");
}


function sumFromLastNegativeSin(arr) {
    let index = -1;
    for (let i = arr.length - 1; i >= 0; i--) {
        if (Math.sin(arr[i]) < 0) {
            index = i;
            break;
        }
    }

    if (index === -1) {
        return null; // таких элементов нет
    }

    let sum = 0;
    for (let i = index; i < arr.length; i++) {
        sum = sum + arr[i];
    }
    return { index: index, sum: sum };
}

function allDigitsPrime(n) {
    let digits = String(n);
    for (let i = 0; i < digits.length; i++) {
        let d = digits[i];
        if (d !== "2" && d !== "3" && d !== "5" && d !== "7") {
            return false;
        }
    }
    return true;
}


function removePrimeDigitNumbers(arr) {
    return arr.filter(function (x) {
        let whole = Math.abs(Math.trunc(x));
        return !allDigitsPrime(whole);
    });
}

function task2() {
    let text = document.getElementById("numbers").value;
    let arr = text.split(",").map(Number);

    let partA = sumFromLastNegativeSin(arr);
    let textA;
    if (partA === null) {
        textA = "нет элементов с отрицательным синусом";
    } else {
        textA = "последний элемент с sin < 0: arr[" + partA.index + "] = " + arr[partA.index] +
            ", сумма до конца = " + partA.sum.toFixed(3);
    }

    let partB = removePrimeDigitNumbers(arr);

    showAnswer("answer2",
        "Исходный массив: [" + arr.join(", ") + "]\n" +
        "Часть А: " + textA + "\n" +
        "Часть Б: [" + partB.join(", ") + "]");
}


function getFolders(path) {
    let parts = path.split(/[\\/]/);
    let folders = [];

    for (let i = 0; i < parts.length - 1; i++) {
        let name = parts[i];
        if (name === "" || name.endsWith(":")) {
            continue;
        }
        folders.push(name);
    }
    return folders;
}

function task4() {
    let path = document.getElementById("path").value.trim();
    let folders = getFolders(path);

    if (folders.length === 0) {
        showAnswer("answer4", "В пути нет папок");
        return;
    }

    let text = "Найдено папок: " + folders.length + "\n";
    for (let i = 0; i < folders.length; i++) {
        text = text + (i + 1) + ") " + folders[i] + "\n";
    }
    showAnswer("answer4", text);
}


document.getElementById("btn-task1").addEventListener("click", task1);
document.getElementById("btn-task2").addEventListener("click", task2);
document.getElementById("btn-task4").addEventListener("click", task4);
