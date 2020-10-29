window.addEventListener('load',()=>{
    let long;
    let lat;

   if(navigator.geolocation){
       navigator.geolocation.getCurrentPosition(position =>{
           let long = position.coords.longitude;
           let lat = position.coords.latitude;
           let temperatureDescription = document.querySelector('.temperature-description');
           let temperatureDegree = document.querySelector('.temperature-degree');
           let locationTimezone = document.querySelector('.location-timezone'); 
           
           const proxy = 'https://cors-anywhere.herokuapp.com/';
           const api = '${proxy}http://maps.openweathermap.org/maps/2.0/weather/{PR0}/{100}/${lat}/${long}';
           fetch(api)
           .then(response =>{
              return response.json();
          })
          .then(data =>{
              const {temperature, summary, icon} = data.currently;

              temperatureDegree.textContent = temperature;
              temperatureDescription.textContent = summary;
              locationTimezone.textContent = data.timezone;

              setIcons(icon, document.querySelector('.icon'));
          })

       });
       
   
    }
    function setIcons(icon, iconID){
        const skycons = new Skycons({color: white});
        const currentIcon = icon.replace(/-/g,"__").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});