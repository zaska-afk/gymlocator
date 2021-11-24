function initMap() {
  //Map
  let searchOptions = {
    center: { lat: 39.9784, lng: -86.118 },
    zoom: 8,
  };

  map = new google.maps.Map(document.getElementById("map"), searchOptions);

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
