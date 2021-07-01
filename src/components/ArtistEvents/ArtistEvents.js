import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import { BsChevronLeft } from "react-icons/bs";
import EventDetailCard from '../EventDetailCard/EventDetailCard';
import ArtistBanner from '../ArtistBanner/ArtistBanner';
import { MoonLoader } from 'react-spinners';
import * as api from '../../api/artistApi';

const ArtistEvents = () => {

    const location = useLocation();
    const history = useHistory();
    const [artist, setArtist] = useState(null);
    const [events, setEvents] = useState(null);
    const [newArtist, setNewArtist] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const data = localStorage.getItem('artist');
        if (data) {
            const artistJSON = JSON.parse(data);
            if (location.state.artist.name === artistJSON.name) {
                setArtist(artistJSON)
                setNewArtist(false);
            }
            else {
                setArtist(location.state.artist);
            }
        }
        else {
            setArtist(location.state.artist);
        }
    }, [location]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (artist) {
            saveArtist();
        }
        const data = localStorage.getItem('artist-events');
        if (data) {
            if (!newArtist) {
                const EventsJSON = JSON.parse(data);
                setEvents(EventsJSON);
                setIsLoading(false);
            }
            else {
                getEventDetails();
            }
        }
        else {
            getEventDetails();
        }
    }, [artist]); // eslint-disable-line react-hooks/exhaustive-deps

    const saveArtist = () => {
        localStorage.setItem('artist', JSON.stringify(artist))
    }

    useEffect(() =>{
        if(events && newArtist){
            localStorage.setItem('artist-events', JSON.stringify(events))
        }
    },[events]);

    const backClickHandler = () => {
        history.goBack();
    }

    const getEventDetails = () => {
        if (artist) {
            setIsLoading(true);
            api.getArtistEvent(artist.name).then(
                (data) => {
                    setEvents(data);
                    setIsLoading(false);
                }
            )
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
                        <p className="h5 text-white">
                            {artist.upcoming_event_count} up coming events
                        </p>
                    }
                </div>
            </div>
            <div className="row mb-5">
                {
                    isLoading &&
                    <div className="loading-wrapper mt-5 d-flex justify-content-center">
                        <MoonLoader loading={true} color="#FFFFFF" size={30} />
                    </div>
                }
                {
                    events &&

                    events.map((event) => (
                        <EventDetailCard
                            key={event.id}
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