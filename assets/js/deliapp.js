// == selectores ==

const productosContainer = document.querySelector('#contenedor-productos')
const carritoContenedor = document.querySelector('#carrito-contenedor')

const contadorCarrito = document.querySelector('#contadorCarrito')
const precioTotal = document.querySelector('#precioTotal')

const btnVaciar = document.getElementById('vaciarCarrito')
const climaStatus = document.querySelector('#clima_actual')


// api del clima OPENWATHER

let climaEstado = []

fetch(`https://api.openweathermap.org/data/2.5/weather?id=3433955&appid=3cd8501a0274ae0967a4e3cd878a40a1&lang=sp&units=metric`)
.then((resp) => resp.json())
.then((data) => {
    console.log(data)

    climaStatus.innerHTML =`
    
    <h3>Ciudad: ${data.name} </h3>
    <h3>Pais: ${data.sys.country} </h3>
    <p>Temp actual: ${data.main.temp} °</p>
    <p>Temp max: ${data.main.temp_max} °</p>
    <p>Humedad actual: ${data.main.humidity}%</p>
              
    `
    
})



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


    function realizarCalculo (){
      if(document.getElementById('cantidadcuotas').value == 3){
          document.getElementById('valorPorCuota').innerHTML = `El valor de cada cuota sera de $ ${((precioTotal.innerHTML / 3)*1.1).toFixed(2)}`
          document.getElementById('valorTotal').innerHTML = `El valor total final sera de $ ${(precioTotal.innerHTML * 1.1).toFixed(2)}`
          document.getElementById('invalidNumber').innerHTML = ""
      }else  if (document.getElementById('cantidadcuotas').value == 6){
          document.getElementById('valorPorCuota').innerHTML = `El valor de cada cuota sera de $ ${((precioTotal.innerHTML / 6)*1.2).toFixed(2)}`
          document.getElementById('valorTotal').innerHTML = `El valor total final sera de $ ${(precioTotal.innerHTML * 1.2).toFixed(2)}`
          document.getElementById('invalidNumber').innerHTML = ""
      }else if (document.getElementById('cantidadcuotas').value == 12){
          document.getElementById('valorPorCuota').innerHTML = `El valor de cada cuota sera de $ ${((precioTotal.innerHTML / 12)*1.3).toFixed(2)}`
          document.getElementById('valorTotal').innerHTML = `El valor total final sera de $ ${(precioTotal.innerHTML * 1.3).toFixed(2)}`
          document.getElementById('invalidNumber').innerHTML = ""
      } else if (document.getElementById('cantidadcuotas').value != 3 || 6 || 12) {
          document.getElementById('valorPorCuota').innerHTML = ""
          document.getElementById('valorTotal').innerHTML = ""
          document.getElementById('invalidNumber').innerHTML = `El dato ingresado no es valido`
          
      }
    }
    
    console.log(precioTotal.innerHTML)


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
                  text: 'Se confirmo la compra, vaya al checkout para proceder al pago y envio',
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