const btn = document.querySelector('button')
const text = document.querySelector('.title-text')
const locationText = document.querySelector('.location-text')
locationText.style.visibility = 'hidden'

btn.addEventListener('click', () => {
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess, onError)
    } else {
        btn.innerText = 'Your browser do not support geo location'
    }
})


function onSuccess(position){
    let {latitude, longitude } = position.coords
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=f9b7122401b04a59aaf3f79b2091cd16`)
    .then(response => response.json())
    .then(result => {
        // fetching data
        let userLocation = result.results[0].components
        let {country, postcode, state, road, city_district} = userLocation

        // updating HTML elements when location is enabled
        btn.innerHTML = `Location detected successfully`
        btn.style.backgroundColor = '#00BA9E'
        btn.disabled = true
        text.innerText = `Rescue is on the way!`

        // Creating the div where the location is displayed
        locationText.classList.add('styles')
        locationText.innerHTML = `${state}, ${country}<br>${postcode} ${city_district} ${road}`
        locationText.style.visibility = 'visible'
    })
}

function onError(error){
    if (error.code == '1'){
        btn.innerText = 'User denied Geo Location'
        btn.style.backgroundColor = '#FF7575'
    } else if (error.code == '2'){
        btn.innerText = 'Position unavailable'
    } else {       
        btn.innerText = 'Something went wrong !'
    }
}