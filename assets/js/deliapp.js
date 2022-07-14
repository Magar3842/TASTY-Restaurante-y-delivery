// == selectores ==

const productosContainer = document.querySelector('#contenedor-productos')
const carritoContenedor = document.querySelector('#carrito-contenedor')

const contadorCarrito = document.querySelector('#contadorCarrito')
const precioTotal = document.querySelector('#precioTotal')

const btnVaciar = document.getElementById('vaciarCarrito')


// carrito en localstore y archivo JSON

const carrito = JSON.parse (localStorage.getItem('carrito')) || []

let menu = []

// generar el DOM de todos los productos
fetch('/assets/menu.json')
.then ((resp) => resp.json ())
.then ((data) => {     
     menu = data

menu.forEach ((producto) => {
  const div = document.createElement('div')
    div.classList.add('producto')

    div.innerHTML = `
    <br>                
    <div class="card">           
                    <img src=${producto.img} alt="">
                    <h3>${producto.nombre}</h3>
                    <p>${producto.descripcion}</p>
                    ${producto.freeshipping === true ? '<p><strong>Envio Gratis</strong></p>' : ''}
                    <p class="precioProducto">Precio: $${producto.precio}</p>
                    <button onclick="agregarAlCarrito(${producto.id})" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>
                  </div>
                  <br>
                `

          productosContainer.append(div)
      })
    })

// function agregarAlCarrito() {
// evento de mostrar mensaje cuando selecciona productos en el carrito a chequear

//function agregarAlCarrito(id) {
  // const item = productosMenu.find((producto) => producto.id === id)

  const agregarAlCarrito = (productId) => {
  const itemInCart = carrito.find((producto) => producto.id === productId)

  if (itemInCart) {
    itemInCart.cantidad += 1
    showMensaje(itemInCart.nombre)
  } else {
    const { id, nombre, precio } = menu.find((producto) => producto.id === productId)

    const itemToCart = {
      id,
      nombre,
      precio,
      cantidad: 1
    }
    carrito.push(itemToCart)
    showMensaje(nombre)

  }

  localStorage.setItem('carrito', JSON.stringify(carrito))

  console.log(carrito)
  renderCarrito()
  renderCantidad()
  renderTotal()

}

//remover del carrito productos

const removerDelCarrito = (id) => {
    const item = carrito.find((producto) => producto.id === id)
    
    item.cantidad -=1

    if (item.cantidad === 0) {
      const indice = carrito.indexOf(item)
      carrito.splice(indice, 1)
    }

    Toastify({
      text: `Se eliminó 1 unidad de ${item.nombre}`,
      position: 'left',
      gravity: 'bottom',
      duration: 5000,
      style: {
          background: "linear-gradient(to right, #f17b5d, #f02f2f)",
        }
      
      }).showToast()
    
    localStorage.setItem('carrito', JSON.stringify(carrito))

    renderCarrito()
    renderCantidad()
    renderTotal()
}

// vaciar carrito

const vaciarCarrito = () => {
   carrito.length = 0
   localStorage.setItem('carrito', JSON.stringify(carrito))

    renderCarrito()
    renderCantidad()
    renderTotal()
}

//se agrega evento al boton vaciar
//btnVaciar.addEventListener('click', vaciarCarrito)

btnVaciar.addEventListener('click', () => {
  Swal.fire({
      title: 'Está seguro?',
      text: "Está a punto de vaciar el carrito",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, vaciar',
      cancelButtonText: 'No, cancelar'
    }).then( (result) => {
          if (result.isConfirmed) {
              vaciarCarrito()
              botonCerrar.click()
              Toastify({
                  text: 'Se vació el carrito',
                  position: 'left',
                  gravity: 'bottom',
                  duration: 5000,
                  style: {
                      background: "linear-gradient(to right, #f17b5d, #f02f2f)",
                    }
                  }).showToast()
                }
          } )
    })   
              


const renderCarrito = () => {
    carritoContenedor.innerHTML = ''

    carrito.forEach((item) => {
        const div = document.createElement('div')
        div.classList.add('productoEnCarrito')

        div.innerHTML = `
                    <p>${item.nombre}</p>
                    <p>Cantidad: ${item.cantidad}</p>
                    <p>Precio: $${item.precio}</p>
                    <button onclick="removerDelCarrito(${item.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
                    `
        
        carritoContenedor.append(div)
    })
}

const renderCantidad = () => {
    contadorCarrito.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad, 0)
}

//se agrega un evento de mensaje al agregar productos al carrito

const renderTotal = () => {
    let total = 0
    carrito.forEach((producto) => {
        total += producto.precio * producto.cantidad
    })

    precioTotal.innerText = total
} 

const showMensaje = (nombre) => {
  Toastify({
      text: `Se agregó 1 unidad de ${nombre} al carrito!`,
      duration: 3000,
      gravity: 'bottom',
      position: 'left',
      onClick: () => {
          botonAbrir.click()
      },
      style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
  }).showToast()
}

    renderCarrito()
    renderCantidad()
    renderTotal()

 

const btnFinalizar = document.getElementById('finalizarCompra')

btnFinalizar.addEventListener('click', () => {
  Swal.fire({
      title: 'Finaliza su compra?',
      text: "Está a punto de confirmar su compra",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, indicar medio de pago',
      cancelButtonText: 'No, cancelar compra'
    }).then( (result) => {
          if (result.isConfirmed) {
              vaciarCarrito()
              botonCerrar.click()
              Toastify({
                  text: 'Se confirmo la compra',
                  position: 'left',
                  gravity: 'bottom',
                  duration: 5000,
                  style: {
                      background: "linear-gradient(to right, #f17b5d, #f02f2f)",
                    }
              }).showToast()
          }
    } )
})

//desestructuro y selecciono los productos de la misma categoria
//FUNCION SELECCIONAR PRODUCTOS
//const prodFiltrados = productosMenu.filter( (prod) => prod.categoria !== "Burguer" )
//parameter passed from button (Parameter same as category)

  function filterproduct(value) {
    limpiarrender()

  if (value == 'todos') {
    renderproducts(productosMenu)}
    else {
      productosfiltrados = productosMenu.filter((product)=>producto.categoria==value)
      renderproducts (productosfiltrados)  
      }
    }

    window.onload = () => {
      filterproduct ("todos");
    };

    /* //Button class code
    let buttons = document.querySelectorAll(".button-value");
    buttons.forEach((button) => {
      //check if value equals innerText
      
   
   //select all cards
    let elements = document.querySelectorAll('contenedor-productos');
    //loop through all cards
    elements.forEach((element) => {
      //display all cards on 'all' button click
      if (value == "all") {
        element.classList.remove('producto');
      } else {
        //Check if element contains category class
        if (element.classList.contains(value)) {
          //display element based on category
          element.classList.remove('producto');
        } else {
          //hide other elements
          element.classList.add('producto');
        }
      }
    });
  }
    
  //Search button click
  document.getElementById("search").addEventListener("click", () => {
    //initializations
    let searchInput = document.getElementById('search-input').value;
    let elements = document.querySelectorAll('.producto');
    let card = document.querySelectorAll('.categoria');
  

    //loop through all elements
    elements.forEach((element, index) => {
      //check if text includes the search value
      if (element.innerText.includes(searchInput.toUpperCase())) {
        //display matching card
        card[index].classList.remove('producto');
      } else {
        //hide others
        card[index].classList.add('producto');
      }
    });
  });
 */

  //FORMULARIO DE ENVIO DE COMPRA

const formulario = document.querySelector('#my-form')
const inputNombre = document.querySelector('#input-nombre')
const inputDireccion = document.querySelector('#input-direccion')
const btnEnviar = document.querySelector('#btn-enviar')

inputNombre.addEventListener('keydown', (event) => {
  if (inputNombre.value.length <= 4) {
    inputNombre.classList.add('border-danger')
    inputNombre.classList.remove('border-success')
} else {
    inputNombre.classList.add('border-success')
    inputNombre.classList.remove('border-danger')
}
})

inputDireccion.addEventListener('input', () => {
  if (inputDireccion.value.length <= 8) {
    inputDireccion.classList.add('border-danger')
    inputDireccion.classList.remove('border-success')
} else {
    inputDireccion.classList.add('border-success')
    inputDireccion.classList.remove('border-danger')
}
})
formulario.addEventListener('submit', (e) => {
  e.preventDefault()
  console.log(e)

  const userData = {
    nombre: inputNombre.value,
    direccion: inputDireccion.value,
    password: inputPassword.value
}

console.log(userData)
})

const inputPassword = document.querySelector('#input-pass')
const btnPass = document.querySelector('#btn-pass')

btnPass.addEventListener('click', (e) => {
    e.preventDefault()
    if (inputPassword.type === "password") {
        inputPassword.type = "text"
    } else {
        inputPassword.type = "password"
    }
})
