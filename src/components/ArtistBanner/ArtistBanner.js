import React from "react";
import { ImFacebook2 } from 'react-icons/im'
import { BsFillTrashFill } from 'react-icons/bs'
import { useHistory } from "react-router-dom";

const ArtistBanner = (props) => {

    const history = useHistory();

    const routeToEvents = () => {
        console.log("forward")
        history.goForward();
    }

    return (
        <div className="col-xs-12 col-sm-12 col-md-12 p-2 " onClick={routeToEvents}>
            <div className="card my-card">
                <div className="card-body">
                    <div className="row align-items-center">

                        <div className="col-xs-12 col-sm-12 col-md-auto p-2 d-flex justify-content-center justify-content-md-start">
                            <img src={props.thumbnailURL} alt="artist thumbnail" className="artist-image" />
                        </div>

                        <div className="col-xs-12 col-sm-12 col-md-auto p-2">

                            <div className="row">
                                <div className="col h3 d-flex justify-content-center justify-content-md-start">
                                    {props.artistName}
                                </div>
                            </div>

                            <div className="row">
                                <div className="col d-flex justify-content-center justify-content-md-start">
                                    <a className="facebook-link" href={props.facebookUrl}>
                                        <ImFacebook2 />
                                    </a>
                                </div>
                            </div>

                        </div>

                        {
                            props.deleteButton &&
                            <div className="col-xs-12 col-sm-12 col-md-auto ms-md-auto me-md-2 p-2 ml-auto d-flex justify-content-center justify-content-md-end">
                                <BsFillTrashFill className="delete-icon"
                                    onClick={(event) => {
                                        props.parentCallback();
                                        event.stopPropagation();
                                    }}
                                />
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ArtistBanner;