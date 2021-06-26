import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import { BsChevronLeft } from "react-icons/bs";
const ArtistEvents = (props) => {

    const location = useLocation();
    const history = useHistory();
    const [artist, setArtist] = useState(null);

    useEffect(() => {
        setArtist(location.state.artist)
     }, [location]);

    const backClickHandler = () => {
        history.goBack();
    }

    return ( 
        <div className="container">
            <div className="row mb-3">
                <div className="col-auto my-auto p-0">
                    <span onClick={backClickHandler}>
                        <BsChevronLeft className="back-icon"/>
                    </span>    
                </div>
                <div className="col my-auto ps-0">
                    <span className="back-text" onClick={backClickHandler}>Back to Search</span>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col-auto ps-4 pe-4 artist-banner">
                    {
                        artist &&
                        <div className="row">
                            <div className="col-auto p-2">
                                <img src={artist.thumb_url} alt="artist thumbnail" className="artist-image"/>
                            </div>
                            <div className="col my-auto p-2">
                                <div className="row">
                                    <div className="col">
                                        <h3>
                                            {artist.name}
                                        </h3>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <a className="h5 facebook-link long-text" href= {artist.facebook_page_url}>
                                            {artist.facebook_page_url}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
            <div className="row mb-3">
                <div className="col p-0">
                    {
                        artist &&
                        <p className="h5">
                            {artist.upcoming_event_count} up coming events
                        </p>
                    }
                </div>
            </div>
        </div>
     );
}
 
export default ArtistEvents;


// facebook_page_url: "http://www.facebook.com/1666357743639455"
// id: "76765"
// image_url: "https://photos.bandsintown.com/large/7349968.jpeg"
// mbid: "19ccb0f4-f511-4c39-8f39-fb22ffef02b9"
// name: "John"
// options: {display_listen_unit: false}
// support_url: ""
// thumb_url: "https://photos.bandsintown.com/thumb/7349968.jpeg"
// tracker_count: 6148
// upcoming_event_count: 28
// url: "https://www.bandsintown.com/a/76765?came_from=267&app_id=12345"