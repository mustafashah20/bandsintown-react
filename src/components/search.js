import React, { useState } from 'react'
import { BsSearch } from "react-icons/bs";

const Search = () => {

    const [inputVal, setInputVal] = useState('')
    const [name, setName] = useState('')
    const [eventCount, setEventCount] = useState('')

    const handleInputChange = (e) => {
        setInputVal(e.target.value)
    }

    const handleSubmit = (e) => {
        if(e.keyCode === 13){
            getArtist()
        }
    }

    //`https://rest.bandsintown.com/artists/${ inputVal }?app_id=12345`

    //`http://localhost:3005/artist?name=${inputVal}`

    //`https://www.bandsintown.com/searchSuggestions?searchTerm=${inputVal}`

    //`http://localhost:3005/search?name=${inputVal}`

    const getArtist = () => {
        try {
            fetch(`https://rest.bandsintown.com/artists/${inputVal}?app_id=12345`).then(
            (response) => response.json().then(
              (data) => {
                console.log(data)
                setName(data.name)
                setEventCount(data.upcoming_event_count)
              }
            )
          )
          } catch (error) {
            console.log(error)
          }
    }
    

    return (  
        <div>
            <div className="input-group shadow-sm mt-5">
                <input type="text" 
                    className="form-control my-input" 
                    placeholder="Search Artist" 
                    aria-label="artist" 
                    aria-describedby="basic-addon1"
                    onChange={handleInputChange}
                    onKeyDown={handleSubmit}
                    />

                <span className="input-group-text my-input-icon" id="basic-addon1">
                    <BsSearch className="my-icon"/>
                </span>
                
            </div>
            {
                name!=='' && <p className="display-5">Artist: {name}</p>
            }
            {
                eventCount!=='' &&  <p className="display-5">Event Count: {eventCount}</p>
            }
        </div>
    );
}
 
export default Search;