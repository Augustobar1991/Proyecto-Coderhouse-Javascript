let enviar = document.getElementById('enviar');
enviar.addEventListener('click', validateForm);

function validateForm() {
    let name =  document.getElementById('name').value;
    if (name == "") {
        Swal.fire({
            position: 'center',
            icon: 'error',
            titleText: 'El campo nombre no puede estar vacio!',
            timer: 3000});
        return false;
    }
    let email =  document.getElementById('email').value;
    if (email == "") {
        Swal.fire({
            position: 'center',
            icon: 'error',
            titleText: 'El campo email no puede estar vacio!',
            timer: 3000});
        return false;
    } else {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!re.test(email)){
            Swal.fire({
                position: 'center',
                icon: 'error',
                titleText: 'Formato de Email invalido!',
                timer: 3000});
            return false;
        }
    }
    let phone =  document.getElementById('phone').value;
    if (phone == "") {
        Swal.fire({
            position: 'center',
            icon: 'error',
            titleText: 'El campo telefono no puede estar vacio!',
            timer: 3000});
        return false;
    }
    let message =  document.getElementById('message').value;
    if (message == "") {
        Swal.fire({
            position: 'center',
            icon: 'error',
            titleText: 'El campo mensaje no puede estar vacio!',
            timer: 3000});
        return false;
    }
    else{
      Swal.fire({
        position: 'center',
        icon: 'success',
        titleText: 'Enviando...',
        timer: 3000});
        sendMail();
    }
  }
  
function sendMail() {
    let name =  document.getElementById('name').value;
    let email =  document.getElementById('email').value;
    let phone =  document.getElementById('phone').value;
    let message =  document.getElementById('message').value;

    Email.send({
      Host: "smtp.gmail.com",
      Username: name,
      To: 'mail@mail.com',
      From: email,
      Phone: phone,
      Body: message,
    })
}
