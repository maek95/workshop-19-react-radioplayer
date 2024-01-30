import './App.css'

export default function Channel(props) {
  

  const { id, name, image, color, liveaudio } = props.channel;

  return (
    
    <li key={id}>
  
      {console.log('Props received in Channel component:', props)}
      <div className='channel-container' style={{backgroundColor: "#" + color}} >  
        <img className='channel-image' src={image} alt={"image for channel id " + id + " could not load."} />
        <div className='nameAndaudio-container'>

          <div className='channel-name-container'>
            <h2>{name}</h2>
          </div>

          <audio className='audio-element' type="audio/mp3" controls="true" src={liveaudio.url}></audio>

        </div>
      </div>
    </li>
  )
}