function editNav() {
  const myTopNav = document.getElementById("myTopnav");
  if (myTopNav.className === "topnav") {
    myTopNav.className += " responsive";
  } else {
    myTopNav.className = "topnav";
  }
}

const modalBackground = document.querySelector(".bground");
const modalButton = document.querySelectorAll(".modal-btn");
const modalBody = document.querySelector(".modal-body");
const form = document.querySelector("form");
const formData = document.querySelectorAll(".formData");

// Affichage de la "modal form"
modalButton.forEach((button) =>
  button.addEventListener("click", () => {
    modalBackground.style.display = "block";
  })
);

// Fermeture de la "modal form" en cliquant sur le bouton "close"
const closeModal = document.querySelector(".close");
closeModal.addEventListener("click", () => {
  modalBackground.style.display = "none";
});

// Fermeture de la "modal form" en cliquant en dehors d'elle
modalBackground.addEventListener("click", (e) => {
  if (e.target === modalBackground) {
    modalBackground.style.display = "none";
  }
});

// Fonction d'affichage des erreurs
function errorDisplay(id, message, valid) {
  const input = document.getElementById(id);
  const parentInput = input.parentNode;
  parentInput.setAttribute("data-error", message);
  parentInput.setAttribute("data-error-visible", valid);
}

let firstNameOutput,
  lastNameOutput,
  emailOutput,
  birthdateOutput,
  quantityOutput;

// Fonction verifiant si le prénom est valide
function firstNameChecker(value) {
  if (value == "" || value.length < 2) {
    errorDisplay("first", "Le prénom doit avoir minimum 2 caractères!", true);
    firstNameOutput = null;
  } else if (!/^[A-Z a-z]{2,100}$/.test(value)) {
    errorDisplay(
      "first",
      "Le prénom ne doit pas contenir de caractères spéciaux!",
      true
    );
    firstNameOutput = null;
  } else {
    errorDisplay("first", "", false);
    firstNameOutput = value;
  }
}
const inputFirst = document.getElementById("first");
inputFirst.addEventListener("input", (e) => {
  firstNameChecker(e.target.value);
});

// Fonction verifiant si le nom est valide
function lastNameChecker(value) {
  if (value == "" || value.length < 2) {
    errorDisplay("last", "Le nom doit avoir minimum 2 caractères!", true);
    lastNameOutput = null;
  } else if (!/^[A-Z a-z]{2,100}$/.test(value)) {
    errorDisplay(
      "last",
      "Le nom ne doit pas contenir de caractères spéciaux!",
      true
    );
    lastNameOutput = null;
  } else {
    errorDisplay("last", "", false);
    lastNameOutput = value;
  }
}
const inputLast = document.getElementById("last");
inputLast.addEventListener("input", (e) => {
  lastNameChecker(e.target.value);
});

// Fonction verifiant si l'email est valide
function emailChecker(value) {
  if (value == "" || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
    errorDisplay("email", "E-mail non valide!", true);
    emailOutput = null;
  } else {
    errorDisplay("email", "", false);
    emailOutput = value;
  }
}
const inputEmail = document.getElementById("email");
inputEmail.addEventListener("input", (e) => {
  emailChecker(e.target.value);
});

// Fonction verifiant si la date renseignée est vraiment une date valide
function dateIsValid(value) {
  const date = new Date(value);
  if (
    date.getTime() &&
    /^(19|20)?\d{2}[-](0?[1-9]|1[0-2])[-](0?[1-9]|[1-2][0-9]|3[0-1])$/.test(
      value
    )
  ) {
    return true;
  } else {
    return false;
  }
}
// Convertir des années en milliseconde
function yearConverterToMilliSecond(value) {
  let result = value * 365.25 * 24 * 60 * 60 * 1000;
  return result;
}
// On ajoute à l'input (birthdate) l'attibut "max" pour bloquer les dates superieurs à la date actuelle sur le calendrier
const inputBirthdate = document.getElementById("birthdate");
inputBirthdate.setAttribute("max", new Date().toISOString().slice(0, 10));

// Fonction verifiant si la personne à +18ans
function birthdateIsValid(value) {
  let dateNow = new Date().getTime();
  let dateLimit = new Date(value).getTime() + yearConverterToMilliSecond(18);
  if (dateLimit > dateNow) {
    return false;
  } else {
    return true;
  }
}

// Fonction verifiant si la date de naissance est valide
function birthdateChecker(value) {
  if (birthdateIsValid(value) && dateIsValid(value)) {
    errorDisplay("birthdate", "", false);
    birthdateOutput = value;
  } else {
    errorDisplay("birthdate", "Date de naissance non valide!", true);
    birthdateOutput = null;
  }
}
inputBirthdate.addEventListener("input", (e) => {
  birthdateChecker(e.target.value);
});

// Fonction verifiant si le nombre de tournoi renseigné est un nombre à deux chiffres
function quantityChecker(value) {
  if (value == "" || !/^([0-9]|[0-9]){1,2}$/.test(value)) {
    errorDisplay("quantity", "Entrer un nombre compris entre 0 et 99", true);
    quantityOutput = null;
  } else {
    errorDisplay("quantity", "", false);
    quantityOutput = value;
  }
}
const inputQuantity = document.getElementById("quantity");
inputQuantity.addEventListener("input", (e) => {
  quantityChecker(e.target.value);
});

// Fonction verifiant si au moins un lieu a été séléctionné via les "inputs de type Radio"
function locationChecker() {
  const radioButtons = document.querySelectorAll("input[type=radio]");
  let isValid = false;
  for (const radioButton of radioButtons) {
    if (radioButton.checked) {
      errorDisplay(radioButton.id, "", false);
      isValid = true;
      break;
    } else {
      errorDisplay(radioButton.id, "Veillez choisir un tournoi !", true);
      isValid = false;
    }
  }
  return isValid;
}

// Fonction verifiant si l'input de type "checkbox1" a bien été séléctionné
function checkboxChecker() {
  const checkbox1 = document.getElementById("checkbox1");
  if (!checkbox1.checked) {
    errorDisplay(
      "checkbox1",
      "Veuillez accepter les conditions d'utilisation!",
      true
    );
    return false;
  } else {
    errorDisplay("checkbox1", "", false);
    return true;
  }
}

// Validation du formulaire
form.addEventListener("submit", validate);

function validate(e) {
  e.preventDefault();
  if (
    firstNameOutput &&
    lastNameOutput &&
    emailOutput &&
    birthdateOutput &&
    quantityOutput &&
    locationChecker() &&
    checkboxChecker()
  ) {
    const object = {
      firstNameOutput,
      lastNameOutput,
      emailOutput,
      birthdateOutput,
      quantityOutput,
      locationFunction: function () {
        return locationChecker() === true;
      },
      checkboxFunction: function () {
        return checkboxChecker() === true;
      },
    };
    console.log(object);
    const inputs = Array.from(document.querySelectorAll("input"));
    const inputsNotTheLast = inputs.slice(0, -1);

    inputsNotTheLast.forEach((input) => {
      input.value = "";
    });
    firstNameOutput = null;
    lastNameOutput = null;
    emailOutput = null;
    birthdateOutput = null;
    quantityOutput = null;

    form.style.opacity = 0;
    modalBody.textContent = "Inscription valider";
    modalBody.style.textAlign = "center";
  } else {
    const textFormInvalid = document.querySelector(".text-form-invalid");
    textFormInvalid.textContent = "Veuillez bien remplir le formulaire";
  }
}
