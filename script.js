let button = document.querySelectorAll("button");

let buttonVirgule = document.querySelector("button[data-type=virgule]");
let buttonNegPos = document.querySelector("button[data-type=neg-pos]");
let afficheur = document.querySelector("#afficheur") ;
let historique = document.querySelector("#subCont2") ;
let total = 0;
let number = "";
let ope1 = "";
let ope2 = "";
let valsArray = ['1','2','3','4','5','6','7','8','9','0','-','c','.','+','-','*','/','=','ce'] ;
var scrolled = false;

for (cell of button) {
    cell.addEventListener("click", function () {
        let verifVal = false ;
        for(cellVal of valsArray) {
            if(this.value == cellVal) verifVal = true
        }
        if(verifVal == true) {
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
                    historique.innerHTML += `<p>${total}</p>`;
                }
                else if (this.dataset.type == "operateur" && total !== 0) {
                    ope2 = this.value;
                    buttonVirgule.dataset.bool = "false";
                    buttonNegPos.dataset.bool = "false";
        
                    if (ope1 == "+") {
                        total += Number(number);
                        afficheur.textContent = total;
                        historique.innerHTML += `<p>${ope1} ${Number(number)} = ${total}</p>`;
                    }
                    else if (ope1 == "-") {
                        total = total - Number(number);
                        afficheur.textContent = total;
                        historique.innerHTML += `<p>${ope1} ${Number(number)} = ${total}</p>`;
                    }
                    else if (ope1 == "*") {
                        total = total * Number(number);
                        afficheur.textContent = total;
                        historique.innerHTML += `<p>${ope1} ${Number(number)} = ${total}</p>`;
                    }
                    else if (ope1 == "/") {
                        total = total / Number(number);
                        afficheur.textContent = total;
                        historique.innerHTML += `<p>${ope1} ${Number(number)} = ${total}</p>`;
                    }
                    
                    else {
                        
                    }
                    if (ope2 == "=") {
                        afficheur.textContent = total;
                        historique.innerHTML += `<p>${ope2} ${total}</p>`;
                        ope2 = "";
                        ope1 = "";
                        total = 0 ;
                        number = "" ;
                    }      
                    ope1 = ope2;
                    number = "";
                }       
            }
        }
        else afficheur.textContent = 'Arrête de jouer avec la consôle'
    });
}

function updateScroll(){
    historique.scrollTop = historique.scrollHeight;
}


setInterval(updateScroll,1000);

historique.addEventListener('scroll', function(){
    scrolled=true;
});
