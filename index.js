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
  Change_bg(response.data.condition.description);
  
 
}
function Change_bg(des){
  let updateBG=document.querySelector("#all");

  if(des=="rains" || des=="light rain"){
    updateBG.style.background= "linear-gradient(180.3deg, rgb(110, 136, 161) 5.5%, rgb(221, 221, 221) 90.2%)";
    updateBG.style.color= "#e0ebeb";
   
  }
  else if (des=="clear sky"){
    updateBG.style.background= "linear-gradient(180.3deg, rgb(85, 88, 218) 0%, rgb(95, 209, 249) 100.2%)";
    updateBG.style.color= "#e0ebeb";
  }
  else if (des=="broken clouds"){
    updateBG.style.background= "linear-gradient(359.3deg,  rgba(187, 187, 187, 0) 1%, rgb(196, 214, 252) 70.9%)";
    updateBG.style.color= " rgb(85, 88, 218)";
  }
  else if (des=="scattered clouds" || des=="overcast clouds"){
    updateBG.style.background= "linear-gradient(-225deg, #5D9FFF 0%, #B8DCFF 48%, #6BBBFF 100%); ";
     updateBG.style.color= " #e0ebeb";
    
  }
  else if (des=="shower rain"){
    updateBG.style.background= "linear-gradient(to bottom,  #304352 0%, #d7d2cc 100%)";
    updateBG.style.color= " #e0ebeb";
    
  }
  else if (des=="thunderstorm"){
    updateBG.style.background= "linear-gradient(to bottom, rgb(58, 28, 113), rgb(215, 109, 119), rgb(255, 175, 123))";
    updateBG.style.color= " #e0ebeb";
    
  }
  else if (des=="snow"){
    updateBG.style.background= "linear-gradient(180.3deg, #D7FFFE 0%, #FFFEFF 100%)";
    updateBG.style.color= " #407088";
  }
  else if (des=="mist"){
    updateBG.style.background= "linear-gradient(180.3deg, rgb(216, 174, 211) 45.1%, rgb(145, 130, 196) 100.2%)";
    updateBG.style.color= " #e0ebeb";
  }
  else if (des=="few clouds"){
    updateBG.style.background= "linear-gradient(-225deg, #5D9FFF 0%, #B8DCFF 48%, #6BBBFF 100%)";
    updateBG.style.color= " #38598b";
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
      <div class="forecast_day" > ${Date_Format(day.time)} </div>
      <img src="${day.condition.icon_url}" class="forecast_icon">
      <div class="weather_temp">
      <div class="forecast_temp_max" style="color:#f65282"> <strong> ${Math.round(day.temperature.maximum)}° </strong></div>
      <div class="forecast_temp_min" style="color:#ffb6b9">  ${Math.round(day.temperature.minimum)}° </div>
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


 
