$(document).ready(function () {
  
  function validaRut(rutCompleto) {
    // Primero verificamos que el formato sea correcto
    if (!/^[0-9]{1,8}[-|‐]{1}[0-9kK]{1}$/.test( rutCompleto ))
      return false;
    // Luego separamos el rut y el dígito verificador
    var tmp = rutCompleto.split('-');
    var digv = tmp[1];
    var rut = tmp[0];
    // Agregamos ceros a la izquierda del rut hasta que tenga 8 dígitos
    while (rut.length < 8) {
      rut = '0' + rut;
    }
    // Convertimos el dígito verificador a mayúscula
    if ( digv == 'K' ) digv = 'k' ;
    // Verificamos que el rut sea mayor a 1 millón
    if (parseInt(rut) <= 1000000) return false;
    // Comparamos el dígito verificador con el resultado de la función dv
    return (dv(rut) == digv );
  }
  
  // Esta es la función que calcula el dígito verificador usando el algoritmo
  function dv(T){
    var M=0,S=1;
    var cuerpo = T.toString().split('').reverse();
    for(var i = 0; i < cuerpo.length; i++)
      S=(S+cuerpo[i]*(9-M++%6))%11;
    return S?S-1:'k';
  }

  $.validator.addMethod("validacionRUT",
    function (value, element) {
      return validaRut(value);
    });

  var regiones = [];
  $.getJSON('/datos/regiones.json', function (datos) {
    regiones = datos;
    $("#region").append('<option value="">Seleccione una región</option>');
    datos.forEach(elemento => {
      $("#region").append(`<option>${elemento.nombre}</option>`);
    });
  });
  $("#region").on("change", function (e) {
    $('#comuna').find('option').remove().end();
    var region = $(this).children("option:selected").val();
    if (region !== "Seleccione una región") {
      regiones.forEach(elemento => {
        if (elemento.nombre == region) {
          $("#comuna").append('<option value="" disabled>Seleccione una comuna</option>');
          elemento.comunas.forEach(comuna => {
            $("#comuna").append(`<option>${comuna}</option>`);
          });
        }
      })
    }
  });
  $(".needs-validation").validate({
    errorClass: "is-invalid",
    validClass: "is-valid",
    rules: {
      email: {
        required: true,
      },
      name: {
        required: true,
      },
      rut: {
        required: true,
        validacionRUT: true,
        maxlength: 10
      },
      region: {
        required: true
      },
      comuna: {
        required: true
      },
      password: {
        required: true,
        pwcheck: true,
        minlength: 8
      },
      repassword: {
        required: true,
        equalTo: password
      },
      tyc: {
        required: true
      }

    },
    messages: {
      email: {
        required: "El correo es requerido",
        email: "El formato no es el correcto"
      },
      name: {
        required: "El nombre del usuario es requerido"
      },
      rut: {
        required: "El rut es requerido",
        validacionRUT: "no tiene el formato de rut (sin puntos y sin espacios)"
      },
      region: {
        required: "La región es requerida"
      },
      comuna: {
        required: "La comuna es requerida"
      },
      password: {
        required: "La contraseña es requerida",
        pwcheck: "La contraseña no tiene un formato válido",
        minlength: "Debe contener 8 caracteres"
      },
      repassword: {
        required: "La confirmación de la contraseña es requerida",
        equalTo: "No son identicas"
      },
      tyc: {
        required: ""
      }
    }
  });

  $.validator.addMethod("pwcheck",
    function (value, element) {
      return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/.test(value);
    });

});