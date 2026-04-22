

var map = L.map('map',{
    center : [-22.2758, 166.4572],
    zoom: 13
});

L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(map);

var marker = L.marker([-22.2758, 166.4572]).addTo(map);
marker.bindPopup("<b>Nouméa</b>").openPopup();


$.ajax({
    url : '/api/explore/v2.1/catalog/datasets/bornes-de-recharge-pour-vehicules-electriques/records?limit=20',
})



/*$.getJSON('placeholder.json', function(data){
    $.each(data, function(index, personne){
        console.log(personne.name)

        var marker = L.marker([personne.address.geo.lat, personne.address.geo.lng]).addTo(map)
        marker.bindPopup(
            "<p>" + personne.name + "</p><br>" +
            "<a href='mailto:" + personne.email + "'>" + personne.email + "</a>").openPopup();
    })
})*/ 