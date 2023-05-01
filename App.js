import {useEffect, useRef, useState} from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const searchData = useRef(null);
  const [searchText , setSearchText] = useState();
  const [imageData, setImageData] = useState([])
  useEffect(() => {
    const params = {
      method:"flickr.photos.search",
      api_key:"31a0802fce0d2746586352ecd27984a8",
      text: searchText,
      sort:"",
      per_page:40,
      license: '4',
      extras: "owner_name, license",
      format: "json",
      nojsoncallback: 1
    }
    //farm server id secret
    const parameter = new URLSearchParams(params);
    const url = `https://api.flickr.com/services/rest/?${parameter}`
    axios
    .get(url)
    .then((resp)=>{
      console.log(resp.data)
      let arr = resp.data.photos.photo.map((imgData)=>{
        return fetchFlickrImageUrl(imgData, 'q'); // q -> original size of the image
      })
      setImageData(arr)
    })
    .catch(()=>{

    })
    .finally(()=>{

    })
    
  }, [searchText])

  const fetchFlickrImageUrl = (photo, size)=>{
    // farm66.statickflikr.com/server/id_
    let url = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}`
    if(size){
      url += `_${size}`
    }
    url += `.jpg`
    return url
  }
  return (
    <div className='container'>
    <h1>SnapShot</h1>
    <input onChange={(e)=>{searchData.current = e.target.value}} /> 
    <button onClick={()=>{setSearchText(searchData.current)}}>Search</button>
    <div className='sections'>
      <button onClick={()=>{setSearchText("mountain")}}>Mountains</button>
      <button onClick={()=>{setSearchText("beaches")}}>Beaches</button>
      <button onClick={()=>{setSearchText("birds")}}>Birds</button>
      <button onClick={()=>{setSearchText("food")}}>Food</button>
      
    </div> 
    <div className='image-data-container'>
      {imageData.map((imageUrl, key)=>{
        return(
          <div className='images'>
            <img src={imageUrl} key={key} />
          </div>
        )
      })}
    </div>
    </div>
  );   
}

export default App;
