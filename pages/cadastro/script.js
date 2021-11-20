function cadastrar() {
    let inputDivs = document.querySelectorAll(".form .form-input")
    let filledEmail = false, passwordConfirmed = false
    let registerUser = {
        name: "",
        email: "",
        password: ""
    }

    let input = ""
    for(inputDiv of inputDivs) {
        inputDiv.className = "form-input"

        input = inputDiv.querySelector("input")
        input.className = ""

        if(input.value == "") {
            inputDiv.classList.add("error")
            input.classList.add("error")
        }else {
            switch (input.placeholder) {
                case "Nome":
                    registerUser.name = input.value
                    break;
            
                case "Email":
                        registerUser.email = input.value
                        filledEmail = true
                    
                    break;
            
                case "Senha":
                    registerUser.password = input.value

                    break;
            
                case "Confirmar Senha":
                    if(registerUser.password == input.value) {
                        passwordConfirmed = true
                    }else {
                        registerUser.password = ""
                        inputDiv.classList.add("error")
                        input.classList.add("error")
                    }
                    break;
            
                default:
                    break;
            }     
        }
    }
    
    if(filledEmail && passwordConfirmed) {
        window.location.href = "../login"
    }
}