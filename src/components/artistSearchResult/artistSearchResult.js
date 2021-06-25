import React from './react'

const ArtistSearchResult = (props) => {
    return ( 
        <div className="artist-search-container">
            <div className="artist-thumbnail">
                <img src={thumbnailSrc}/>
                <h3 className="artist-name">
                    {artistName}
                </h3>
            </div>
        </div>
     );
}
 
export default ArtistSearchResult;