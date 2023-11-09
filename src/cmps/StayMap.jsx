import React, { useState } from "react";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = () =>
    <div className="stay-icon">
        <i className="fa-solid fa-house"></i>
    </div>;


export function StayMap({ loc }) {
    // const [location, setLocation] = useState({ lat: loc.lat, lng: loc.lng })

    const defaultProps = {
        center: {
            lat: loc.lat,
            lng: loc.lng
        },
        zoom: 14
    };

    return (
        <article className="stay-map">
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyATDxgaZ8l4WmEcri_46uqKk-1T_M7QCA0" }}
                center={loc}
                defaultZoom={defaultProps.zoom}
            >
                <AnyReactComponent
                    lat={loc.lat}
                    lng={loc.lng}
                    text="My Marker"
                />
            </GoogleMapReact>
        </article>
    );
}