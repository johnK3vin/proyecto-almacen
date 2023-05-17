let dataProductos = {
  data: [
    {id: '001', name: "platano", type: "verdura", price: "300", img: "../img/platano.png"},
    {id: '002', name: "manzana", type: "verdura", price: "200", img: "../img/manzana.png" },
    {id: '003', name: "lechuga", type: "verdura", price: "500", img: "../img/lechuga.png"},
    {id: '004', name: "zanahoria", type: "verdura", price: "100", img: "../img/zanahoria.png" },
    {id: '005', name: "morron", type: "verdura", price: "170", img: "../img/morron.png" },
    {id: '006', name: "brocoli", type: "verdura", price: "400", img: "../img/brocoli.png" },
    {id: '007', name: "coliflor", type: "verdura", price: "350", img: "../img/coliflor.png" },
    {id: '008', name: "kiwi", type: "verdura", price: "120", img: "../img/kiwi.png" },
    {id: '009', name: "esponja", type: "aseo", price: "300", img: "../img/esponja.png" },
    {id: '010', name: "ariel", type: "aseo", price: "2000", img: "../img/ariel.png" },
    {id: '011', name: "cif", type: "aseo", price: "1500", img: "../img/cif.png" },
    {id: '012', name: "escoba", type: "aseo", price: "1750", img: "../img/escoba.png" },
    {id: '013', name: "guantes", type: "aseo", price: "150", img: "../img/guantes.png" },
    {id: '014', name: "cocacola", type: "gaseosa", price: "2000", img: "../img/coca.png" },
    {id: '015', name: "fanta", type: "gaseosa", price: "1600", img: "../img/fanta.png" },
    {id: '016', name: "sprite", type: "gaseosa", price: "1350", img: "../img/sprite.png" },
    {id: '017', name: "monster", type: "gaseosa", price: "1500", img: "../img/monster.png" },
    {id: '018', name: "gatorade", type: "gaseosa", price: "1200", img: "../img/gatorade.png"},
    {id: '019', name: "yogurt", type: "lacteos", price: "200", img: "../img/yogurt.png" },
    {id: '020', name: "queso", type: "lacteos", price: "4000", img: "../img/queso.png" },
    {id: '021', name: "huevos", type: "lacteos", price: "300", img: "../img/huevos.png" },
    {id: '022', name: "leche", type: "lacteos", price: "950", img: "../img/leche.png" },
    {id: '023', name: "quesoblanco", type: "lacteos", price: "3000", img: "../img/quesoBlanco.png" },
    {id: '024',name: "espagueti", type: "cocina", price: "600", img: "../img/espagueti.png" },
    {id: '025',name: "arroz", type: "cocina", price: "700", img: "../img/arros.png" },
    {id: '026',name: "azucar", type: "cocina", price: "800", img: "../img/azucar.png" },
    {id: '027',name: "sal", type: "cocina", price: "800", img: "../img/sal.png" },
    {id: '028',name: "aceite", type: "cocina", price: "1100", img: "../img/aceite.png" },
    {id: '029',name: "gomitas", type: "dulces", price: "20", img: "../img/gomitas.png" },
    {id: '030',name: "malvaviscos", type: "dulces", price: "50", img: "../img/malvaviscos.png" },
    {id: '031',name: "chocolate", type: "dulces", price: "200", img: "../img/chocolate.png" },
    {id: '032',name: "piruletas", type: "dulces", price: "150", img: "../img/piruletas.png" },
    {id: '033',name: "oreo", type: "dulces", price: "500", img: "../img/oreo.png" },
  ],
};




//con este for iremos recorriendo la lista y creando las tarjetas de los productos
for (let i of dataProductos.data) {
  let tarjeta = document.createElement("div");
  tarjeta.classList.add("tarjeta", i.type, "hide");//hide: esconder
  //img div  
  let imgContainer = document.createElement("div");
  imgContainer.classList.add("imagen-contenedor");
  //img
  let imagen = document.createElement("img");
  imagen.setAttribute("src", i.img);
  imgContainer.appendChild(imagen);
  tarjeta.appendChild(imgContainer);
  //contenedor  
  let contenedor = document.createElement("div");
  contenedor.classList.add("contenedor");
  //nombre productos
  let name = document.createElement("h5");
  name.classList.add("producto-name");
  name.innerText = i.name.toUpperCase();
  contenedor.appendChild(name);
  //precio
  let price = document.createElement("h6");
  price.innerText = i.price;
  contenedor.appendChild(price);
  //button comprar
  let compra = document.createElement("a");
  compra.classList.add('agregar-carrito')
  compra.setAttribute("data-id", i.id);
  compra.href = '#';
  compra.innerText = "Comprar";
  contenedor.appendChild(compra);



  tarjeta.appendChild(contenedor);
  document.getElementById("catalogoProductos").appendChild(tarjeta);
}

function filtroProducto(valor) {
  //ingresamos a la clase button
  let boton = document.querySelectorAll(".button-valor");
  boton.forEach((button) => {
    //con eso comprobamos si el valor es igual y le daremos un estilo al estar activo
    if (valor.toUpperCase() == button.innerText.toUpperCase()) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });

  //vamos a seleccionar todas las tarjetas
  let elementos = document.querySelectorAll(".tarjeta");
  elementos.forEach((elemento) => {
    //con esto mostraremos todas las tarjetas al presionar el boton de todos
    if (valor == "todos") {
      elemento.classList.remove("hide");
    } else {
      //verificaremos si el elemento tiene la categoria, al no ser asi el elemento se ocultara
      if (elemento.classList.contains(valor)) {
        elemento.classList.remove("hide");
      } else {
        elemento.classList.add("hide");
      }
    }
  });
}

document.getElementById("buscador").addEventListener('click',() => {
  const buscadorInput = document.getElementById('buscador-input').value;
  const elemen = document.querySelectorAll('.producto-name');
  const tarjet = document.querySelectorAll('.tarjeta');
  const Nan = document.getElementById('busquedaText');

  //recorremos todos los elementos y comprovamos si el texto tiene el valor de busqueda
  elemen.forEach((elemento, index) => {
    if (elemento.innerText.includes(buscadorInput.toUpperCase())){
      tarjet[index].classList.remove("hide");
    } else {
      tarjet[index].classList.add("hide");
    }
  });
});


window.onload = () =>{
  filtroProducto('todos');
};