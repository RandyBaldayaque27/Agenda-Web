const form = document.getElementById("contact-form");
const nameInput = document.getElementById("name-input");
const lastnameInput = document.getElementById("lastname-input");
const phoneInput = document.getElementById("phone-input");
const contactList = document.getElementById("contact-list").getElementsByTagName("tbody")[0];

// Función para mostrar la lista de contactos existentes
function showContacts() {
  fetch("http://www.raydelto.org/agenda.php")
    .then(response => response.json())
    .then(data => {
      for (let i = 0; i < data.length; i++) {
        const contact = data[i];
        const row = contactList.insertRow();
        row.insertCell(0).innerText = contact.nombre;
        row.insertCell(1).innerText = contact.apellido;
        row.insertCell(2).innerText = contact.telefono;
      }
    });
}

// Función para agregar un nuevo contacto
function addContact(event) {
  event.preventDefault();
  const data = {
    nombre: nameInput.value,
    apellido: lastnameInput.value,
    telefono: phoneInput.value
  };

  fetch("http://www.raydelto.org/agenda.php", {
    method: "POST",
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data => {
      // Una vez agregado, se muestra el nuevo contacto en la lista
      
      const row = contactList.insertRow();
      row.insertCell(0).innerText = data.nombre;
      row.insertCell(1).innerText = data.apellido;
      row.insertCell(2).innerText = data.telefono;

      // Se borran los valores de los inputs
      nameInput.value = "";
      lastnameInput.value = "";
      phoneInput.value = "";
    });
}

// Al cargar la página, se muestra la lista de contactos existentes
showContacts();

// Agrega el evento submit al formulario para agregar nuevos contactos
form.addEventListener("submit", addContact);



