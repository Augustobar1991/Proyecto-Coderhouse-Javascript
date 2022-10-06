const array = [];
class User{
constructor(mail, password){
    this.mail = mail;
    this.password = password;
    }
}
function modalRegisterForm() {
  hideModal('#modalLoginForm');
  $('#registrarModal').modal('show');
  let botonclose = document.getElementById("botoncloseReg");
  botonclose.addEventListener("click", function(){hideModal('#registrarModal')});
  let botonSubmit = document.getElementById("bottonSubmit");
  botonSubmit.addEventListener("click", modalRegisterSesion); 
}
function modalRegisterSesion() {
  let emailReg=document.getElementById("formMail").value;
  let passwordReg1=document.getElementById("formPass1").value;
  let passwordReg2=document.getElementById("formPass2").value;
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(emailReg)) {
      Swal.fire({icon: 'warning', title: 'Ingrese un Email valido'})
      return false;
    }
    else{
      if (passwordReg1 ==="" || passwordReg1 === null){
        Swal.fire({icon: 'warning', title: 'Ingrese una Contraseña'});
        return false;
      }
      else if(passwordReg1 !== passwordReg2){
        Swal.fire({icon: 'warning', title: 'Contraseña distinta'});
        return false;
      }
      else {
        let obj = new User(emailReg, passwordReg1);
        array.push(obj);
        Swal.fire({
          position: 'center',
          icon: 'success',
          titleText: 'Bienvenido',
          text: 'Usuario agregado',
          timer: 3000});
        hideModal('#registrarModal');
        $('#modalLoginForm').modal('show');
        Check();
    }
  }
  console.log(array);
}

let cont=0;
function Login(){ 
    let mensaje = [];
    let email=document.getElementById("email").value;
    let password=document.getElementById("pass").value;
    try {
    let nom = array.find(mail => mail.mail);

      if(cont<3){
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!re.test(email)){
            mensaje.push(`Formato de Email invalido`);
        }
        else if (nom.mail===email){
            if(nom.password===password && password!=''){ 
              cont = 0;
              hideModal('#modalLoginForm');
              Swal.fire({
                position: 'center',
                icon: 'success',
                titleText: 'Gracias por su compra',
                text: 'Pronto recibirá su pedido',
                timer: 3000});
              comprarButtonClicked();
            }
            else{
              mensaje.push(`Contraseña incorrecta`);
              mensaje.push(`le quedan ${2-cont} intentos mas`);
              cont++;
            }
        } 
        else{
          mensaje.push(`Email incorrecto`);
          mensaje.push(`le quedan ${2-cont} intentos mas`);
          cont++;
        }
      }
      else{
        mensaje.push(`Usuario bloqueado`);
      }    
      input.value <= 0 ? (input.value = 1) : null;
      mensaje.length > 0 ? Swal.fire({icon: 'warning', title: mensaje.join("\n")}) : null;
    } 
    catch(err) {
        if (email === "" || email === null) 
            {mensaje.push("El campo Email no puede estar vacio");}
        if (password === "" || password === null) 
            {mensaje.push("El campo Clave no puede estar vacio");}
        mensaje.length > 0 ? Swal.fire({icon: 'warning', title: mensaje.join("\n")}) : null;
    }
}

function hideModal(modal) {
  $(modal).modal('hide');
}

function modalRegister() {
  try {(document.querySelector('.shoppingCartItemQuantity').value > 0) 
    $('#modalLoginForm').modal('show');
    let botonclose = document.getElementById("botonclose");
    botonclose.addEventListener("click", function(){hideModal('#modalLoginForm')});
  }
  catch{Swal.fire({icon: 'warning', title: 'Elija un item a comprar'})}
}

let botonEnter = document.getElementById("Entrar");
botonEnter.addEventListener("click",Login);
let botonRegistrarte = document.getElementById("Registrarte");
botonRegistrarte.addEventListener("click",modalRegisterForm);
const comprarButton = document.getElementById('comprarButton');
comprarButton.addEventListener('click', modalRegister);
