let button = document.querySelectorAll("button");
//  Déclaration des variables nécessaires 
let buttonVirgule = document.querySelector("button[data-type=virgule]");
let buttonNegPos = document.querySelector("button[data-type=neg-pos]");
let afficheur = document.querySelector("#afficheur") ;
let historique = document.querySelector("#subCont2") ;
let total = 0;
let currentNumber = '' ;
let negpos = false ;
let virgule = false ;
let arrayCalcul = {total: '', ope: '', egal: false, num1: '', num2: ''} ;
let scrolled = false ;

let valsArray = ['1','2','3','4','5','6','7','8','9','0','-','c','.','+','-','*','/','=','ce'] ;
let dataTypeArray = ['chiffre', 'operateur', 'virgule', 'reset-n', 'neg-pos', 'reset-g']

// Création d'une boucle pour parcourir les différents boutons
for (cell of button) {
  cell.addEventListener("click", function () {
    let dataset = this.dataset.type
    let verifVal = false ;
    let verifDataType = false ;
    // Vérification que les valeurs et les data-set ne soient pas modifiés
    for(cellVal of valsArray) {
      if(this.value == cellVal) verifVal = true
    }
    for(cellDataType of dataTypeArray) {
      if(dataset == cellDataType) verifDataType = true
    }
    if(verifDataType && verifVal) {
      // action à executer lorsque le bouton est un chiffre 
      if(dataset == 'chiffre') {
        if(arrayCalcul['egal'] == true) {
          arrayCalcul['ope'] = '' ;
          arrayCalcul['num1'] = '' ;
          arrayCalcul['egal'] = false
        }
        currentNumber += this.value ;
        afficheur.textContent = currentNumber ;
      }
      // action à executer lorsque le bouton est + / -
      else if(dataset == 'neg-pos' && !negpos) {
        currentNumber = '-'+currentNumber ;
        negpos = true ;
      }
      else if(dataset == 'neg-pos' && negpos) {
        currentNumber = currentNumber.substr(1,currentNumber.length);
        negpos = false ;
      }
      // action à executer lorsque le bouton est une virgule
      else if(dataset == 'virgule' && !virgule) {
        currentNumber = currentNumber + '.' ;
        virgule = true ;
      }
      // action à executer pour reset toutes les données de l'appli
      else if(dataset == 'reset-g') {
        currentNumber = '' ;
        afficheur.textContent = '';
        virgule = false ;
        negpos = false ;
        arrayCalcul['num1'] = '';
        arrayCalcul['num2'] = '' ;
        arrayCalcul['ope'] = '' ;
        arrayCalcul['total'] = '' ;
      }
      // action à executer pour reset uniquement le donnée courante
      else if(dataset == 'reset-n') {
        currentNumber = '' ;
        afficheur.textContent = '';
        virgule = false ;
        negpos = false ;
      }
      // actions à executer lorsque le bouton est un opérateur 
      else if(dataset == 'operateur') {
        virgule = false ;
        negpos = false ;
        // Vérification que l'opérateur n'est pas =
        if(arrayCalcul['egal'] == true) {
          arrayCalcul['num1'] = arrayCalcul['total'] ;
          arrayCalcul['total'] = '';
          arrayCalcul['egal'] = false ;
        }
        // Vérification si les nb 1 est rempli et 2 non
        if(arrayCalcul['num1'] == '') {
          arrayCalcul['num1'] = currentNumber ;
          if(this.value !== '=') {
            arrayCalcul['ope'] = this.value;
          } else arrayCalcul['num1'] = '' ;
        }
        else if(arrayCalcul['num2'] == '') {
          // ajout du nombre courant dans le nombre 2 afin d'executer les calculs
          arrayCalcul['num2'] = currentNumber ;
          if(this.value == '=') {
            arrayCalcul['egal'] = true ;
          }
          // Addition
          if(arrayCalcul['ope'] == '+') {
            arrayCalcul['total'] = Number(arrayCalcul['num1']) + Number(arrayCalcul['num2']) ;
            historique.innerHTML += `<p>${arrayCalcul['num1']} + ${arrayCalcul['num2']} = ${arrayCalcul['total']}</p>` ;
            if(arrayCalcul['egal'] !== true) arrayCalcul['ope'] = this.value;
            arrayCalcul['num1'] = arrayCalcul['total'] ;
            arrayCalcul['num2'] = '' ;
          }
          // Soustraction
          else if(arrayCalcul['ope'] == '-') {
            arrayCalcul['total'] = Number(arrayCalcul['num1']) - Number(arrayCalcul['num2']) ;
            historique.innerHTML += `<p>${arrayCalcul['num1']} - ${arrayCalcul['num2']} = ${arrayCalcul['total']}</p>` ;
            if(arrayCalcul['egal'] !== true) arrayCalcul['ope'] = this.value;
            arrayCalcul['num1'] = arrayCalcul['total'] ;
            arrayCalcul['num2'] = '' ;
          }
          // Multiplication
          else if(arrayCalcul['ope'] == '*') {
            arrayCalcul['total'] = Number(arrayCalcul['num1']) * Number(arrayCalcul['num2']) ;
            historique.innerHTML += `<p>${arrayCalcul['num1']} * ${arrayCalcul['num2']} = ${arrayCalcul['total']}</p>` ;
            if(arrayCalcul['egal'] !== true) arrayCalcul['ope'] = this.value;
            arrayCalcul['num1'] = arrayCalcul['total'] ;
            arrayCalcul['num2'] = '' ;
          }
          // Division
          else if(arrayCalcul['ope'] == '/') {
            arrayCalcul['total'] = Number(arrayCalcul['num1']) / Number(arrayCalcul['num2']) ;
            historique.innerHTML += `<p>${arrayCalcul['num1']} / ${arrayCalcul['num2']} = ${arrayCalcul['total']}</p>` ;
            if(arrayCalcul['egal'] !== true) arrayCalcul['ope'] = this.value;
            arrayCalcul['num1'] = arrayCalcul['total'] ;
            arrayCalcul['num2'] = '' ;
          }
        }
        // réinitialisation du nombre courant
        currentNumber = '' ;
      }
      else historique.textContent = 'Arrête de jouer avec la console !'
    }
    else historique.textContent = 'Arrête de jouer avec la console'
  })
}

// fonction pour que la derniere valeur soit toujours visible dans l'historique
function updateScroll(){
  historique.scrollTop = historique.scrollHeight;
}
setInterval(updateScroll,500);


