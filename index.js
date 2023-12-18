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
  forecast_data(response.data.city);
  Change_bg(response.data.condition.description) ;
  
 
}
function Change_bg(des){
  let updateBG=document.querySelector("#all");
  if(des=="few clouds"){
    updateBG.style.background= "linear-gradient(180.3deg, rgb(110, 136, 161) 5.5%, rgb(221, 221, 221) 90.2%)";
  }
}
function formatDate(date){
  
  let hour=date.getHours();
  let minute= date.getMinutes();
  let days=["Sunday","Monday", "Tuesday","Wednesday","Thursday","Friday","Saturday"];
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
  
  function Date_Format(timestamp){
    let date1=new Date(timestamp * 1000);
    let days1=[ "Mon", "Tue","Wed","Thurs","Fri","Sat", "Sun"];
    return days1[date1.getDay()];

  }
  function forecast(response){
 
    //let days=["Tue","Wed","Thurs","Fri","Sat"];
    let forecast_html="";
    response.data.daily.forEach(function(day,index){
      if(index<5){
      forecast_html=forecast_html+ `   <div class="weather_forecast1">
      <div class="forecast_day"> ${Date_Format(day.time)} </div>
      <img src="${day.condition.icon_url}" class="forecast_icon">
      <div class="weather_temp">
      <div class="forecast_temp_max"> <strong> ${Math.round(day.temperature.maximum)}° </strong></div>
      <div class="forecast_temp_min">  ${Math.round(day.temperature.minimum)}° </div>
    </div>
    </div>
    `;
      }
    });
    let forecast_element=document.querySelector("#forecast");
  forecast_element.innerHTML=forecast_html;
  }
  function forecast_data(city){
    let apiKey="6e08c92a3e7709389fe54b43c09eo88t";
    let apiURL=`https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    console.log(apiURL);
    axios.get(apiURL).then(forecast);
  }


 
