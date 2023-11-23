import { useEffect, useState } from "react";
import "./App.css";

const KEY = "3daa86ed1746451faee132410231511";
export default function App() {
  const [input, setinput] = useState("");
  const [temp, settemp] = useState();
  const [inputdata, setinputdata] = useState("LONDON");
  const [location, setlocation] = useState({});

  const [image, setimage] = useState();
  const [name, setname] = useState("London");
  // console.log(country);
  function handleinput(e) {
    e.preventDefault();

    setinputdata(input);
    setinput("");
  }

  useEffect(
    function () {
      async function weather() {
        try {
          if (inputdata.length > 10)
            throw new Error("Location name too long !");
          const response = await fetch(
            `http://api.weatherapi.com/v1/current.json?key=${KEY}&q=${inputdata}&aqi=no`
          );
          if (!response.ok)
            throw new Error("No location related to search found");
          const finaldata = await response.json();

          if (finaldata.location.name.length > 10)
            throw new Error("Location name too long !");
          // console.log(finaldata.current.temp_c);
          settemp(finaldata.current.temp_c);
          setlocation(finaldata.location);
          setimage(finaldata.current.condition.icon);
          setname(finaldata.location.name);
        } catch (e) {
          alert(e);
        }
      }
      weather();
    },
    [inputdata]
  );
  return (
    <div className="App">
      <div className="infocontainer">
        <form className="search" value={inputdata} onSubmit={handleinput}>
          <input
            type="text"
            className="input"
            value={input}
            onChange={(e) => setinput(e.target.value)}
            placeholder="Search"
          />
        </form>

        <div className="details">
          <p>Country:{location.country}</p>
          <p>Latitude:{location.lat}</p>
          <p>Longitude:{location.lon}</p>
          <p>Time zone:{location.tz_id}</p>
        </div>

        {/* <div className="div">{state.name}</div> */}
      </div>

      <div className="circlecontainer">
        <div className="text">
          <h1 className="name">{name}</h1>
          <img src={image} className="image" />
        </div>
      </div>
      <h1 className="temp">{temp}°C</h1>
    </div>
  );
}
