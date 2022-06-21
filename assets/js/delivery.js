

function Cliente(nombre, telefono, direccion) {
    this.nombre = nombre;
    this.telefono = telefono;
    this.direccion = direccion;
}

  function e (id, nombre, precio, imagen) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.imagen = imagen;
  }
  

  function Pedido() {
    this.cliente = undefined;
    this.items = [];
    this.total = 0;
    var fecha = new Date();
    fecha = fecha.getDate() + "/" + fecha.getMonth() + "/" + fecha.getFullYear();
    this.fecha = fecha;
  }
  
const carrito = [];

let total = 0;

function renderizarProductos() {

    let tienda = document.getElementById('tienda');
    let filtro = document.getElementById('filtro');
    
    filtro.innerHTML = `
     <button class="btn btn-warning mb-5" onclick="filtroprecio()">Filtrar Precio mayor a $500</button>` 

    BBDD.forEach((e) => {

      let productoHTML = 
      ` <img src="${e.img}" alt=BURGER" style="width:100%">
        <h1>${e.nombre}</h1>
        <p class="price">${e.precio}$</p>
        <p>Hamburguesa vegetariana de garbanzos con cebolla tomate y lechuga con guarnicion de calabazas fritas</p>
        <p><button onclick="agregarProductoAlCarrito(${e.id})">Add to Cart</button></p>
        <p><button onclick="eliminarProductoDelCarrito(${e.id})">Quit to Cart</button></p>
        `

        tienda.innerHTML += productoHTML 
    });

    renderizarProductos();

} 

function agregarProductoAlCarrito(id){

    let producto = BBDD.find(producto => producto.id == id);
  
    let productoEnCarrito = carrito.find(producto => producto.id == id);
    
    if(productoEnCarrito){
        
        productoEnCarrito.cantidad++;
     
    }else {
       
        producto.cantidad = 1;
        carrito.push(producto);
             
    }
    
    renderizarCarrito(); 
}

function renderizarCarrito(){

    let carritoHTML = document.getElementById('carrito');

    html = '';

    carrito.forEach((producto, id)=>{
        
        html += 
         `
       <img src="${producto.img}" alt=BURGER" style="width:100%">
       <h1>${producto.nombre}</h1>
       <p class="price">${producto.precio}$</p>
       <p><button onClick="agregarProductoDelCarrito${producto.cantidad}">Add to Cart</button>
       <p><button onClick="eliminarProductoDelCarrito${producto.cantidad}">Quit to Cart</button>
       `
      })

    carritoHTML.innerHTML = html;

    calcularTotal(); 
}

function calcularTotal(){

    carrito.forEach((producto) => {
       
             total = producto.precio * producto.cantidad;
    })

    console.log(total)
}

//HASTA AQUI SUMA PERFECTO//

const eliminarProductoDelCarrito = (id)=> {

    console.log(carrito[BBDD].cantidad); //1
    carrito[BBDD].cantidad--;

    console.log(carrito[BBDD].cantidad); 

    if(carrito[BBDD].cantidad == 0){
        carrito.reverse(cantidad, 1);}
               
     renderizarCarrito();

    }
    

function filtroPrecio(){

    let bd = BBDD.filter(producto => producto.precio > 500);
    console.log(bd);

}


