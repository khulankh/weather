let list = document.getElementById("list");
let gradus1 = document.getElementsByClassName("gradus1")[0];
let gradus = document.getElementsByClassName("gradus")[0];
let krakow0 = document.getElementsByClassName("krakow")[0];
let krakow1 = document.getElementsByClassName("krakow")[1];
let takeOn = document.getElementsByClassName("take-on")[0];
let takeOn1 = document.getElementsByClassName("take-on1")[0];
async function search() {
  list.innerHTML = "";
  let input = document.getElementById("search");
  let response = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${input.value}.json?access_token=pk.eyJ1IjoidHVydXV1dSIsImEiOiJjbDBhZW15ZHAwMGhjM2RtZjB6dnltZnhjIn0.HSb4dmJFSM2USxDkTsScDg`
  );
  let data = await response.json();
  let locations = data.features;
  for (let i = 0; i < locations.length; i++) {
    console.log(locations[i].center);
    list.innerHTML += `<p onclick='showWeather(${locations[i].center[0]}, ${locations[i].center[1]})'>${locations[i].place_name}</p>`; //Mongolia
  }
}

async function showWeather(long, lat) {
  // console.log(numb)
  let request = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${long}&cnt=1&appid=58b6f7c78582bffab3936dac99c31b25&units=metric`
  );

  const res = await request.json();
  //console.log(res)
  let dayGradus = res.list[0].temp.day;
  let nightGradus = res.list[0].temp.night;
  let sky = res.list[0].weather[0].main;
  let sky1 = res.list[0].weather[0].description;
  gradus1.innerHTML = nightGradus;
  gradus.innerHTML = dayGradus;
  takeOn.innerHTML = sky;
  takeOn1.innerHTML = sky1;
  krakow0.innerHTML = res.city.name;
  krakow1.innerHTML = res.city.name;
}
