function search_handle(event) {
    event.preventDefault();
    let s_bar = document.querySelector("#search_bar");
    let city = document.querySelector("#city");
    city.innerHTML = s_bar.value;
  }
  let search = document.querySelector("#search_form");
  search.addEventListener("click", search_handle);
  