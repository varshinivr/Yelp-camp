const mbxGeocoding=require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken=process.env.MAPBOX_TOKEN;
console.log('hey')
console.log(mapBoxToken)
const geocoder=mbxGeocoding({accessToken:mapBoxToken})