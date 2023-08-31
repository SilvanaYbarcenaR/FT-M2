const { legacy_createStore } = require("redux");
const createStore = legacy_createStore;
const contador = require("./reducer");
const { incremento, decremento } = require("./actions");

// En esta línea creamos nuestro store. Pasándole como parámetro nuestro Reducer
const store = createStore(contador);

// Obtenemos el elemento con el id `valor`.
const element = document.querySelector('#valor');

// Esta función nos va a servir para actualizar nuestro DOM con el valor que tengamos en nuestro Store.
// En el primer render y cada vez que nos subscribamos al Store.
// Utilizamos el elemento obtenido arriba para mostrar el State.
const renderContador = () => {
  // Obtenemos la propiedad 'contador' de nuestro store:
  const contadorProp = store.getState().contador;
  // Seteamos el número obtenido como texto dentro del elemento con id 'valor':
  element.innerHTML = contadorProp;
}

// Ejecutamos la función 'renderContador':
renderContador();

// Nos subscribimos al store pasándole la misma función. Así cada vez que llegue una acción, ejecutamos la función:
store.subscribe(renderContador);

// Por último, utilizamos los botones de nuestro HTML para que cada vez que hagamos click,
// hagan un dispatch al store de la acción correspondiente:
const buttonInc = document.querySelector('#incremento');
buttonInc.addEventListener('click', () => store.dispatch(incremento()));

const buttonDec = document.querySelector('#decremento');
buttonDec.addEventListener('click', () => store.dispatch(decremento()));

const buttonIncImpar = document.querySelector('#incrementoImpar');
buttonIncImpar.addEventListener('click', () => {
  store.getState().contador % 2 !== 0 && store.dispatch(incremento());
})

const buttonIncAsync = document.querySelector('#incrementoAsync');
buttonIncAsync.addEventListener('click', () => {
  setTimeout(() => {
    store.dispatch(incremento())
  }, 1500)
});