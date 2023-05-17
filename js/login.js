const username = document.getElementById('name');
const pass = document.getElementById('pass');
const boton = document.getElementById('boton-inicio');

boton.addEventListener('click', (e) =>{
    e.preventDefault()
    const data = {
        usuario: username.value,
        password: pass.value
    }

    if( data.usuario == 'holamundo' && data.password == '1234'){
        console.log("inicio con exito")
        setTimeout (()=>{
            Swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'Inicio de seccion correcto',
                showConfirmButton: false,
                timer: 1500
              })
            setTimeout (()=>{
                location.href = 'html/catalogo.html';
            },2000) 
        },2000)
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El nombre o la contraseña son incorrectos, intente nuevamente',
            timer: 3000,
            showConfirmButtom: false
        })
    }
});



