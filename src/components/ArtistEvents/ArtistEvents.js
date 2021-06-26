import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import { BsChevronLeft } from "react-icons/bs";
const ArtistEvents = (props) => {

    const location = useLocation();
    const history = useHistory();
    const [artist, setArtist] = useState(null);
    const [events, setEvents] = useState(null);

    useEffect(() => {
        setArtist(location.state.artist);
    }, [location]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        getEventDetails();
    })

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
                    <div className="col-xs-12 col-sm-12 col-md-4 p-2 ">
                        <div className="card h-100">
                            <div className="card-body">
                                <div className="row p-2 align-items-center">
                                    <div className="col-auto">
                                        <img src={artist.thumb_url} alt="artist thumbnail" className="artist-image" />
                                    </div>
                                    <div className="col-6">
                                        <div className="row">
                                            <div className="col h5">{artist.name}</div>
                                        </div>
                                        <div className="row">
                                            <div className="col">
                                                <a className="facebook-link long-text" href={artist.facebook_page_url}>
                                                    {artist.facebook_page_url}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
            <div className="row">
                {
                    events &&

                    events.map((event) => (
                        <div className="col-xs-12 col-sm-12 col-md-4 p-2 ">
                            <div className="card h-100">
                                <div className="card-body">
                                    <div className="row p-2">
                                        <div className="col-md-12">
                                            <h6 className="card-title">EVENT DETAILS</h6>
                                            <hr />
                                        </div>
                                    </div>
                                    <div className="row p-2">
                                        <div className="col-6">
                                            <div className="row">
                                                <div className="col h6">Country</div>
                                            </div>
                                            <div className="row">
                                                <div className="col">{event.venue.country}</div>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="row">
                                                <div className="col h6">City</div>
                                            </div>
                                            <div className="row">
                                                <div className="col">{event.venue.city}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row p-2">
                                        <div className="col-6">
                                            <div className="row">
                                                <div className="col h6">Venue</div>
                                            </div>
                                            <div className="row">
                                                <div className="col">{event.venue.name}</div>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="row">
                                                <div className="col h6">Date</div>
                                            </div>
                                            <div className="row">
                                                <div className="col">{event.datetime}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
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