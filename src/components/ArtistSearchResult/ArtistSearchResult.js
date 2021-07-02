import React from 'react'
import { useHistory } from 'react-router-dom';
import * as api from '../../api/artistApi'

const ArtistSearchResult = ({ thumbnailSrc, artistName }) => {

    const history = useHistory();

    //Click handler for artist search result.
    //Routes to artist's event page.
    //Passes the artist JSON to the child component through state.
    const artistClickHandler = (name) => {
        api.getArtist(name).then(
            (data) => {
                history.push({
                    pathname: '/event',
                    state: { artist: data }
                })
            }
        );
    }

    return (
        <div to='event' className="artist-search-container" onClick={() => artistClickHandler(artistName)}>
            <div className="artist-thumbnail">
                <img src={thumbnailSrc} alt="artist thumbnail" />
                <h4 className="artist-name">
                    {artistName}
                </h4>
            </div>
        </div>
    );
}

export default ArtistSearchResult;
