
function guardarDatos() {
  localStorage.nombre = document.getElementById("nombre").value;
  localStorage.apellido = document.getElementById("apellido").value;
  localStorage.email = document.getElementById("email").value;
  localStorage.password = document.getElementById("password").value;
  localStorage.passconfirm = document.getElementById("confirm-password").value;
  
}

function recuperarDatos() {
  if ((localStorage.email != undefined) && (localStorage.password != undefined)) {
      document.getElementById("datos").innerHTML = "Nombre: " + localStorage.nombre + " Password: " + localStorage.password;
  } else {
      document.getElementById("datos").innerHTML = "No has introducido tu nombre y tu password";
  }
}