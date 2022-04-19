import * as React from 'react';
import { useEffect, useState} from 'react'
import Map, {Marker, Popup } from 'react-map-gl';
import { Room, Star } from '@mui/icons-material';
import './app.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios';
import {format} from "timeago.js";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  const myStorage = window.localStorage;
  const [currentUser, setCurrenUser] = useState(null);
  const [pins, setPins] = useState([])
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [rating, setRating] = useState(0);
  const [showRegister, setShowRegister] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [viewport, setViewport] = useState({
    longitude: 17.071727,
    latitude: 47.040182,
    zoom: 4
  });

  useEffect(() => {
    const getPins = async ()=>{
      try{
        const res = await axios.get("/pins");
        setPins(res.data)
      }catch(err){
        console.log(err)
      }
    };
    getPins()
  },[])

  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id); 
    setViewport({...viewport, latitude:lat, longitude: long})   
  };

  const handleAddClick = (e) => {
    console.log(e);
    const [longitude, latitude] = e.lngLat;
    setNewPlace({
      long: longitude,
      lat: latitude,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      username: currentUser,
      title,
      desc,
      rating,
      lat: newPlace.lat,
      long: newPlace.long
    }

    try{
      const res = await axios.post("/pins", newPin)
      setPins ([...pins, res.data]);
      setNewPlace(null);

    }catch(err){
      console.log(err)
    }
  };

  const handleLogout = () => {
    myStorage.removeItem("user");
    currentUser(null);
  }

  return (
    <div>  
        <Map

          {...viewport}
          onMove={evt => setViewport(evt.viewport)}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          style={{width: "100vw", height: "100vh"}}
          mapboxAccessToken={process.env.REACT_APP_MAPBOX}
          onDblClick = {handleAddClick}
          transitionDuration="1000"
        >
        {pins.map(p=>(
      <> 
          <Marker 
          longitude={p.long} 
          latitude={p.lat} 
          // offsetLeft={-3.5 }
          // offsetTop={-7}
          >
          <Room 
            sx={{ 
              fontSize: 40, 
              color: p.username ===currentUser ? "tomato" : "slateblue",
              cursor: "pointer" }}
            onClick={()=>handleMarkerClick(p._id, p.lat, p.long)} 
            
          />
        </Marker>
        {p._id === currentPlaceId && (
        <Popup
          latitude={p.lat}
          longitude={p.long}
          closeButton={true}
          closeOnClick={false}
          closeOnMove={true}
          anchor="left"
        >
        <div className="card">
        <label>Place</label>
        <h4 className="place">{p.title}</h4>
        <label>Review</label>
        <p className='desc'>{p.desc}</p>
        <label>Rating</label>
        <div className="stars">
          {Array(p.rating).fill(<Star className='star'/>)}
        </div>
        <label>Information</label>
        <span className="username">Created by <b>{p.username}</b></span>
        <span className="date">{format(p.createdAt)}</span>
        </div>
      </Popup>
      )}
      </>
      ))}
      {newPlace && ( 
       <Popup
          latitude={newPlace.lat}
          longitude={newPlace.long}
          closeButton={true}
          closeOnClick={false}
          closeOnMove={true}
          // onClose={() => setNewPlace(null)}
          anchor="left"
        >
          <div>
            <form onSubmit={handleSubmit}>
              <label>Title</label>
              <input placeholder="Enter a title" onChange={(e)=>setTitle(e.target.value)} />
              <label>Review</label>
              <textarea placeholder="Write somenting about this place." onChange={(e)=>setDesc(e.target.value)}/>
              <label>Rating</label>
              <select onChange={(e)=>setRating(e.target.value)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <button className="submitButton" type="submit">Add Pin</button>
            </form>
          </div>
          </Popup>
        )}
        {currentUser ? (
          <button className="button logout" onClick={handleLogout}>Logout</button>
        ) : (        
          <div className="buttons"> 
              <button 
                className="button login" 
                onClick={()=> setShowLogin(true)}
              >
                Login
              </button>
              <button 
                className="button register" 
                onClick={()=> setShowRegister(true)}
              >
                Register
              </button>
          </div>
        )}
        {showRegister && <Register setShowRegister={setShowRegister} />}
        {showLogin && <Login setShowLogin={setShowLogin} myStorage={myStorage} setCurrenUser={setCurrenUser} /> }
        </Map>
     </div>
  );
}

export default App;
