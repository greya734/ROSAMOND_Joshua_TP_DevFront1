

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
    })
})

