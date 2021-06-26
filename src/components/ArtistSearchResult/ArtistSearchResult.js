import React from 'react'
import { useHistory } from 'react-router-dom';

const ArtistSearchResult = ({ thumbnailSrc, artistName }) => {

    const history = useHistory();

    const prepareArtistQuery = (value) => {
        const url = `https://rest.bandsintown.com/artists/${value}?app_id=12345`;

        return encodeURI(url);
    }

    const artistClickHandler = (artistName) => {
        const URL = prepareArtistQuery(artistName);
        try {
            fetch(URL).then(
                (response) => response.json().then(
                    (data) => {
                        history.push({
                            pathname: '/event',
                            state: { artist: data }
                        })
                    }
                )
            )
        } catch (error) {
            console.log(error);
        }
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
