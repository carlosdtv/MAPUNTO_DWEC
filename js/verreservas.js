function cerrar() {
    sessionStorage.removeItem('dni');
    sessionStorage.removeItem('id');
}

function cargaReservas() {
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
            }
        });
    });
    id = "session_id="+sessionStorage.getItem('id');
    let dni2 = sessionStorage.getItem('dni');
    $( () => {
        $.ajax({
            url: 'http://192.168.56.102/participa.php',
            type: 'POST',
            data: id,
            dataType: 'json',
            async: true,
            success: (respuesta) => {
                for (let i = 0; i < respuesta.length; i++) {
                    if (respuesta[i].idUsuario == dni2)
                        codigoHorario(respuesta[i].id_partido);
                }
            }
        });
    });
}

function codigoHorario(idPartido) {
    let id = "session_id="+sessionStorage.getItem('id');
    $( () => {
        $.ajax({
            url: 'http://192.168.56.102/agenda.php',
            type: 'POST',
            data: id,
            dataType: 'json',
            async: true,
            success: (respuesta) => {
                for (let i = 0; i < respuesta.length; i++) {
                    if (respuesta[i].id_partido == idPartido)
                        timeSlot(respuesta[i].timeSlot, respuesta[i].id_partido);
                }
            }
        });
    });
}

function timeSlot(timeSlot, idPartido) {
    let id = "session_id=" +sessionStorage.getItem('id');
    let hora;
    $( () => {
        $.ajax({
            url: 'http://192.168.56.102/timeSlot.php',
            type: 'POST',
            data: id,
            dataType: 'json',
            async: true,
            success: (respuesta) => {
                for (let i = 0; i < respuesta.length; i++) {
                    if (respuesta[i].id == timeSlot)
                    {
                        hora = respuesta[i].description;
                        descubrirPista(idPartido, hora);
                    }
                }
            }
        });
    });
}

function descubrirPista(idPartido, hora) {
    let id = "session_id="+sessionStorage.getItem('id');
    $( () => {
        $.ajax({
            url: 'http://192.168.56.102/agenda.php',
            type: 'POST',
            data: id,
            dataType: 'json',
            async: true,
            success: (respuesta) => {
                for (let i = 0; i < respuesta.length; i++) {
                    if (respuesta[i].id_partido == idPartido)
                    {
                        pista(respuesta[i].id_pista, idPartido, hora);
                    }
                }
            }
        });
    });
}

function pista(idPista, idPartido, hora) {
    let id = "session_id=" +sessionStorage.getItem('id');
    let pista;
    $( () => {
        $.ajax({
            url: 'http://192.168.56.102/pista.php',
            type: 'POST',
            data: id,
            dataType: 'json',
            async: true,
            success: (respuesta) => {
                for (let i = 0; i < respuesta.length; i++) {
                    if (respuesta[i].id == idPista) {
                        pista = respuesta[i].nombre;
                    }
                }
                muestraReservas(idPartido, hora, pista)
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

function muestraReservas(idPartido, hora, pista) {
    let id = "session_id="+sessionStorage.getItem('id');
    let resultado = '';
    resultado += '<div>';
    resultado += '<table class="tablaReservas">';
    resultado += '<tr>';
    resultado += '<th>Fecha</th>';
    resultado += '<th>Hora</th>';
    resultado += '<th>Pista</th>';
    resultado += '</tr>';
    $( () => {
        $.ajax({
            url: 'http://192.168.56.102/agenda.php',
            type: 'POST',
            data: id,
            dataType: 'json',
            async: true,
            success: (respuesta) => {
                for (let i = 0; i < respuesta.length; i++) {
                    if (respuesta[i].id_partido == idPartido)
                    {
                        resultado += '<tr>';
                        resultado += `<td>${respuesta[i].dia}</td>`;
                        resultado += `<td>${hora}</td>`;
                        resultado += '<div>';
                        resultado += `<td id="pista">${pista}</td>`;
                        resultado += '</div>';
                        resultado += '</tr>';
                        resultado += '</table>';
                        resultado += '</div>';
                    }
                }
                document.getElementById("resultados").innerHTML += resultado;
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