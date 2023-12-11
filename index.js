function UpdateWeather(response){
  let updateTemp= document.querySelector("#degree");
  updateTemp.innerHTML=Math.round(response.data.main.temp);
  let updateDes= document.querySelector("#des");
  updateDes.innerHTML=response.data.weather[0].description;
  let updateHumidity= document.querySelector("#humidity");
  updateHumidity.innerHTML=response.data.main.humidity;
  let updateWind= document.querySelector("#wind");
  updateWind.innerHTML=response.data.wind.speed;
  let updateIcon= document.querySelector("#icon");
  updateIcon.innerHTML=response.data.weather[0].icon;
}
function search_city(city){
  let apiKey="995876feccff84467560f64d2dabfe70";
  let apiURL=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  console.log(apiURL);
  axios.get(apiURL).then(UpdateWeather);
}
function search_handle(event) {
    event.preventDefault();
    let s_bar = document.querySelector("#search_bar");
    let city = document.querySelector("#city");
    city.innerHTML = s_bar.value;
    search_city(s_bar.value);
  }
  let search = document.querySelector("#search_form");
  search.addEventListener("click", search_handle);
  