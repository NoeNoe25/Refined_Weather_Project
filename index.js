function UpdateWeather(response){
  let updateTemp= document.querySelector("#degree");
  updateTemp.innerHTML=Math.round(response.data.main.temp);
}
function search_city(city){
  let apiKey="995876feccff84467560f64d2dabfe70";
  let apiURL=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
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
  