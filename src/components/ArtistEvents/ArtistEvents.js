import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router';
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

    // Use Effect hook to get get the artist data from parent component.
    // Fetches artist JSON from local storage if last searched artist is similar.
    // Saves the artist JSON to local storage if new artist is fetched.
    useEffect(() => {
        const data = localStorage.getItem('artist');
        if (data) {
            const artistJSON = JSON.parse(data);
            if (location.state.artist.name === artistJSON.name) {
                setArtist(artistJSON)
                setNewArtist(false);
                console.log(artist);
            }
            else {
                setArtist(location.state.artist);
            }
        }
        else {
            setArtist(location.state.artist);
        }
    }, [location]); // eslint-disable-line react-hooks/exhaustive-deps


    // Use Effect hook to get the artist's events data .
    // Fetches artist-events JSON from local storage if last searched artist is similar.
    // Saves the artist-events JSON to local storage if new artist is fetched.
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

    //method for storing the artist JSON in local storage.
    const saveArtist = () => {
        localStorage.setItem('artist', JSON.stringify(artist))
    }

    //Use Effect hook for storyig the artist-events JSON in local storage.
    //This hook is triggered when events state is changed.
    useEffect(() => {
        if (events && newArtist) {
            localStorage.setItem('artist-events', JSON.stringify(events))
        }
    }, [events]); // eslint-disable-line react-hooks/exhaustive-deps

    //method to route to previous page.
    const backClickHandler = () => {
        history.replace('/');
    }

    //Method for fetching the events of the artist from api.
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
                        deleteButton={false}
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