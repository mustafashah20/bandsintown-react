import React from "react";
import { ImFacebook2 } from 'react-icons/im'

const ArtistBanner = ({ thumbnailURL, artistName, facebookUrl }) => {
    return (
        <div className="col-xs-12 col-sm-12 col-md-12 p-2 ">
            <div className="card my-card">
                <div className="card-body">
                    <div className="row align-items-center">

                        <div className="col-xs-12 col-sm-12 col-md-auto p-2 d-flex justify-content-center justify-content-md-start">
                            <img src={thumbnailURL} alt="artist thumbnail" className="artist-image" />
                        </div>

                        <div className="col-xs-12 col-sm-12 col-md-auto p-2">

                            <div className="row">
                                <div className="col h5 d-flex justify-content-center justify-content-md-start">
                                    {artistName}
                                </div>
                            </div>

                            <div className="row">
                                <div className="col d-flex justify-content-center justify-content-md-start">
                                    <a className="facebook-link" href={facebookUrl}>
                                        <ImFacebook2 />
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