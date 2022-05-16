function cargaPerfil() {
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
                let resultados = '';
                resultados += '<form action="https://192.168.56.102/modificarDatos.php" method="post">';
                resultados += '<label>DNI</label>';
                resultados += `<input type=text name=dni id=dni value=${respuesta.DNI} pattern="[0-9]{8}[A-Za-z]{1}" title="DNI válido - 8 dígitos enteros + 1 letra" disabled><br/>`;
                resultados += '<label>Nombre</label>';
                resultados += `<input type=text name=nombre id=nombre value=${JSON.stringify(respuesta.nombre)} maxlength="100"><br/>`;
                resultados += '<label>Apellidos</label>';
                resultados += `<input type=text name=apellidos id=apellidos value=${JSON.stringify(respuesta.apellidos)} maxlength="100"><br/>`;
                resultados += '<label>Direccion</label>';
                resultados += `<input type=text name=direccion id=direccion value=${JSON.stringify(respuesta.direccion)} maxlength="100"><br/>`;
                resultados += '<label>Telefono</label>';
                resultados += `<input type=text name=telefono id=telefono value=${respuesta.telefono} pattern="[0-9]{9}" title="Número de teléfono - 9 dígitos enteros"><br/>`;
                resultados += '<label>Genero</label>';
                resultados += `<select name=genero id=genero>`;
                resultados += `<option value=Hombre>Hombre</option>`;
                resultados += `<option value=Mujer>Mujer</option>`;
                resultados += `</select><br/>`;
                resultados += '<label>Fecha de nacimiento</label>';
                resultados += `<input type=text name=fecha id=fecha value=${respuesta.fecha_nacimiento} title="Fecha de nacimiento - aaaa-mm-dd"><br/>`;
                resultados += '<label>Correo electrónico</label>';
                resultados += `<input type=text name=correo id=correo value=${respuesta.correo} title="Correo electrónico - xxxx@xxx.xx[x]" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"><br/>`;
                resultados += '<label>Nivel</label>';
                resultados += `<select name=nivel id=nivel>`;
                resultados += `<option value=Iniciacion>Iniciacion</option>`;
                resultados += `<option value=Intermedio>Intermedio</option>`;
                resultados += `<option value=Avanzado>Avanzado</option>`;
                resultados += `<option value=Competicion>Competicion</option>`;
                resultados += `<option value=Profesional>Profesional</option>`;
                resultados += `</select><br/>`;
                resultados += '<label>Preferencia</label>';
                resultados += `<select name=preferencia id=preferencia>`;
                resultados += `<option value=Mismo genero>Mismo genero</option>`;
                resultados += `<option value=Mixto>Mixto</option>`;
                resultados += `<option value=Indiferente>Indiferente</option>`;
                resultados += `</select><br/>`;
                resultados += '<label>Descripcion</label>';
                resultados += `<input type=text name=descripcion id=descripcion value=${JSON.stringify(respuesta.descripcion)} maxlength="255"><br/>`;
                resultados += '<label>Contraseña</label>';
                resultados += `<input type=password name=pass1 id=pass1 value=${respuesta.contraseña} maxlength="255"><br/>`;
                resultados += '<label>Confirmar contraseña</label>';
                resultados += `<input type=password name=pass2 id=pass2 value=${respuesta.contraseña} maxlength="255"><br/>`;
                resultados += `<button type=submit name=registrar id=registrar onclick=send()>`;
                resultados += `<p>Cambiar datos</p>`;
                resultados += `</button>`;
                resultados += '</form>';
                document.getElementById("resultados").innerHTML = resultados;
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

function send() {
    let id = sessionStorage.getItem('id');
    let dni = document.getElementById('dni').value;
    let nombre = document.getElementById('nombre').value;
    let apellidos = document.getElementById('apellidos').value;
    let direccion = document.getElementById('direccion').value;
    let telefono = document.getElementById('telefono').value;
    let genero = document.getElementById('genero').value;
    let fecha = document.getElementById('fecha').value;
    let correo = document.getElementById('correo').value;
    let nivel = document.getElementById('nivel').value;
    let preferencia = document.getElementById('preferencia').value;
    let descripcion = document.getElementById('descripcion').value;
    let pass1 = document.getElementById('pass1').value;
    let datos =  'session_id=' +id+ '&dni=' +dni+ '&nombre=' +nombre+ '&apellidos=' + apellidos+'&direccion=' 
    +direccion+ '&telefono=' +telefono+ '&genero=' +genero+ '&fecha=' +fecha+ '&correo='
    +correo+ '&nivel=' +nivel+ '&preferencia=' +preferencia+ '&descripcion=' +descripcion+
    '&pass1=' +pass1;
     peticion = new XMLHttpRequest();
     peticion.open('POST', 'http://192.168.56.102/modificarDatos.php');
     peticion.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
     peticion.send(datos);
     this.event.preventDefault();
}

function cerrar() {
    sessionStorage.removeItem('dni');
    sessionStorage.removeItem('id');
}