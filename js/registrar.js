let peticion;

function send() {
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
    let datos = 'dni=' +dni+ '&nombre=' +nombre+ '&apellidos=' + apellidos+'&direccion=' 
    +direccion+ '&telefono=' +telefono+ '&genero=' +genero+ '&fecha=' +fecha+ '&correo='
    +correo+ '&nivel=' +nivel+ '&preferencia=' +preferencia+ '&descripcion=' +descripcion+
    '&pass1=' +pass1;
     peticion = new XMLHttpRequest();
     peticion.open('POST', 'http://192.168.56.102/registrar.php');
     peticion.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
     peticion.send(datos);
     this.event.preventDefault();
}