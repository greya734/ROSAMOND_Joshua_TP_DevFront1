

var map = L.map('map',{
    center : [-22.2758, 166.4572],
    zoom: 13
});

L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(map);

var marker = L.marker([-22.2758, 166.4572]).addTo(map);
marker.bindPopup("<b>Nouméa</b>").openPopup();

$.getJSON('placeholder.json', function(data){
    console.log('Total :', data.total_count)

    $.each(data.results, function(index, station){
        var marker = L.marker([station.geo_point_2d.lat, station.geo_point_2d.lon]).addTo(map);
        
        marker.on('click', function(){
            console.log('Marqueur cliqué :', station.nom_station)
            document.getElementById('infos').innerHTML=
                `
                    <h2>${station.nom_station}</h2>
                    <ul>
                        <li>id : ${station.id_station}</li>
                        <li>Commune : ${station.commune}</li>
                        <li>Adresse : ${station.adresse_station}</li>
                        <li>Points de charge : ${station.nb_points_charge}</li>
                        <li>Opérateur : ${station.nom_operateur}</li>
                        <li>Observations : ${station.observations_stations}</li>
                    </ul>
                `
            //ouvvrir barre latérale
            $('#barre_laterale').removeClass('fermee')
        })

    })
    //fermer barre latérale
    $('#btn-fermer').on('click', function(){
    $('#barre_laterale').addClass('fermee')
})

})
