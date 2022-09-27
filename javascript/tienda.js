const array = [];
class User{
constructor(mail, password){
    this.mail = mail;
    this.password = password;
    }
}
function Registrarte(){

     let mail = prompt("ingrese el email de usuario");
    if(mail === "" || mail === null) {
      Swal.fire({icon: 'warning', title: 'Ingrese un Email'})
      return false;
    }
    else {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!re.test(mail)){
          Swal.fire({icon: 'warning', title: 'Formato de Email invalido'});
          return false;
        }
    }
    let passwords = prompt("Ingrese el password");
    
    if (passwords ==="" || passwords === null ){
      Swal.fire({icon: 'warning', title: 'Ingrese una contraseña'});
        return false;
    } 
    else{
        let obj = new User(mail, passwords);
        array.push(obj);
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
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!re.test(email)){
            mensaje.push(`Formato de Email invalido`);
        }
        else if (nom.mail===email){
            if(nom.password===password && password!=''){ 
              if (shoppingCartItemsContainer.innerHTML != '') { 
                cont = 0;
                  $('#modalLoginForm').modal('hide'); 
                  $('body').removeClass('modal-open'); 
                  $('.modal-backdrop').remove();
                  $('#comprarModal').modal('show');
                  comprarButtonClicked();
              }
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
      if (mensaje.length > 0)
      {Swal.fire({icon: 'warning', title: mensaje.join("\n")})}
    } 
    catch(err) {
        if (email === "" || email === null) 
            {mensaje.push("El campo Email no puede estar vacio");}
        if (password === "" || password === null) 
            {mensaje.push("El campo Clave no puede estar vacio");}
        if (mensaje.length > 0)
        {Swal.fire({icon: 'warning', title: mensaje.join("\n")})} 
  }
}
// mas adelante se volverá a agregar esta funcion
// function BuscaUsuario(){
//     let admin = prompt(`Ingresa el nombre de usuario de administrador`);
//     let contraseña = prompt(`Ingresa la contraseña de administrador`);
//     if (admin==="admin" && contraseña==1234)
//     {
//         let usuario1 = prompt("Ingrese el usuario a encontrar");
//         let nom = array.find(name => name.nombre===usuario1);
//         try {
//             if (nom.nombre==usuario1){
//                 alert("El usuario existe y tiene como contraseña: " + nom.password);
//             }
//             else{
//                 alert("El usuario no existe");
//             }
//         } 
//         catch(err) {alert("no se encontro nombre");}
//     }
//     else{
//         alert("No eres administrador");
//     }
// }
// let botonBuscaUsuario = document.getElementById("BuscaUsuario");
// botonBuscaUsuario.addEventListener("click",BuscaUsuario);

let botonEnter = document.getElementById("Entrar");
botonEnter.addEventListener("click",Login);
let botonRegistrarte = document.getElementById("Registrarte");
botonRegistrarte.addEventListener("click",Registrarte);

const addToShoppingCartButtons = document.querySelectorAll('.addToCart');
addToShoppingCartButtons.forEach((addToCartButton) => {
  addToCartButton.addEventListener('click', addToCartClicked);
});

const shoppingCartItemsContainer = document.querySelector(
  '.shoppingCartItemsContainer'
);

function addToCartClicked(event) {
  const button = event.target;
  const item = button.closest('.item');

  const itemTitle = item.querySelector('.item-title').textContent;
  const itemPrice = item.querySelector('.item-price').textContent;
  const itemImage = item.querySelector('.item-image').src;

  addItemToShoppingCart(itemTitle, itemPrice, itemImage);
}

function addItemToShoppingCart(itemTitle, itemPrice, itemImage) {
  const elementsTitle = shoppingCartItemsContainer.getElementsByClassName(
    'shoppingCartItemTitle'
  );
  for (let i = 0; i < elementsTitle.length; i++) {
    if (elementsTitle[i].innerText === itemTitle) {
      let elementQuantity = elementsTitle[i]
                            .parentElement
                            .parentElement
                            .parentElement
                            .querySelector('.shoppingCartItemQuantity');
      elementQuantity.value++;
      //$('.toast').toast('show');
      Swal.fire({
        position: 'center',
        icon: 'success',
        titleText: 'Elemento en el carrito',
        text: 'Se aumentó correctamente la cantidad',
        showConfirmButton: false,
        timer: 1500
      })
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
    total =+ shoppingCartItemPrice * shoppingCartItemQuantity;
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
