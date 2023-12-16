function UpdateWeather(response){
  let updateTemp= document.querySelector("#degree");
  updateTemp.innerHTML=Math.round(response.data.temperature.current);

  let updateDes= document.querySelector("#des");
  updateDes.innerHTML=response.data.condition.description;

  let updateHumidity= document.querySelector("#humidity");
  updateHumidity.innerHTML=response.data.temperature.humidity;

  let updateWind= document.querySelector("#wind");
  updateWind.innerHTML=response.data.wind.speed;

  let updateIcon= document.querySelector("#icon");
  updateIcon.innerHTML=`<img src="${response.data.condition.icon_url}"/>`;

  let updateDate=document.querySelector("#time");
  let date= new Date(response.data.time*1000);
  updateDate.innerHTML=formatDate(date);
  
}
function formatDate(date){
  
  let hour=date.getHours();
  let minute= date.getMinutes();
  let days=["Monday", "Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
  let day= days[date.getDay()];
  return `${day} ${hour} : ${minute},`;


}

function search_city(city){
  let apiKey="6e08c92a3e7709389fe54b43c09eo88t";
  let apiURL=`https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
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
  

  function forecast(){
    let days=["Tue","Wed","Thurs","Fri","Sat"];
    let forecast_html="";
    days.forEach(function(day){
      forecast_html=forecast_html+ `   <div class="weather_forecast1">
      <div class="forecast_day"> ${day} </div>
      <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/clear-sky-day.png" class="forecast_icon">
      <div class="weather_temp">
      <div class="forecast_temp_max"> <strong> 19° </strong></div>
      <div class="forecast_temp_min"> 16° </div>
    </div>
    </div>
    `;

    });
    let forecast_element=document.querySelector("#forecast");
  forecast_element.innerHTML=forecast_html;
  }
  
  forecast();