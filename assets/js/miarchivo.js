/* const mediopago= prompt ("Ingrese el medio de pago").toLowerCase ()
const montoapagar= Number(prompt("ingrese el monto de la compra"))

let interes
let descuento
console.log(mediopago)
switch (mediopago){
    case "tarjeta":
        interes= 1.20
        break;
    case "efectivo":
        descuento= 0.80
        break;
    case "mercadopago":
        interes= 1.15
        break;
    default:
        alert ("no ingresaste medio de pago valido")
        break;
}
alert ("tu monto a pagar con " + mediopago + " es de pesos " + montoapagar * interes)

if (mediopago === "efectivo") {
    alert ("tu monto a pagar con " + mediopago + " es de pesos " + montoapagar * descuento)
} */

/*Swal.fire({
    title: 'Submit your Github username',
    input: 'text',
    inputAttributes: {
      autocapitalize: 'off'
    },
    showCancelButton: true,
    confirmButtonText: 'Look up',
    showLoaderOnConfirm: true,
    preConfirm: (login) => {
      return fetch(`//api.github.com/users/${login}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(response.statusText)
          }
          return response.json()
        })
        .catch(error => {
          Swal.showValidationMessage(
            `Request failed: ${error}`
          )
        })
    },
    allowOutsideClick: () => !Swal.isLoading()
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: `${result.value.login}'s avatar`,
        imageUrl: result.value.avatar_url
      })
    }
  })*/