function initMap() {
  var centro = {lat: -34.397, lng: 150.644};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 18,
    center: centro,
  });

  var latitud, longitud, miUbicacion;
  var funcionExito = function(posicion) {
    latitud = posicion.coords.latitude;
    longitud = posicion.coords.longitude;

    miUbicacion = new google.maps.Marker({
      position: { lat: latitud, lng: longitud},
      map: map
    });

    map.setZoom(18);
    map.setCenter({lat: latitud, lng: longitud});
  }

  var funcionError = function(error) {
    alert("Tenemos un problema con encontrar tu ubicación");
  }

  
    if (navigator.geolocation) { // devuelve un objeto geolocation q proporciona acceso web a la ubicacion de un dispositivo.
      navigator.geolocation.getCurrentPosition(funcionExito, funcionError); //recibe 3 parametros: exito de la funcion, error de la funcion, opcions de posicion
    }



  var inputPartida = document.getElementById("partida");
  var inputDestino = document.getElementById("llegada");
  new google.maps.places.Autocomplete(inputPartida);
  new google.maps.places.Autocomplete(inputDestino);

  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;

  var calculateAndDisplayRoute = function(directionsService, directionsDisplay){
    directionsService.route({
      origin: inputPartida.value,
      destination: inputDestino.value,
      travelMode: 'DRIVING'
    },
    function(response, status){
      if(status === 'OK') {
        var distancia = Number((response.routes[0].legs[0].distance.text.replace("km","")).replace(",","."));
        var costo = document.getElementById("costo");
        costo.classList.remove("hide");

        var costo = distancia*1.75;
        if (costo<4) {
          costo.innerHTML= "S/. 4";
        } else {
        costo.innerHTML = "S/. " + parseInt(costo);}
        directionsDisplay.setDirections(response);
        miUbicacion.setMap(null);
      } else {
        windows.alert("No encontrammos una ruta.");
      }
    });
  }

  directionsDisplay.setMap(map);
  var trazarRuta = function(){
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  };

  document.getElementById("ruta").addEventListener("click", trazarRuta);

  }
