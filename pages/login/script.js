function login() {
    let inputDivs = document.querySelectorAll(".form .form-input")
    let inputValues = []
    let filledEmail = false, filledPassword = false

    let input = ""
    for(inputDiv of inputDivs) {
        inputDiv.className = "form-input"

        input = inputDiv.querySelector("input")
        inputValues.push(input.value)
        input.className = ""

        if(input.value == "") {
            inputDiv.classList.add("error")
            input.classList.add("error")
        }else {
            if(input.placeholder == "Email") {
                filledEmail = true
            }

            if(input.placeholder == "Senha") {
                filledPassword = true
            }            
        }
    }

    if(filledEmail && filledPassword) {
        window.location.href = "../feed.html"
    }
}