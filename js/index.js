let peticion;

function send() {
    let correo = document.getElementById('correo').value;
    let password = document.getElementById('password').value;
    let datos = 'correo=' +correo+ '&password=' +password;
    peticion = new XMLHttpRequest();
    peticion.open('POST', 'http://192.168.56.102/login.php');
    peticion.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    peticion.send(datos);
    peticion.addEventListener("load", cargada);
}

const cargada = () => {
    let idSession = JSON.parse(peticion.responseText);
    sessionStorage.setItem('dni', idSession[0]);
    sessionStorage.setItem('id', idSession[1]);
    location.href="principal.html";
}