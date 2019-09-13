const request = require('request')
const log = console.log
const DARK_SKY_URL = "https://api.darksky.net/forecast/becbfbd550da12956107a1c8955c603f/37.8267,-122.4233?lang=ja"
const MAP_BOX_URL = "https://api.mapbox.com/geocoding/v5/mapbox.places/chester.json?proximity=-74.70850,40.78375&access_token=pk.eyJ1Ijoia3lsYW0yNiIsImEiOiJjazBhcnpuc2swbXNzM21ud2J5NzBlZ2w0In0.KSTr5qNUCn_Jo9HCukO-yA"

request({ url: DARK_SKY_URL, json: true }, (err, res) => {
    if(err === null) { 
        const data = res.body.currently
        const weatherSummary = res.body.daily.data[0].summary
        log(weatherSummary)
    } else if(res.body.error) {
        log('Request error')
    } else {
        log(err)
    }
})

request({url: MAP_BOX_URL, json: true}, (err, res) => {
    if(err === null) {
        const features = res.body.features
        const locationCoordinate = features[0].center

        const longitude = locationCoordinate[0]
        const latitude = locationCoordinate[1]

        log(`lon=${longitude}, lat=${latitude}`)
    } else if(res.body.error) {
        log('Not able to find location')
    } else {
        log(err)
    }
})