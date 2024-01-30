import { useEffect, useState } from 'react'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import './App.css'

function AppNoComponents() {

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
    setSearchTerm(e.target.value);
  }

  console.log(channels);

  // fake "loading" boolean to display skeleton when 'loading' is true
  const [loading, setLoading] = useState(false);

  useEffect( () => {
    const timeout = setTimeout( () => {
      setLoading(false); // after(!!) timeout period loading is set to false
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
      {/* hej
      <Skeleton count={5}></Skeleton> */}
      <div>
        <label htmlFor="search">Search</label>
        <input value={searchTerm} type="text" id='search' onChange={handleSearchTerm}/>

        <div className='channels-container'>
        {
        /*   kanske length === 0 och searchTerm är inte tom så visas skeleton? Laddar fram data...? */
          /* filteredChannels.length === 0 && searchTerm != "" ? ( */
          loading ? (
          <Skeleton count={5} />
          ) : (
          filteredChannels.map ( (channel)  => {  /* List  */
            console.log(channel.liveaudio.url); /* Item */
            return (
               <div className='channel-container' style={{backgroundColor: "#" + channel.color}} key={channel.id}>  
              <img className='channel-image' src={channel.image} alt={"image for channel id " + channel.id + " could not load."} />
              <div className='nameAndaudio-container'>

                <div className='channel-name-container'>
                  <h2>{channel.name}</h2>
                </div>

                <audio className='audio-element' type="audio/mp3" controls="true" src={channel.liveaudio.url}></audio>
              </div>
            </div>
            )
          }) )
        }
        </div>
        
      </div>

          {/* all channels */}
       <div>
        {channels.length === 0 ? (
          // Render Skeleton while "loading"
          <Skeleton count={5} />
        ) : (
          // Render channels
          channels.map( (channel) => {
            // console.log(channel.liveaudio.url);
            return ( 
            <div>
              <span key={channel.id}>{channel.name}</span> 
              <audio className='audio-element' type="audio/mp3" controls="true" src={channel.liveaudio.url}></audio>
            </div>
            )
          }) 
        )}
      </div> 
 
    </div>
    
    </>
  )
}

export default AppNoComponents
