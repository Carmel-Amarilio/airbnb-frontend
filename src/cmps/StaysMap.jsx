import React, { useState } from "react";
import GoogleMapReact from 'google-map-react';
import { StayModal } from "./StayModal";

export function StaysMap({ stays, onLike, loggedinUser}) {
    const [selectedStay, setSelectedStay] = useState({});

    const defaultProps = {
        center: {
            lat: stays[0].lat,
            lng: stays[0].lng
        },
        zoom: 14
    };

    const AnyReactComponent = ({ text, stay }) =>
        <div className={`stay-price-icon ${selectedStay._id === stay._id ? 'selected' : ''}`} onClick={() => setSelectedStay(stay)}>
            <p>{text}</p>
        </div>

    return (
        <article className="stay-map">
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyATDxgaZ8l4WmEcri_46uqKk-1T_M7QCA0" }}
                center={stays[0].loc}
                defaultZoom={defaultProps.zoom}
            >
                {stays.map(stay =>
                    <AnyReactComponent
                        key={stay._id}
                        lat={stay.loc.lat}
                        lng={stay.loc.lng}
                        text={`₪${stay.price}`}
                        stay={stay}
                    />
                )}

            </GoogleMapReact>

            {selectedStay._id && <StayModal stay={selectedStay} onLike={onLike} loggedinUser={loggedinUser} setSelectedStay={setSelectedStay} />}
        </article>
    );
}