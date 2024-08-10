// Inputs
const mortgageAmountInput = document.querySelector("#mortgage-amount-input");
const mortgageTermInput = document.querySelector("#mortgage-term-input");
const mortgageRateInput = document.querySelector("#interest-rate-input");
const radioButtons = document.querySelectorAll("input[type=radio]");

// Errors
const amountError = document.querySelector("#amount-error");
const termError = document.querySelector("#term-error");
const rateError = document.querySelector("#rate-error");
const typeError = document.querySelector("#type-error");

// Buttons
const clearButton = document.querySelector("#clear-btn");
const submitButton = document.querySelector("button[type=submit]");

// Containers
const radioBtnContainer = document.querySelectorAll(".mortgage-type div");
const preResultContainer = document.querySelector(".pre-result-container");
const posResultContainer = document.querySelector(".pos-result-container");


// Checking radio button when the user click on any place on the type container
radioBtnContainer.forEach(container=>{
    container.addEventListener("click",()=>{
        container.querySelector("input").checked=true;
    })
})

// Show error when input is empty or none of the radio buttons are checked
function showErrorInput(input,error){
    const currency = error.parentElement.querySelector("span");

    currency.style.color="white";
    currency.style.backgroundColor="var(--red)";
    input.style.borderColor="var(--red)";
    error.classList.remove("hidden");
}

// Calculate and Show result
function calculateResult(){
    let type = document.querySelector("input[type=radio]:checked").value;
    let amount = parseInt(mortgageAmountInput.value);
    let noOfYears = parseInt(mortgageTermInput.value);
    let interest = parseFloat(mortgageRateInput.value);

    let monthlyPayment = 0;
    let totalValue = 0;

    if(type==="repayment"){
        let n = noOfYears * 12;
        if(interest == 0){
            monthlyPayment = (amount/n);
            totalValue = amount;
        } else {
        let r = parseFloat(((interest/100) / 12).toFixed(10));
        monthlyPayment = (amount * (r * Math.pow((1+r), n)) / (Math.pow((1+r), n)-1));
        totalValue = monthlyPayment * n;
        }
    } else {
        monthlyPayment = (amount * ((interest / 100) / 12));
        totalValue = monthlyPayment * noOfYears * 12;
    }
    document.getElementById('monthly-repayments').innerHTML = "£" + numberWithCommas(monthlyPayment.toFixed(2));
    document.getElementById('total-amount').innerHTML = "£" + numberWithCommas(totalValue.toFixed(2));
}

function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}

// On submit, it should show result or show errors
submitButton.addEventListener("click",(e)=>{
    e.preventDefault();
    let isValid = true;

    if(!mortgageAmountInput.value){
        showErrorInput(mortgageAmountInput,amountError);
        isValid=false;
    }
    if(!mortgageTermInput.value){
        showErrorInput(mortgageTermInput,termError);
        isValid=false;
    }
    if(!mortgageRateInput.value){
        showErrorInput(mortgageRateInput,rateError);
        isValid=false;
    }
    if(!radioButtons[0].checked && !radioButtons[1].checked){
        typeError.classList.remove("hidden");
        isValid=false;
    }

    if(isValid){
        calculateResult();
        preResultContainer.classList.add("hidden");
        posResultContainer.classList.remove("hidden");
    }
})
