import { useEffect, useState } from 'react'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import './App.css'
import Channel from './Channel';

function App() {

  const [channels, setChannels] = useState([]); // funkade inte att ha tom-sträng som default value!!!
  const [searchTerm, setSearchTerm] = useState("");

  async function getChannels() {
    try {
      const response = await fetch("https://api.sr.se/api/v2/channels?format=json&size=100");
      const data = await response.json();
      setChannels(data.channels);
    } catch(error) {
      console.log(error);
    }
   // console.log(data);
    // console.log(channels); // har inte hunnit få datan här..?
  }
  
  useEffect( () => {
    getChannels();
    
  }, [])
  //getChannels();

  function handleSearchTerm(e) {
    const value = e.target.value; // Trim whitespace from both ends

    setSearchTerm(value);
  }

  // console.log(channels);

  // fake "loading" boolean to display skeleton when 'loading' is true
  const [loading, setLoading] = useState(false);

  useEffect( () => {
    const timeout = setTimeout( () => {
      setLoading(false); // 'loading' is set to false after 1 second
    }, 1000); 
    setLoading(true);

    return () => clearTimeout(timeout);
  }, [searchTerm])

  const filteredChannels = channels.filter(channel => {
   // console.log(channel.liveaudio.url);
    return channel.name.toLowerCase().includes(searchTerm.toLowerCase()) && searchTerm != ""; // returnera hela objektet (item) där name matchar!
  })
  // skapa en list med filteredChannels som liknar forEach i tidigare workshop?

  return (
    <>
      <div>
        <div className='search-container'>
          <label htmlFor="search">Search</label>
          <input value={searchTerm} type="text" id='search' onChange={handleSearchTerm}/>
        </div>
        
        <div className='channels-container'>
        {
          loading ? (
          <Skeleton className='skeleton' height={"300px"} count={3} />
          ) : (
            <ul> 
              {filteredChannels.map ( (channel)  => { 
                return <Channel key={channel.id} channel={channel}/>
              })} 
            </ul>
          )
        }
        </div>
      </div>
    
    </>
  )
}

export default App
