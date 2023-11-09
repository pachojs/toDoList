// ELEMENTOS DEL HTML
const fecha = document.querySelector('#fecha');
const userName = document.querySelector('#user-name')
const botonPersonales = document.querySelector('#boton-personales');
const seccionPersonales = document.querySelector('.personales')
const botonTrabajo = document.querySelector('#boton-trabajo')
const seccionTrabajo = document.querySelector('.trabajo')
const lista = document.querySelector('#lista');
const elemento = document.querySelector('#elemento');
const input = document.querySelector('#input');
const botonEnter = document.querySelector('.boton-enter');

// Arreglo de objetos donde almaceno mis tareas
let LIST;

// Identificador de las tareas
let id;

// Atributos .Clases
const check = 'fa-check-circle';
const uncheck = 'fa-circle';
const lineThrougt = 'line-throught';
<span class="material-symbols-outlined">search</span>
<span class="material-symbols-outlined">Done</span>
<span class="material-symbols-outlined">Close</span>
<span class="material-symbols-outlined">favorite</span>

//Creación de fecha actualizada
    const FECHA = new Date();

    fecha.innerHTML = FECHA.toLocaleDateString('es', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

// ESCRIBIR NOMBRE DE USUARIO

// let nombreUsuario = prompt('¿COMO TE LLAMAS?');

// userName.innerHTML = nombreUsuario;

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

//Función Agregar Tarea
function agregarTarea(tarea, id, realizado, eliminado){
    // Si existe eliminado es true si no es false
    if (eliminado) {return} 

    //Si realizado true check, false uncheck
    const REALIZADO = realizado ? check : uncheck; 

    const LINE = realizado ? lineThrougt : '';

    const elemento = `
                    <li id="elemento">
                        <i class="far ${REALIZADO} co" 
                           data="realizado" 
                           id="${id}"
                        ></i>
                        <p class="text ${LINE}">${tarea}</p>
                        <i class="fas fa-trash de"
                           data="eliminado" 
                           id="${id}"
                        ></i>
                    </li>
    
    `
    lista.insertAdjacentHTML("beforeend", elemento); 
};

// FUNCIONES DE BOTONES CATEGORIAS

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

// Función Tarea Realizada
function tareaRealizada(element){
    element.classList.toggle(check);
    element.classList.toggle(uncheck);
    element.parentNode.querySelector('.text').classList.toggle(lineThrougt);

    LIST[element.id].realizado = LIST[element.id].realizado ? false : true;

    // console.log(LIST);
    // console.log(LIST[element.id]);
    // console.log(LIST[element.id].realizado); 
};


//Función Tarea Eliminada
function tareaEliminada(element){
    // console.log(element.parentNode);
    // console.log(element.parentNode.parentNode);
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].eliminado = true;
    console.log(LIST);
};

//Crear eventos para el enter en el input y el click en el boton
botonEnter.addEventListener('click', ()=>{
    const tarea = input.value;

    if (tarea) {
        agregarTarea(tarea, id, false, false);
        LIST.push({
            nombre: tarea,
            id: id,
            realizado: false,
            eliminado: false
        });

        localStorage.setItem('TODO', JSON.stringify(LIST));

        input.value = '';
        id++;   
    };
});

document.addEventListener('keyup', function(event){
    if (event.key == 'Enter'){
        const tarea = input.value;

        if (tarea) {
            agregarTarea(tarea, id, false, false);
            LIST.push({
                nombre: tarea,
                id: id,
                realizado: false,
                eliminado: false
            });

            localStorage.setItem('TODO', JSON.stringify(LIST));

            input.value = '';
            id++;  
        };
    };
});


// Evento para cambiar estado de la tarea y eliminar tarea

lista.addEventListener('click', function(event){
    const element = event.target;
    const elementData = element.attributes.data.value;
    console.log(elementData);

    if (elementData == 'realizado') {
        tareaRealizada(element);
        
    } else if(elementData == 'eliminado'){
        tareaEliminada(element);
        console.log("eliminado");        
    };

    localStorage.setItem('TODO', JSON.stringify(LIST));

    console.log(element);
    console.log(element.attributes);
    console.log(element.attributes.data);
    console.log(element.attributes.data.value);
});


//Get local Storage
let data = localStorage.getItem('TODO');

if (data) {
    LIST = JSON.parse(data);
    console.log(LIST);

    id = LIST.length;
    cargarLista(LIST);

} else {
    LIST = [];
    id = 0;    
};

function cargarLista(array){
    array.forEach(function(item){
        agregarTarea(item.nombre, item.id, item.realizado, item.eliminado);
    });
};
