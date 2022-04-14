import * as React from 'react';
import { useEffect, useState} from 'react'
import Map, {Marker, Popup } from 'react-map-gl';
import { Room, Star } from '@mui/icons-material';
import './app.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios';
import {format} from "timeago.js";

function App() {
  const [pins, setPins] = useState([])
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
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

  const handleMarkerClick = (id) => {
    setCurrentPlaceId(id);
    
  };

  return (
    <div>  
        <Map
          // initialViewState={{
          //   longitude: 17,
          //   latitude: 46,
          //   zoom: 4
          // }}
          {...viewport}
          onMove={evt => setViewport(evt.viewport)}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          style={{width: "100vw", height: "100vh"}}
          mapboxAccessToken={process.env.REACT_APP_MAPBOX}
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
              color: "slateblue",
              cursor: "pointer" }}
            onClick={()=>handleMarkerClick(p._id)} 
            
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
        <Star className='star'/>
        <Star className='star'/>
        <Star className='star'/>
        <Star className='star'/>
        <Star className='star'/>
        </div>
        <label>Information</label>
        <span className="username">Created by <b>{p.username}</b></span>
        <span className="date">{format(p.createdAt)}</span>
        </div>
      </Popup>
      )}
      </>
      ))}
        </Map>
     </div>
  );
}

export default App;
