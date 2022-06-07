//ofrece descuento

let precio = parseFloat(prompt('INGRESAR PRECIO'));
let descuento20 = precio - (precio  * 0.2);
let descuento30 = precio - (precio  * 0.3);
console.log(descuento20);
console.log(descuento30);


//selecciona listado de productos
let producto1 = prompt('INGRESAR 1er PRODUCTO');
let producto2 = prompt('INGRESAR 2do PRODUCTO');
let producto3 = prompt('INGRESAR 3er PRODUCTO');
let producto4 = prompt('INGRESAR 4to PRODUCTO');

if ((producto1 != "") && (producto2 != "") && (producto3 != "") && (producto4 != "")) {
    let heladera = "1) " + producto1 + " " +
        "2) " + producto2 + " " +
        "3) " + producto3 + " " +
        "4) " + producto4;
    console.log(heladera);
} else {
    console.log("ERROR: ES NECESARIO CARGAR TODOS LOS PRODUCTOS");}

//toma un valor lo precesa y da una salida
function entrada(){
    return prompt("INGRESAR DATO");
}

function procesamiento(valor){
    return "LA ENTRADA ES "+valor
}

function salida(valor){
    alert(valor);
}
//SUMAR LA OTRA FORMA DE LLAMADA
salida(procesamiento(entrada()));

//redondea valor
function redondeo(valor){
    return Math.round(valor)
}
for (let index = 0; index < 5; index++) {
    let entrada = prompt("INGRESAR NUMERO");
    alert(redondeo(entrada));
}

//impuestos
function impuesto(precio, porcentaje){
    return precio + ((precio * porcentaje)/100)
}
for (let index = 0; index < 5; index++) {
    let resultado = impuesto(parseFloat(prompt("INGRESAR PRECIO"))
  ,parseFloat(prompt("INGRESAR %")));
    alert(resultado);
}

//declarar tienda abierta o cerrada
class Tienda{
    constructor(nombre, direccion, propietario, rubro){
        this.nombre = nombre;
        this.direccion = direccion;
        this.propietario = propietario;
        this.rubro = rubro;
    }
    estaAbierto(hora){
        if (((hora  >= 8) && (hora  <= 12))||((hora  >= 15) && (hora  <= 19))) {
            return true;
        }
        return false;
    }
}
const tienda4 = new Tienda("33 cents Store", "Cheap 231", "Barato SRL","Ropa");
for (let index = 0; index < 3 ; index++) {
    let entrada = parseInt(prompt("INGRESAR HORA EN PUNTO"));
    if(tienda4.estaAbierto(entrada)){
        alert("LA TIENDA ESTA ABIERTA A LAS "+entrada)
    }else{
        alert("LA TIENDA ESTA CERRADA A LAS "+entrada)
    }
}

//almacenar menu

let comidas = localStorage.getItem('comidas');
if (comidas == null) {
    const menu = [];
    for (let index = 0; index < 5; index++) {
        menu.push(prompt('INGRESAR COMIDA'))
    }
    localStorage.setItem('comidas', menu);
} else {
    let menu = '';
    const arrayComidas = comidas.split(',');
    for (const nombreComida of arrayComidas) {
        menu += nombreComida + '\n';
    }
    alert(menu);
}

//almacenar hamburguesa
class Hamburgesa {
    constructor(nombre, precio, ingredientes, combo) {
        this.nombre = nombre;
        this.precio = parseFloat(precio);
        this.ingredientes = ingredientes;
        this.combo = parseInt(combo);
    }
}
const hamburgesas = [];
hamburgesas.push(new Hamburgesa("Krusty Burger", 150, ['Carne', 'Queso'], 1));
hamburgesas.push(new Hamburgesa("Krusty Doble", 250, ['Carne', 'Queso', 'Panceta'], 0));
hamburgesas.push(new Hamburgesa("Krusty Pollo", 150, ['Pollo', 'Queso'], 2));
hamburgesas.push(new Hamburgesa("Super Krusty", 150, ['Carne', 'Queso', 'huevo'], 5));
hamburgesas.push(new Hamburgesa("Krusty Vegan", 150, ['Espinaca', 'Soja'], 7));
localStorage.setItem('hamburgesas', JSON.stringify(hamburgesas));

//comprar hamburguesa

let almacenadas = localStorage.getItem('hamburgesas');
if (almacenadas != null) {
    let array = JSON.parse(almacenadas);
    let salida = 'SELECCIONAR HAMBURGUESA \n';
    for (let index = 0; index < array.length; index++) {
        salida += index + ' -> ' + array[index].nombre + ' ' + array[index].ingredientes + ' $ ' + array[index].precio + '\n';
    }
    alert(salida);
    let eleccion = parseInt(prompt('INGRESAR HAMBURGUESA'));
    if ((eleccion >= 0) && (eleccion < array.length)) {
        alert("HAMBURGUESA SELECCIONADA " + array[eleccion].nombre)
    } else {
        alert("ERROR DE SELECCION");
    }
}

//aumentar precio producto

let guardadas = localStorage.getItem('hamburgesas');
if (guardadas != null) {
    let array = JSON.parse(guardadas);
    array.forEach(hamburgesa => { hamburgesa.precio += (hamburgesa.precio * 0.3) });
    localStorage.setItem('hamburgesas', JSON.stringify(array));
}



