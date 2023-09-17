$(document).ready(function () {
    // Seleccionamos el formulario y el input
let formulario = document.getElementById("formInicioSesion");
let emailInput = document.getElementById("email");
let pwdInput = document.getElementById("password");

formulario.addEventListener("submit", function (event) { // Evitamos que se envíe el formulario por defecto
    
        event.preventDefault();
        fetch("/datos/usuarios.json")
          .then(response => response.json()) 
          .then(data => { 
            let usuarioEncontrado = data.find(usuario => usuario.correo == emailInput.value && usuario.contrasenya == pwdInput.value);
            
            if (usuarioEncontrado) {
              window.location.href = "/pages/perfilUsuario.html";
            }
            else {
              alert("Usuario o contraseña incorrectos");
            }
          })
          .catch(error => console.error(error));
  });
  
  });