import React from 'react'

const ArtistSearchResult = ({thumbnailSrc, artistName}) => {
    return ( 
        <div className="artist-search-container">
            <div className="artist-thumbnail">
                <img src={thumbnailSrc} alt="artist thumbnail"/>
                <h4 className="artist-name">
                    {artistName}
                </h4>
            </div>
        </div>
     );
}
 
export default ArtistSearchResult;