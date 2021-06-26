import React from "react";

const ArtistBanner = ({ thumbnailURL, artistName, facebookUrl }) => {
    return (
        <div className="col-xs-12 col-sm-12 col-md-4 p-2 ">
            <div className="card h-100 my-card">
                <div className="card-body">
                    <div className="row align-items-center">

                        <div className="col-xs-12 col-sm-12 col-md-5 p-2 d-flex justify-content-center justify-content-md-start">
                            <img src={thumbnailURL} alt="artist thumbnail" className="artist-image" />
                        </div>

                        <div className="col-xs-12 col-sm-12 col-md-7 p-2">

                            <div className="row">
                                <div className="col h5 d-flex justify-content-center justify-content-md-start">
                                    {artistName}
                                </div>
                            </div>

                            <div className="row">
                                <div className="col">
                                    <a className="facebook-link" href={facebookUrl}>
                                        {facebookUrl}
                                    </a>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default ArtistBanner;