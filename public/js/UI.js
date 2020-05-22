class UI {
  constructor() {
    // Instanciar api
    this.api = new API();
    // Markers
    this.markers = new L.LayerGroup();
    // Iniciar el mapa
    this.mapa = this.inicializarMapa();
  }

  inicializarMapa() {
    // Inicializar y obtener la propiedad del mapa
    const map = L.map('mapa').setView([-38.4160957, -63.6166725], 4);
    const enlaceMapa = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
    L.tileLayer(
      'http://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution: '&copy; ' + enlaceMapa + ' Contributors',
      maxZoom: 18,
    }).addTo(map);
    return map;
  }

  showEstablishments(info) {
    this.showMessageLoading('Buscando..');
    this.api.getDataByProvinceAndTypeFuel(info)
      .then(info => {
        console.log(info);
        this.mapa.setView([-38.4160957, -63.6166725], 4);
        const results = info.result.records;
        // Ejecutar funcion para mostrar pines
        this.showPins(results);
      })
  }

  showPins(data) {
    // Limpiar markers
    this.markers.clearLayers();
    // recorrer establecimientos
    data.map(item => {
      // destructuring
      const { latitud, longitud } = item;
      if (latitud != null && longitud != null) {
        // Crer popup
        const descriptionPopu = L.popup()
          .setContent(`${this.createContentPopu(item)}`);
        // agregar pin
        const marker = new L.marker([
          parseFloat(latitud),
          parseFloat(longitud)
        ]).bindPopup(descriptionPopu);

        this.markers.addLayer(marker);
      }
    })

    this.hideMessageLoading();
    this.markers.addTo(this.mapa);
  }

  createContentPopu(info) {
    const { empresabandera, precio, producto, localidad, direccion } = info;
    return `
          <p><b>${empresabandera}</b></p>
          <p>Calle: ${direccion}</p>
          <p>Localidad: ${localidad}</p>
          <hr>
          <p><b>${producto}</b></p>
          <p>1 Litro = <b> $ ${precio}</b></p>
          `;
  }

  showMessageErrorForm() {
    alert('Debes seleccionar una provincia y un tipo de combustible')
  }

  checkOrientationAndChangeClassesCssOnMap(orientation) {
    const { type } = orientation;
    const map = document.querySelector('#mapa');
    if (type === 'landscape-primary' || type === 'landscape-secondary') {
      map.classList.remove('map-vertical');
      map.classList.add('map-horizontal');
    } else {
      map.classList.remove('map-horizontal');
      map.classList.add('map-vertical');
    }
  }

  showMessageLoading(message) {
    const divMap = document.querySelector('#mapa');
    divMap.setAttribute('hidden', '');
    const messageDiv = document.querySelector('#message');
    messageDiv.innerHTML = `<div class="col-lg-6 mt-5">
                <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
                </div>
                <h3 class="text-dark text-center mt-4">${message}</h3>
              </div>`;
  }

  hideMessageLoading() {
    const divMap = document.querySelector('#mapa');
    divMap.removeAttribute('hidden');
    document.querySelector('#message').innerHTML = '';
  }

}