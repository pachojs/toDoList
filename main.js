// ELEMENTOS DEL HTML
const fecha = document.querySelector('#fecha');
const userName = document.querySelector('#user-name')
const botonPersonales = document.querySelector('#boton-personales');
const seccionPersonales = document.querySelector('.personales')
const botonTrabajo = document.querySelector('#boton-trabajo')
const seccionTrabajo = document.querySelector('.trabajo')


//Creación de fecha actualizada
    const FECHA = new Date();

    fecha.innerHTML = FECHA.toLocaleDateString('es', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

// ESCRIBIR NOMBRE DE USUARIO

let nombreUsuario = prompt('¿COMO TE LLAMAS?');

userName.innerHTML = nombreUsuario;

// despliegue sección tareas personales

botonPersonales.addEventListener('click',()=>{
    seccionPersonales.classList.toggle('inactive');

    DesactivarSeccionTrabajo();
})

// despliegue sección trabajo

botonTrabajo.addEventListener('click',()=>{
    seccionTrabajo.classList.toggle('inactive');

    DesactivarSeccionPersonales();
})


// FUNCIONES

function DesactivarSeccionTrabajo() {
    let seccionTrabajoCerrado = seccionTrabajo.classList.contains('inactive');

    if(!seccionTrabajoCerrado){
        seccionTrabajo.classList.add('inactive')
    }
}

function DesactivarSeccionPersonales() {
    let seccionPersonalesCerrado = seccionPersonales.classList.contains('inactive');

    if(!seccionPersonalesCerrado){
        seccionPersonales.classList.add('inactive')
    }
};