const compra = new Carrito();
const listaCompra = document.querySelector("#listaCompras tbody");
const carrito = document.getElementById("carrito");
const procesarCrompraBtn = document.getElementById("procesar-compra");
const cliente = document.getElementById("from_name");
const correo = document.getElementById("email_id");

cargarEvento();

function cargarEvento() {
  document.addEventListener("DOMContentLoaded",compra.leerLocalStorageCompra());

  compra.calcularTotal();

  carrito.addEventListener("click", (e) => {compra.eliminarProducto(e)});

  procesarCrompraBtn.addEventListener("click", procesarCompra);
}

function procesarCompra(e) {
  e.preventDefault();

  //viendo que la lista no este vacia ni tampoco los datos
  if (compra.obtenerProductosLocalStorage().length === 0) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "No hay producto, seleccione alguno",
      timer: 3000,
      showConfirmButtom: false,
    }).then(function () {
      window.location = "../html/catalogo.html";
    });
  } else if (cliente.value === "" || correo.value === "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Ingrese todos los campos requeridos",
      timer: 3000,
      showConfirmButtom: false,
    });
  } else {

    let parametros = {
      name : document.getElementById('from_name').value,
      reply_to: document.getElementById('reply_to').value,
      email_id: document.getElementById('email_id').value
    }

    //codigo para enviar el mansaje al correo del cliente
    const serviceID = "service_9fza1oe";
    const templateID = "template_8cjaz4g";

    emailjs.send(serviceID, templateID, parametros).then((res) =>{
      document.getElementById('from_name').value = "";
      document.getElementById('email_id').value = "";
      document.getElementById('reply_to').value = "";
    })
    
    

    const cargandoGif = document.getElementById("cargando");
    cargandoGif.style.display = "block";

    const enviado = document.createElement("img");
    enviado.src = "../img/mail.gif";
    enviado.style.display = "block";
    enviado.width = "100";

    setTimeout(() => {
      cargandoGif.style.display = "none";
      document.querySelector(".cargando-img").appendChild(enviado);
      setTimeout(() => {
        enviado.remove();
        compra.vaciarLocarStorage();
        window.location = "../html/catalogo.html";
      }, 3000);
    }, 3000);
  }
}
