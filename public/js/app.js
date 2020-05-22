const ui = new UI();
const api = new API();
// seleccionar formulario 
const form = document.querySelector('#form-app');
const selectProvince = document.querySelector('#select-province');
const selectFuel = document.querySelector('#type-fuel');

// Listenners
form.addEventListener('submit', (e) => {
  e.preventDefault();
  // option seleccionada
  const provinceSelected = selectProvince.options[selectProvince.selectedIndex].value;
  const fuelSelected = selectFuel.options[selectFuel.selectedIndex].value;

  if (provinceSelected === '0' || selectFuel === '0') {
    ui.showMessageErrorForm();
  } else {
    ui.showEstablishments({
      province: provinceSelected,
      product: fuelSelected
    });
  }
})

window.addEventListener('orientationchange', (e) => {
  const orientation = window.screen.orientation;
  ui.checkOrientationAndChangeClassesCssOnMap(orientation);
});
