
const carro = new Carrito();
const carrito = document.getElementById('carrito');
const productos = document.getElementById('catalogoProductos');
const listaProductos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
const procesarPedido = document.getElementById('procesar-pedido');

cargarEventos();

//con esta funcion nos ayudara a cargar los eventos asociados al carrito 
function cargarEventos(){
    productos.addEventListener('click', (e)=> {carro.comprarProducto(e)});

    carrito.addEventListener('click', (e) => {carro.eliminarProducto(e)});

    vaciarCarritoBtn.addEventListener('click', (e)=>{carro.vaciarCarrito(e)});

    document.addEventListener('DOMContentLoaded', carro.leerLocalStorage());

    procesarPedido.addEventListener('click', (e) => {carro.procesarPedido(e)});
}