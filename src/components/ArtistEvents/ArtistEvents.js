import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import { BsChevronLeft } from "react-icons/bs";
import EventDetailCard from '../EventDetailCard/EventDetailCard';
import ArtistBanner from '../ArtistBanner/ArtistBanner';
const ArtistEvents = (props) => {

    const location = useLocation();
    const history = useHistory();
    const [artist, setArtist] = useState(null);
    const [events, setEvents] = useState(null);

    useEffect(() => {
        setArtist(location.state.artist);
        getEventDetails();
    }, [location]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        
    }, []) // eslint-disable-line react-hooks/exhaustive-deps


    const backClickHandler = () => {
        history.goBack();
    }

    const prepareEventDetailQuery = (value) => {
        const url = `https://rest.bandsintown.com/artists/${value}/events?app_id=12345`;

        return encodeURI(url);
    }

    const getEventDetails = () => {
        if (artist) {
            const URL = prepareEventDetailQuery(artist.name);
            try {
                fetch(URL).then(
                    (response) => response.json().then(
                        (data) => {
                            console.log(data)
                            setEvents(data);
                        }
                    )
                )
            } catch (error) {
                console.log(error);
            }
        }

    }

    return (
        <div className="container">
            <div className="row mb-3">
                <div className="col-auto my-auto p-2">
                    <span onClick={backClickHandler}>
                        <BsChevronLeft className="back-icon" />
                    </span>
                </div>
                <div className="col my-auto ps-0">
                    <span className="back-text" onClick={backClickHandler}>Back to Search</span>
                </div>
            </div>
            <div className="row mb-4">
                {
                    artist &&

                    <ArtistBanner
                        thumbnailURL={artist.thumb_url}
                        artistName={artist.name}
                        facebookUrl={artist.facebook_page_url}
                    />
                }
            </div>
            <div className="row">
                <div className="col p-2">
                    {
                        artist &&
                        <p className="h5">
                            {artist.upcoming_event_count} up coming events
                        </p>
                    }
                </div>
            </div>
            <div className="row mb-5">
                {
                    events &&

                    events.map((event) => (
                        <EventDetailCard
                            
                            country={event.venue.country}
                            city={event.venue.city}
                            venue={event.venue.name}
                            date={event.datetime} 
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default ArtistEvents;