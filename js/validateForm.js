import { alerts } from "./alerts.js";

export function validateForm() {
  // Object for save the values to inputs
  const formInformation = {
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  };

  // variables
  const name = document.querySelector("#name");
  const email = document.querySelector("#email");
  const phone = document.querySelector("#phone");
  const subjectname = document.querySelector("#subject");
  const message = document.querySelector("#message");
  const buttonSend = document.querySelector(".button__send");
  const spinner = document.querySelector(".spinner");
  const iconCorrect = document.querySelectorAll(".icon-correct");
  const buttonReset = document.querySelector(".button__reset");
  const form = document.querySelector("#form");

  // Eventos
  name.addEventListener("input", validateinput);
  email.addEventListener("input", validateinput);
  phone.addEventListener("input", validateinput);
  subjectname.addEventListener("input", validateinput);
  message.addEventListener("input", validateinput);

  // Evento Button Reset
  buttonReset.addEventListener("click", (e) => {
    e.preventDefault();
    // Eliminar icono correcto
    iconCorrect.forEach((icon) => icon.classList.remove("view-icon"));
    // LLama a la función para eliminar el contenido de los campos
    emptyInputs();
  });

  // Evento Button Send
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    spinner.classList.remove("hidden");

    // simulando envio
    setTimeout(() => {
      // Eliminar Iconos Correcto
      iconCorrect.forEach((icon) => icon.classList.remove("view-icon"));
      spinner.classList.add("hidden");
      // Llama a la función para eliminar el contenido de los campos
      emptyInputs();
      alerts("Form submitted successfully :)", "success");
    }, 3000);
  });

  // Función para validar el contenido de los input
  function validateinput(e) {
    /* Comprueba si la entrada está vacía. Si está vacía, mostrará una alerta. */
    if (!e.target.value.trim()) {
      // Campo no obligatorio no hay que mostrar ninguna alerta
      if (e.target.id === "phone") {
        /* Eliminación de la clase view-icon del elemento con la clase icon-correct. */
        e.target.parentElement.children[1].classList.remove("view-icon");
        return;
      }

      /*Mostrar alerta*/
      ShowAlert(`The field  ${e.target.id} is empty`, e.target.parentElement);
      /* Establecer el valor de la propiedad del objeto formInformation a una cadena vacía. */
      formInformation[e.target.name] = "";
      // llama a la función para verificar que todos los inputs obligatorios tengan información
      checkInputsRequired();
      /* Eliminación de la clase view-icon del elemento con la clase icon-correct. */
      // eliminar icono "correcto"
      e.target.parentElement.children[1].classList.remove("view-icon");
      return;
    }

    /* Comprueba si la entrada es un nombre y si no es válido, muestra una alerta y devuelve*/
    if (e.target.id === "name" && !validateName(e.target.value)) {
      ShowAlert("The name is invalid", e.target.parentElement);
      formInformation[e.target.name] = "";
      checkInputsRequired();
      // eliminar icono "correcto"
      e.target.parentElement.children[1].classList.remove("view-icon");
      return;
    }

    /* Comprueba si la entrada es un correo electrónico si no es válido, muestra una alerta y devuelve*/
    if (e.target.id === "email" && !validateEmail(e.target.value)) {
      ShowAlert("The email is invalid", e.target.parentElement);
      formInformation[e.target.name] = "";
      checkInputsRequired();
      // eliminar icono "correcto"
      e.target.parentElement.children[1].classList.remove("view-icon");
      return;
    }

    /* Comprueba si la entrada es un telefono y si no es válido, muestra una alerta y devuelve*/
    if (e.target.id === "phone" && !validatePhone(e.target.value)) {
      ShowAlert("The Phone is invalid", e.target.parentElement);
      formInformation[e.target.name] = "";
      checkInputsRequired();
      // eliminar icono "correcto"
      e.target.parentElement.children[1].classList.remove("view-icon");
      return;
    }

    /* Guardar el valor de la entrada en el objeto formInformation. */
    formInformation[e.target.id] = e.target.value.trim();

    /* Añadir la clase view-icon al segundo hijo del elemento padre del objetivo. */
    e.target.parentElement.children[1].classList.add("view-icon");

    // Evita tener multiples alertas
    cleanAlert(e.target.parentElement);

    // Verificar que los inputs obligatorios estén llenos
    checkInputsRequired();
  }

  // crear alertas
  function ShowAlert(text, input) {
    // Evita tener múltiples alertas
    cleanAlert(input);

    // Crear HTML
    const alert = document.createElement("p");
    alert.textContent = text;
    alert.classList.add("alert");

    // Agregando la alerta al input correspondiente
    input.appendChild(alert);
  }

  // Evita generar más de una alerta por campo
  function cleanAlert(input) {
    const classAlert = input.querySelector(".alert");

    // Si ya existe la clase .alert en el elemento
    if (classAlert) {
      // eliminamos la alerta
      classAlert.remove();
    }
  }

  //Validar name con expresión regular
  function validateName(name) {
    const regex = /^([a-zA-Z]){4,256}$/;

    // true si cumple la expresion regular
    const result = regex.test(name);

    return result;
  }

  //Validar email con expresión regular
  function validateEmail(email) {
    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

    // true si cumple la expresion regular
    const result = regex.test(email);

    return result;
  }

  // Validar phone con expresión regular
  function validatePhone(phone) {
    const regex =
      /^(\+?(|-|\.)?\d{1,2}(|-|\.)?)?(\(?\d{3}\)?|\d{3})(|-|\.)?(\d{3}(|-|\.)?\d{4})$/;

    // true si cumple la expresion regular
    const result = regex.test(phone);

    return result;
  }

  // Revisar si todos los inputs obligatorios tiene información para habilitar el botón enviar
  function checkInputsRequired() {
    // Destructurig the object formInformation
    const { name, email, subject, message } = formInformation;

    // Creando un nuevo objeto con los campos que son obligatorios
    const formInformationRequerided = { name, email, subject, message };

    // Devuelve true si un campo está vacio
    if (Object.values(formInformationRequerided).includes("")) {
      // Si los campos están vacíos, agregamos la clase "opacity" y deshabilitamos el botón send
      buttonSend.classList.add("opacity");
      buttonSend.disabled = true;
      return;
    }

    // Si los campos estan llenos quitamos la clase "opacity" y habilitamos el botón send
    buttonSend.classList.remove("opacity");
    buttonSend.disabled = false;
  }

  // Borrar el contenido de los inputs almacenadas en el objeto
  function emptyInputs() {
    // vaciar objeto
    formInformation.name = "";
    formInformation.email = "";
    formInformation.phone = "";
    formInformation.subject = "";
    formInformation.message = "";

    // volver a agregar la propiedad reset
    form.reset();

    // Comprobar si los input no están vacíos
    checkInputsRequired();
  }
}
