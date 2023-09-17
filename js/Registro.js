$(document).ready(function () {
    var regiones = [];
    $.getJSON('/datos/regiones.json', function (datos) {
        regiones = datos;
        datos.forEach(elemento => {
            $("#region").append(`<option>${elemento.nombre}</option>`);
        });
    });
    $("#region").on("change", function (e) {
        $('#comuna').find('option').remove().end();
        var region = $(this).children("option:selected").val();
        if (region !== "") {
            regiones.forEach(elemento => {
                if (elemento.nombre == region) {
                    $("#comuna").append("<option></option>");
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
                required: "Es requerido aceptar términos y condiciones"
            }
        }
    });
    $.validator.addMethod("pwcheck",
        function (value, element) {
            return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/.test(value);
        });

    $.validator.addMethod("validacionRUT",
        function (value, element) {
            return /^\d{7,8}-[k|K|\d]{1}$/.test(value);
        });

});