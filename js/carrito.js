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
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function(productoLS){
            if(productoLS.id === infoProducto.id){
                productosLS = productoLS.id
            }
        });
        if(productosLS === infoProducto.id ){
            Swal.fire({
                type: 'info',
                title: 'Oops...',
                text: 'El producto ya está agregado',
                showConfirmButton: false,
                timer: 1000
            })
        } else {
            this.insetarCarrito(infoProducto);
        }
        
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
                <button class="borrar-producto"  data-id="${producto.id}">X</button>
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
            productoID= producto.querySelector('button').getAttribute('data-id');
        }
        this.eliminarProductoLocalStorage(productoID);
        this.calcularTotal();
    }

    vaciarCarrito(e){
        e.preventDefault();
        while (listaProductos.firstChild) {
            listaProductos.removeChild(listaProductos.firstChild);
        }
        this.vaciarLocarStorage();
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

    eliminarProductoLocalStorage(productoID){
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function(productoLS, index){
            if (productoLS.id === productoID){
                productosLS.splice(index, 1);
            }
        });

        localStorage.setItem('productos', JSON.stringify(productosLS));
    }

    //esto hara que al recargar la pagina, los datos de mi carrito no desaparescan 
    leerLocalStorage(){
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function(producto){
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>
                    <img src="${producto.imagen}" width=100>
                </td>
                <td>${producto.name}</td>
                <td>${producto.precio}</td>
                <td>
                    <button class="borrar-producto"  data-id="${producto.id}">X</button>
                </td>
            `;
            listaProductos.appendChild(fila);
        });
    }

    leerLocalStorageCompra(){
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function(producto){
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>
                    <img src="${producto.imagen}" style="width:80px;">
                </td>
                <td>${producto.name}</td>
                <td>${producto.precio}</td>
                <td>
                    <input type="number" class="form-control cantidad" min="1" value=${producto.cantidad}>
                </td>
                <td>${producto.precio * producto.cantidad}</td>
                <td class="td-borrar">
                    <button class="borrar-producto"  data-id="${producto.id}">X</button>
                </td>
            `;
            listaCompra.appendChild(fila);
        });
    }

    vaciarLocarStorage(){
        localStorage.clear();
    }

    procesarPedido(e){
        e.preventDefault();
        if (this.obtenerProductosLocalStorage().length === 0){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El carrito esta vacio, agregar algun producto',
                timer: 3000,
                showConfirmButtom: false
            }) 
        } else {
            location.href = '../html/compra.html'
        }
    }

    calcularTotal(){
        let productoLS;
        let total = 0
        productoLS = this.obtenerProductosLocalStorage();
        for (let i=0; i < productoLS.length; i++){
            let elemento = Number(productoLS[i].precio * productoLS[i].cantidad);
            total = total + elemento;
            console.log(total)
        }
        document.getElementById('total').innerHTML = "$" + total;
    }
}
