const form = document.getElementsByClassName('contactos');

form.addEventListener('submit', enviar)

async function enviar(event){
    event.preventDefault()
    const formData = new FormData(this);
    const response = await fetch(this.action, {
        method: this.method,
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    if (response.ok){
        this.reset()
        setTimeout(()=>{
            Swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'Mensaje enviado, te responderemos en breve',
                showConfirmButton: false,
                timer: 1500
              })
        }, 2000)
    }
}