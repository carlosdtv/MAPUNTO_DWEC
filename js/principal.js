function cerrar() {
    sessionStorage.removeItem('dni');
    sessionStorage.removeItem('id');
}

function cargaUsuario() {
    let dni = "dni="+sessionStorage.getItem('dni');
    let id = "&session_id="+sessionStorage.getItem('id');
    let datos = dni + id;
    $( () => {
        $.ajax({
            url: 'http://192.168.56.102/usuario.php',
            type: 'POST',
            data: datos,
            dataType: 'json',
            async: true,
            success: (respuesta) => {
                let username = respuesta.correo;
                document.getElementById("userclose").innerHTML = username;
            },
            error: function( jqXHR, textStatus, errorThrown ) {
                if (jqXHR.status === 0) {
                    alert('No hay conexión: verifica la red o la conexión al servidor.');
                } else if (jqXHR.status == 404) {
                    alert('No se encuentra la página solicitada. Error 404');
                } else if (jqXHR.status == 500) {
                    alert('Error interno del servidor. Error 500.');
                } else if (textStatus === 'parsererror') { 
                    alert('Error al tratar los datos JSON');
                } else if (textStatus === 'timeout') {
                    alert('Time out error.');
                } else if (textStatus === 'abort') {
                    alert('Abortada la petición Ajax');
                } else {
                    alert('Error: ' + jqXHR.responseText);
                }
            } 
        });
    });
}