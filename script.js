var marker=undefined
setup();
setInterval(get_issdata,2000)



function setup()
{
    var mymap = L.map('mapid').setView([0,0], 2);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoidGVjaG5pY2Fsa25vd2xlZGdlY2VudGVyIiwiYSI6ImNrbXlzdjF4ZzA3NWkydnI0OGt6NTVqbGgifQ.Xyc9MSkPyAlx_dob7roRRQ'
    }).addTo(mymap);

    var issIcon = L.icon({
        iconUrl: 'images/iss.png',
        iconSize:     [100, 60],
        iconAnchor:   [50, 30],
    });
    marker=L.marker([0, 0], {icon: issIcon}).addTo(mymap)
    $(function () {
        $.ajax({
            url: "http://api.open-notify.org/astros.json",
            success: function(data) {
                var genstr="<b>Astronauts in ISS</b>"
                data.people.forEach(function(each){
                    if(each.craft=="ISS")
                    genstr+="<br>"+each.name
                });
                marker.bindPopup(genstr);
            }
        });
    });
    get_issdata();
}
function get_issdata()
{
    $(function () {
       $.ajax({
           url: "https://api.wheretheiss.at/v1/satellites/25544",
           success: function(data) {
               showresult(data)
           }
       });
    });
}
function showresult(data)
{
    res_lat=data.latitude
    res_long=data.longitude
    res_alt=data.altitude
    res_vel=data.velocity
    document.querySelector("#res_lat").innerText=res_lat.toFixed(2);
    document.querySelector("#res_long").innerText=res_long.toFixed(2);
    document.querySelector("#res_alt").innerText=Math.round(res_alt)
    document.querySelector("#res_vel").innerText=Math.round(res_vel)
    marker.setLatLng([res_lat,res_long])
}