import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { FaStar } from "react-icons/fa";
import axios from 'axios'
import Register from './components/Register'
import Login from './components/Login'

// Leaflet marker icon fix
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})


const App = () => {
  const myStorage = window.localStorage;
  const [pins, setPins] = useState([])
  const [newPlace, setNewPlace] = useState(null);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [rating, setRating] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);
  const [openRegister, setOpenRegister] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  useEffect(() => {
    const getPins = async () => {
      try{
        const res = await axios.get('/api/pins')
        setPins(res.data.pins || [])
        console.log(res.data.pins)
      } catch (err) {
        setPins([])
      }
    }
    getPins()
  }, [])

  // Sayfa yüklendiğinde localStorage'dan user'ı al
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        setCurrentUser(JSON.parse(user));
      } catch (error) {
        // Eski format varsa localStorage'ı temizle
        localStorage.removeItem('user');
        console.log('Invalid user data in localStorage, cleared');
      }
    }
  }, [])

  function MapClickHandler({ onDoubleClick }) {
    useMapEvents({
      dblclick: (e) => onDoubleClick(e)
    });
    return null;
  }

 const handleSubmit = async (e) => {
  e.preventDefault();
  const newPin = {
    username: currentUser.username, 
    title, 
    desc, 
    rating: Number(rating), 
    lat: newPlace.lat, 
    long: newPlace.long
  }
  
  try{
    const res = await axios.post('/api/pins', newPin)
    setPins([...pins, res.data.pin])
    setNewPlace(null)
    setTitle('')
    setDesc('')
    setRating(0)
  } catch (err) {
    console.log('Error:', err)
  }
 }

  return (
    <MapContainer 
      center={[newPlace?.lat || 45, newPlace?.long || 10]} 
      zoom={4} 
      style={{width: '100vw', height: '100vh'}}
    >
      <MapClickHandler onDoubleClick={
        (e) => {
          setNewPlace({
            lat: e.latlng.lat,
            long: e.latlng.lng,
          })
        }
      } />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {pins.map((p, index)=> {
        return (
          <Marker key={p._id || index} position={[p.lat, p.long]}>
            <Popup>
              <div className='card'>
                <label>Place</label>
                <h4 className='place'>{p.title}</h4>
                <label>Review</label>
                <span className='description'>{p.desc}</span>
                <label>Rating</label>
                <div className="stars">
                  {Array.from({length: 5}).map((_, index)=> (
                    <FaStar key={index} className='star' color={index < p.rating ? 'gold' : 'gray'}/>
                  ))}

                </div>
                <label>Information</label>
                  <span className="username">Created by <b>{p.username}</b></span>
                  <span className="date">{new Date(p.createdAt).toLocaleDateString()}</span>
              </div>
            </Popup>
          </Marker>
                );
      })}
{newPlace && (
  <Marker position={[newPlace.lat, newPlace.long]}>
    <Popup>
    <div className='card'>
                <form onSubmit={handleSubmit}>
                <label>Place</label>
                <input type='text' placeholder='Enter a title' value={title} onChange={(e) => setTitle(e.target.value)}/>
                <label>Review</label>
                <textarea placeholder='Say something about this place' value={desc} onChange={(e) => setDesc(e.target.value)}/>
                <label>Rating</label>
                <select value={rating} onChange={(e) => setRating(e.target.value)}>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>  
                </select>
                
                  <button className='submitButton' type='submit' >Add Pin</button>
                </form>
              </div>
    </Popup>
  </Marker>
)}
{currentUser ? (
  <button className='logout button' onClick={() => {
    myStorage.removeItem("user");
    setCurrentUser(null);
  }}>Log Out</button>
) : (
  <div className='buttons'>
    <button className='login button' onClick={() => setOpenLogin(true)}>Log In</button>
<button className='register button' onClick={() => setOpenRegister(true)}>Register</button>
</div>
)}
<Register open={openRegister} setOpen={setOpenRegister} />
<Login open={openLogin} setOpen={setOpenLogin} setCurrentUser={setCurrentUser}/>
    </MapContainer>
  )
}

export default App