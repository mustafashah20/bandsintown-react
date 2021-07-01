import React from "react";
import moment from "moment";

const EventDetailCard = ({ country, city, venue, date }) => {
    return (
        <div className="col-xs-12 col-sm-12 col-md-4 p-2 ">
            <div className="card h-100 my-card my-card-anim">
                <div className="card-body">
                    <div className="row p-2 card-title-row">
                        <div className="col-md-12">
                            <h6 className="card-title">EVENT DETAILS</h6>
                            <hr />
                        </div>
                    </div>
                    <div className="row p-2 card-body-row">
                        <div className="col-6">
                            <div className="row">
                                <div className="col h6">Country</div>
                            </div>
                            <div className="row">
                                <div className="col">{country}</div>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="row">
                                <div className="col h6">City</div>
                            </div>
                            <div className="row">
                                <div className="col">{city}</div>
                            </div>
                        </div>
                    </div>
                    <div className="row p-2 card-body-row">
                        <div className="col-6">
                            <div className="row">
                                <div className="col h6">Venue</div>
                            </div>
                            <div className="row">
                                <div className="col">{venue}</div>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="row">
                                <div className="col h6">Date</div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    {moment(date).format('DD MMM, YYYY')}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EventDetailCard;