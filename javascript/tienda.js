AOS.init();

const array = [];
class User{
constructor(mail, password){
    this.mail = mail;
    this.password = password;
    }
}
function modalRegisterForm() {
  hideModal();
  $('#registrarModal').modal('show');
  let botonclose = document.getElementById("botoncloseReg");
  botonclose.addEventListener("click", hideModalRegister); 
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
        hideModalRegister();
        $('#modalLoginForm').modal('show');
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
              hideModal();
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

function hideModal() {
  $('#modalLoginForm').modal('hide');
}
function hideModalRegister() {
  $('#registrarModal').modal('hide');
}

function modalRegister() {
  try {(document.querySelector('.shoppingCartItemQuantity').value > 0) 
    $('#modalLoginForm').modal('show');
    let botonclose = document.getElementById("botonclose");
    botonclose.addEventListener("click", hideModal); 
  }
  catch{Swal.fire({icon: 'warning', title: 'Elija un item a comprar'})}
}

let botonEnter = document.getElementById("Entrar");
botonEnter.addEventListener("click",Login);
let botonRegistrarte = document.getElementById("Registrarte");
botonRegistrarte.addEventListener("click",modalRegisterForm);

const comprarButton = document.getElementById('comprarButton');
comprarButton.addEventListener('click', modalRegister);

const addToShoppingCartButtons = document.querySelectorAll('.addToCart');
addToShoppingCartButtons.forEach((addToCartButton) => {
  addToCartButton.addEventListener('click', addToCartClicked);
});

const shoppingCartItemsContainer = document.querySelector('.shoppingCartItemsContainer');

function addToCartClicked(event) {
  const button = event.target;
  const item = button.closest('.item');

  const itemTitle = item.querySelector('.item-title').textContent;
  const itemPrice = item.querySelector('.item-price').textContent;
  const itemImage = item.querySelector('.item-image').src;

  addItemToShoppingCart(itemTitle, itemPrice, itemImage);
}

function addItemToShoppingCart(itemTitle, itemPrice, itemImage) {
  const elementsTitle = shoppingCartItemsContainer.getElementsByClassName('shoppingCartItemTitle');
  for (let i = 0; i < elementsTitle.length; i++) {
    if (elementsTitle[i].innerText === itemTitle) {
      let elementQuantity = elementsTitle[i]
                                  .parentElement
                                  .parentElement
                                  .parentElement
                                  .querySelector('.shoppingCartItemQuantity');
      elementQuantity.value++;
      Swal.fire({
        position: 'center',
        icon: 'success',
        titleText: 'Elemento sumado en el carrito',
        text: 'Se aumentó correctamente la cantidad',
        showConfirmButton: false,
        timer: 1500
      });
      updateShoppingCartTotal();
      return;
    }
  }

  const shoppingCartRow = document.createElement('div');
  const shoppingCartContent = `
  <div class="row shoppingCartItem">
        <div class="col-6">
            <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <img src=${itemImage} class="shopping-cart-image">
                <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${itemTitle}</h6>
            </div>
        </div>
        <div class="col-2">
            <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <p class="item-price mb-0 shoppingCartItemPrice">${itemPrice}</p>
            </div>
        </div>
        <div class="col-4">
            <div
                class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number"
                    value="1">
                <button class="btn btn-danger buttonDelete" type="button">X</button>
            </div>
        </div>
    </div>`;
  shoppingCartRow.innerHTML = shoppingCartContent;
  shoppingCartItemsContainer.append(shoppingCartRow);

  shoppingCartRow
    .querySelector('.buttonDelete')
    .addEventListener('click', removeShoppingCartItem);

  shoppingCartRow
    .querySelector('.shoppingCartItemQuantity')
    .addEventListener('change', quantityChanged);

  updateShoppingCartTotal();
}

function updateShoppingCartTotal() {
  let total = 0;
  const shoppingCartTotal = document.querySelector('.shoppingCartTotal');

  const shoppingCartItems = document.querySelectorAll('.shoppingCartItem');

  shoppingCartItems.forEach((shoppingCartItem) => {
    const shoppingCartItemPriceElement = shoppingCartItem.querySelector(
      '.shoppingCartItemPrice'
    );
    const shoppingCartItemPrice = Number(
      shoppingCartItemPriceElement.textContent.replace('$', '')
    );
    const shoppingCartItemQuantityElement = shoppingCartItem.querySelector(
      '.shoppingCartItemQuantity'
    );
    const shoppingCartItemQuantity = Number(
      shoppingCartItemQuantityElement.value
    );
    total = total + shoppingCartItemPrice * shoppingCartItemQuantity;
  });
  shoppingCartTotal.innerHTML = `$${new Intl.NumberFormat().format(total)}`;
}

function removeShoppingCartItem(event) {
  const buttonClicked = event.target;
  buttonClicked.closest('.shoppingCartItem').remove();
  updateShoppingCartTotal();
}

function quantityChanged(event) {
  const input = event.target;
  input.value <= 0 ? (input.value = 1) : null;
  updateShoppingCartTotal();
}

function comprarButtonClicked() {
  shoppingCartItemsContainer.innerHTML = '';
  updateShoppingCartTotal();
}
