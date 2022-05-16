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
                comprobarPartidos();
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

function comprobarPartidos() {
   let id = "&session_id="+sessionStorage.getItem('id');
   $( () => {
       $.ajax({
           url: 'http://192.168.56.102/agenda.php',
           type: 'POST',
           data: id,
           dataType: 'json',
           async: true,
           success: (respuesta) => {
               for (let i = 0; i < respuesta.length; i++) {
                   compruebaLleno(respuesta[i].id_partido);
               }
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

function compruebaLleno(id_partido) {
    let id = "&session_id="+sessionStorage.getItem('id');
    let cont = 0;
    $( () => {
        $.ajax({
            url: 'http://192.168.56.102/participa.php',
            type: 'POST',
            data: id,
            dataType: 'json',
            async: true,
            success: (respuesta) => {
                for (let i = 0; i < respuesta.length; i++) {
                    if (respuesta[i].id_partido == id_partido && cont < 4) {
                        cont++;
                    }
                }
                if (cont == 4) {
                    return;
                }
                else {
                    cargaSelect(id_partido, cont);
                }
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

function cargaSelect(id_partido, cont) {
    let dni = "dni="+sessionStorage.getItem('dni');
    let id = "&session_id="+sessionStorage.getItem('id');
    let timeSlot;
    let pista;
    $( () => {
        $.ajax({
            url: 'http://192.168.56.102/agenda.php',
            type: 'POST',
            data: id,
            dataType: 'json',
            async: true,
            success: (respuesta) => {
                for (let i = 0; i < respuesta.length; i++) {
                    if (respuesta[i].id_partido == id_partido) {
                        let sel = document.getElementById("miSelect");
                        let option = document.createElement("option");
                        option.value = respuesta[i].id_partido;
                        option.text = respuesta[i].dia;
                        timeSlot = respuesta[i].timeSlot;
                        $.ajax({
                            url: 'http://192.168.56.102/timeSlot.php',
                            type: 'POST',
                            data: id,
                            dataType: 'json',
                            async: true,
                            success: (respuestabis) => {
                                for (let i = 0; i < respuestabis.length; i++) {
                                    if (respuestabis[i].id == timeSlot) {
                                        option.text +=  respuestabis[i].description;
                                    }
                                }
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
                        pista = respuesta[i].id_pista;
                        $.ajax({
                            url: 'http://192.168.56.102/pista.php',
                            type: 'POST',
                            data: id,
                            dataType: 'json',
                            async: true,
                            success: (respuestatres) => {
                                for (let i = 0; i < respuestatres.length; i++) {
                                    if (respuestatres[i].id == pista) {
                                        option.text +=  ' - ' + respuestatres[i].nombre;
                                    }
                                }
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
                        option.text += ' - ';
                        option.text += ' ' + (4-cont) + ' plaza/s disponible/s';
                        option.text += ' - ';
                        sel.add(option);
                    }
                }
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

function reserva() {
    let select = document.getElementById('miSelect').value;
    let id = "session_id="+sessionStorage.getItem('id');
    let id_partido = "&id_partido=" +select;
    let dni = "&id_usuario="+sessionStorage.getItem('dni');
    let datos = id + id_partido + dni;
    $( () => {
        $.ajax({
            url: 'http://192.168.56.102/realizarReserva.php',
            type: 'POST',
            data: datos,
            dataType: 'json',
            async: true,
            success: () => {
                alert("¡Reserva realizada correctamente!");
                //location.href="principal.html";
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
    this.event.preventDefault();
}