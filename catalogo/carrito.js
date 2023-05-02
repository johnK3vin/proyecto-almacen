class Carrito {

    //añadir producto al carrito 
    comprarProducto(e){
        e.preventDefault();// ocupamos e.preventDefault() para detener las acciones del navegador
        if(e.target.classList.contains('agregar-carrito')){
            const producto = e.target.parentElement.parentElement;
            this.leerDatosProducto(producto);
        }
    }

    leerDatosProducto(producto){
        const infoProducto = {
            imagen : producto.querySelector('img').src,
            name: producto.querySelector('h5').textContent,
            precio : producto.querySelector('h6').textContent,
            id : producto.querySelector('a').getAttribute('data-id'),
            cantidad: 1
        }
        this.insetarCarrito(infoProducto);
    }

    insetarCarrito(producto){
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>
                <img src="${producto.imagen}" width=100>
            </td>
            <td>${producto.name}</td>
            <td>${producto.precio}</td>
            <td>
                <a href="#" class="borrar-producto" data-id="${producto.id}"><img src="borrar.png"></a>
            </td>

        `;
        listaProductos.appendChild(fila);
        this.guardarProductoLocalStorage(producto);
    }

    //eliminar el producto, esta funcionando pero al hacer click sobre la X no me funciona, solo si es por debajo
    eliminarProducto(e){
        e.preventDefault();
        let producto, productoID;
        if (e.target.classList.contains('borrar-producto')){
            e.target.parentElement.parentElement.remove();
            producto = e.target.parentElement.parentElement;
            productoID= producto.querySelector('a').getAttribute('data-id');
        }
    }

    vaciarCarrito(e){
        e.preventDefault();
        while (listaProductos.firstChild) {
            listaProductos.removeChild(listaProductos.firstChild);
        }
        return false;
    }

    //locarStorage 

    
    guardarProductoLocalStorage(producto){
        let productos;
        productos = this.obtenerProductosLocalStorage();
        productos.push(producto);
        localStorage.setItem('productos', JSON.stringify(productos));
    }

    obtenerProductosLocalStorage(){
        let productoLS;

        if(localStorage.getItem('productos') === null){
            productoLS = [];
        } else {
            productoLS = JSON.parse(localStorage.getItem('productos'));
        }
        return productoLS;
    }
}



