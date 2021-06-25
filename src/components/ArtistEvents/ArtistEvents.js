import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

const ArtistEvents = (props) => {

    const location = useLocation();
    const [artist, setArtist] = useState(null);

    useEffect(() => {
        setArtist(location.state.artist)
     }, [location]);

    return ( 
        <div>
            { artist && 
                <p className="display-5">
                    This is {artist.name} Information
                </p>
            }
        </div>
     );
}
 
export default ArtistEvents;