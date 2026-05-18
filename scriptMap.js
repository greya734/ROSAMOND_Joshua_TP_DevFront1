var map = L.map('map',{
    center : [-22.2758, 166.4572],
    zoom: 13
});

L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(map);

var marker = L.marker([-22.2758, 166.4572]).addTo(map);
marker.bindPopup("<b>Nouméa</b>").openPopup();

// Stocker toutes les stations et leurs marqueurs
var allStations = [];
var allMarkers = [];

$.getJSON('placeholder.json', function(data){
    console.log('Total :', data.total_count)

    $.each(data.results, function(index, station){
        var marker = L.marker([station.geo_point_2d.lat, station.geo_point_2d.lon]).addTo(map);

        // Stocker la station et son marqueur
        allStations.push(station);
        allMarkers.push(marker);

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
            $('#barre_laterale').removeClass('fermee')
        })
    })

    // Fermer la barre latérale
    $('#btn-fermer').on('click', function(){
        $('#barre_laterale').addClass('fermee')
    })

    // Gestion de la recherche
    $('form').on('submit', function(e){
        e.preventDefault();

        var critere = $('.option-critere').val();
        var valeur = $('.critere').val().trim().toLowerCase();

        allMarkers.forEach(function(marker, index){
            var station = allStations[index];
            var champStation = String(station[critere] ?? '').toLowerCase();

            if (valeur === '' || champStation.includes(valeur)) {
                // Afficher le marqueur s'il n'est pas déjà sur la carte
                if (!map.hasLayer(marker)) {
                    marker.addTo(map);
                }
            } else {
                // Masquer le marqueur
                if (map.hasLayer(marker)) {
                    map.removeLayer(marker);
                }
            }
        })
    })

    // Réinitialiser l'affichage si le champ de recherche est vidé
    $('.critere').on('input', function(){
        if ($(this).val().trim() === '') {
            allMarkers.forEach(function(marker){
                if (!map.hasLayer(marker)) {
                    marker.addTo(map);
                }
            })
        }
    })
})