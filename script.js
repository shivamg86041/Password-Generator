const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNum]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copybtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercase = document.querySelector("#uppercase");
const lowercase = document.querySelector("#lowercase");
const numbers = document.querySelector("#number");
const symbol = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generatebtn = document.querySelector(".generateButton");
const allCheckboxes = document.querySelectorAll("input[type=checkbox]");
let symbols = ';)~!@#$(}[%^&*"?></{*-+=_]';
let strlength = symbols.length;

let password = "";
let passwordLen = 10;
let checkCount = 0;
handleSlider();
setIndicator("#ccc");
//set password Length
function handleSlider(){
    inputSlider.value = passwordLen;
    lengthDisplay.innerText = passwordLen;
    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ((passwordLen - min)*100/(max - min)) + "% 100%";
}
inputSlider.addEventListener("input", (e) =>{
    passwordLen = e.target.value;
    handleSlider();
});

function setIndicator(color){
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

function getrndInteger(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomNumber(){
    return getrndInteger(0, 9);
}

function getRandomLowercase(){
    return String.fromCharCode(getrndInteger(97, 123));
}

function getRandomUppercase(){
    return String.fromCharCode(getrndInteger(65, 91));
}

function getRandomSymbols(){
    let a =  getrndInteger(0, strlength);
    return symbols.charAt(a);
}

function calcStrength(){
    let upper = false;
    let lower = false;
    let hasNum = false;
    let hasSym = false;
    if(uppercase.checked) upper = true;
    if(lowercase.checked) lower = true;
    if(numbers.checked) hasNum = true;
    if(symbol.checked) hasSym = true;
    if(upper && lower && (hasNum || hasSym) && passwordLen>=8){
        setIndicator("#0f0");
    }
    else if((upper || lower) && (hasNum || hasSym) && password>=6){
        setIndicator("#ff0");
    }
    else{
        setIndicator("#f00");
    }

}

async function copyContent(){
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "Copied";

    } catch (error) {
        copyMsg.innerText = "Failed";
    }

    //to make copy vala test visible
    copyMsg.classList.add("active");

    setTimeout(() => {
        copyMsg.classList.remove("active");
    }, 2000);
}

copybtn.addEventListener('click', ()=>{
    if(passwordDisplay.value){
        copyContent();
    }
})


function handleCheckbox(){
    checkCount = 0;
    allCheckboxes.forEach((checkbox) =>{
        if(checkbox.checked){
            checkCount++;
        }
    })

    if(passwordLen < checkCount){
        passwordLen = checkCount;
        handleSlider();
        console.log("pass km ho gya1")
    }
}
allCheckboxes.forEach((checkbox)=>{
    checkbox.addEventListener('click', handleCheckbox)
})

generatebtn.addEventListener('click', ()=>{
    if(checkCount<=0){
        window.alert("Please select one of the checkBox!!!");
    }
    if(passwordLen<checkCount){
        passwordLen = checkCount;
        handleSlider();
        console.log("pass km ho gya2")

    }

    password = "";
    // if(uppercase.checked){
    //     password = getRandomUppercase();
    // }
    // if(numbers.checked){
    //     password = getRandomNumber();
    // }
    // if(symbol.checked){
    //     password = getRandomSymbols();
    // }
    // if(lowercase.checked){
    //     password = getRandomLowercase();
    // }

    let funcArr = [];
    if(uppercase.checked){
        funcArr.push(getRandomUppercase);
    }
    if(lowercase.checked){
        funcArr.push(getRandomLowercase);
    }
    if(symbol.checked){
        funcArr.push(getRandomSymbols);
    }
    if(numbers.checked){
        funcArr.push(getRandomNumber);
    }

    for(let i = 0 ;i<funcArr.length;i++){
        password += funcArr[i]();
    }

    for(let i = 0;i<passwordLen-funcArr.length;i++){
        let randindex = getrndInteger(0, funcArr.length);
        password += funcArr[randindex]();
    }

    password = shufflePassword(Array.from(password));

    passwordDisplay.value = password;
    calcStrength();
})

function shufflePassword(points){
    // Fisher yates method
    for (let i = points.length -1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i+1));
        let k = points[i];
        points[i] = points[j];
        points[j] = k;
      }
      let str = "";
      points.forEach((el) =>{str += el});
      return str;
}