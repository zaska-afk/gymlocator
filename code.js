const { map } = require("jquery");

function initMap() {
  //Map
  let searchOptions = {
    center: { lat: 39.9784, lng: -86.118 },
    zoom: 8,
  };

  map = new google.maps.Map(document.getElementById("map"), searchOptions);

  let directionsService = new google.maps.DirectionsService();

  //direction renderer to display route
  let directionsDisplay = new google.maps.DirectionsRenderer();

  // bind the directionsRenderer to the map
  directionsDisplay.setMap(map);

  function calcRoute() {
    //create request
    let request = {
      origin: document.getElementById("from").value,
      destination: document.getElementById("to").value,
      travelMode: google.maps.TravelMode.DRIVING, // WALKING , BICYCLING and TRANSIT
      unitSystem: google.maps.UnitSystem.IMPERIAL, //
    };
    // pass request to route method
    directionsService.route(request, function (result, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        //get distance and time
        let output = document.querySelector("#output");
        output.innerHTML =
          `<div class='alert-info'> From: ` +
          document.getElementById("from").value +
          `.<br />To: ` +
          document.getElementById("to").value +
          `.<br /> Distance <i class="fas fa-road"></i>: ` +
          result.routes[0].legs[0].distance.text +
          `.<br />Duration <i class="fas fa-clock"></i> :` +
          result.routes[0].legs[0].duration.text +
          `.</div>`;

        directionsDisplay.setDirections(result);
      } else {
        //delte route from map
        directionsDisplay.setDirections({ routes: [] });

        //center map
        map.setCenter(myLatLng);

        //show error message
        output.innerHTML =
          "<div class='alert-danger'><i class='fas fa-exclamation-triangle'></i> Couln't find that data </div>";
      }
    });
  }
  calcRoute();

  //create autocomplete objects for inputs
  let options = {
    types: ["(cities)"],
  };
  let input1 = document.getElementById("from");
  let autocomplete1 = new google.maps.places.Autocomplete(input1, options);

  let input2 = document.getElementById("to");
  let autocomplete2 = new google.maps.places.Autocomplete(input2, options);

  //listen for user click to display marker
  google.maps.event.addListener(map, "click", (event) => {
    addMarker({ location: event.latLng });
  });

  // Marker
  let markerArray = [
    {
      location: { lat: 39.9784, lng: -86.118 },
      //imageIcon: "/images/mapIcon.jpg",
      //imageIcon: "https://img.icons8.com/nolan/2x/marker.png",
      content: `<h2>Located Place</h2>`,
    },
    { location: { lat: 39.7684, lng: -86.1581 } },
  ];

  for (i = 0; i < markerArray.length; i++) {
    addMarker(markerArray[i]);
  }

  function addMarker(props) {
    let marker = new google.maps.Marker({
      position: props.location,
      map: map,
      //icon: props.imageIcon,
    });
    //check for custom icon
    if (props.imageIcon) {
      marker.setIcon(props.imageIcon);
    }

    if (props.content) {
      let infoWindow = new google.maps.InfoWindow({
        content: props.content,
      });

      marker.addListener("mouseover", () => {
        infoWindow.open(map, marker);
      });
    }
  }
}
