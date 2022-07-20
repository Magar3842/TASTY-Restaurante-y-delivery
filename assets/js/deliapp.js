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
  renderTotalCompra()

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
    renderTotalCompra()
}

// vaciar carrito

const vaciarCarrito = () => {
   carrito.length = 0
   localStorage.setItem('carrito', JSON.stringify(carrito))

    renderCarrito()
    renderCantidad()
    renderTotal()
    renderTotalCompra()
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

/* const renderEnvio = () => {
  let enviar = 0
  carrito.forEach((producto) => {
      
    enviar += producto.precio * producto.cantidad
  })
 "freeshipping": false,
  costoEnvio.innerText = enviar
} */

/* var freeshipping = 250

const renderTotalCompra = () => {
  let pagar = 0
  carrito.forEach((producto) => {
    if { (producto.freeshipping === false)
      totalCompra += (producto.precio * producto.cantidad) + 'freeshipping'
    }
     
    totalCompra.innerText = pagar
      
  })
  
} */

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
    renderTotalCompra()

 

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

function limpiarrender(){
  document.querySelectorAll('.producto').forEach(e => e.remove());
}

function filterproduct(value) {
    limpiarrender()

  if (value == 'todos') {
    menu.forEach()
    //VER QUE PONER PARA LLAMAR A LA BASE Y HACER EL FILTRADO
  
  }  
    else {
      productosfiltrados = menu.filter((product)=>producto.categoria==value)
      menu.forEach (productosfiltrados)  
      }
    }

    window.onload = () => {
      filterproduct ('todos');
    }

// api de tragos para que el cliente explore

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'bb57cf8eeemsh9cf494a975c2323p1cf0e6jsn569311367d57',
		'X-RapidAPI-Host': 'the-cocktail-db.p.rapidapi.com'
	}
};

fetch('https://the-cocktail-db.p.rapidapi.com/list.php?i=list', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));
