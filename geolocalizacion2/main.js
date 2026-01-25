let latitud
let longitud

if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(
        (coordenadas)=>{
            latitud=coordenadas.coords.latitude
            longitud=coordenadas.coords.longitude


            let map = L.map('map').setView([latitud,longitud], 19)

            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; OpenStreetMap'
            }).addTo(map);

            let perCasa = [
                [21.143622, -98.423069],
                [21.143772, -98.422965],
                [21.143628, -98.422768],
                [21.143451, -98.422915]
            ];
            let poligono=L.polygon(perCasa,{
                color: 'green',
                fillColor: '#db34d8',
                fillOpacity: 0.4
            }).addTo(map)

            poligono.bindPopup("Perímetro de mi casa<br></br>la coordenadas son:<br></br>latitud:"+latitud+",longitud:"+longitud)


        },
        (error) => { 
        alert("Error al obtener ubicación: " + error.message); 
    })
}else{
    alert("no tiene geolocalizacion el navegador")
}