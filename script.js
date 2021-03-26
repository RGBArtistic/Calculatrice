let button = document.querySelectorAll("button");

let buttonVirgule = document.querySelector("button[data-type=virgule]");
let buttonNegPos = document.querySelector("button[data-type=neg-pos]");
let afficheur = document.querySelector("#afficheur") ;
let total = 0;
let number = "";
let ope1 = "";
let ope2 = "";

for (cell of button) {
    cell.addEventListener("click", function () {
        if (this.dataset.type == "chiffre") {
            number += this.value;
            afficheur.textContent = number;
        }
        else if (this.dataset.type == "virgule" && this.dataset.bool == "false") {
            number += this.value;
            this.dataset.bool = "true";
            afficheur.textContent = number;
        }
        else if (this.dataset.type == "neg-pos") {
            if (this.dataset.bool == "false") {
                number = this.value + number;
                this.dataset.bool = "true";
            }
            else {
                number = number.substring(1);
                this.dataset.bool = "false";
            }
            afficheur.textContent = number;
        }
        else if (this.dataset.type == "reset-g") {
            ope1 = "";
            ope2 = "";
            number = "";
            total = 0;
            buttonVirgule.dataset.bool = "false";
            buttonNegPos.dataset.bool = "false";
            afficheur.textContent = total;
        }
        else if (this.dataset.type == "reset-n") {
            number = "";
            buttonVirgule.dataset.bool = "false";
            buttonNegPos.dataset.bool = "false";
        }
        else {
            if (this.dataset.type == "operateur" && total == 0) {
                ope1 = this.value;
                total = Number(number);
                number = "";
                buttonVirgule.dataset.bool = "false";
                buttonNegPos.dataset.bool = "false";
            }
            else if (this.dataset.type == "operateur" && total !== 0) {
                ope2 = this.value;
                buttonVirgule.dataset.bool = "false";
                buttonNegPos.dataset.bool = "false";
    
                if (ope1 == "+") {
                    total += Number(number);
                    afficheur.textContent = total;
                }
                else if (ope1 == "-") {
                    total = total - Number(number);
                    afficheur.textContent = total;
                }
                else if (ope1 == "*") {
                    total = total * Number(number);
                    afficheur.textContent = total;
                }
                else if (ope1 == "/") {
                    total = total / Number(number);
                    afficheur.textContent = total;
                }
                
                else {
                    
                }
                if (ope2 == "=") {
                    afficheur.textContent = total;
                    ope2 = "";
                    ope1 = "";
                    total = 0 ;
                    number = "" ;
                }      
                ope1 = ope2;
                number = "";
            }       
        }    
    });
}
