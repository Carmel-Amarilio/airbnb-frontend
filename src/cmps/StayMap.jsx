import React, { useState } from "react";
import GoogleMapReact from 'google-map-react';
 
export function StayMap({ loc }) {
    // const [location, setLocation] = useState({ lat: loc.lat, lng: loc.lng })
    const [zoom, setZoom] = useState(14)

    const defaultProps = {
        center: {
            lat: loc.lat,
            lng: loc.lng
        },
        zoom: 14
    };

    const AnyReactComponent = () =>
        <div className="stay-icon" style={{ padding: `${(zoom - 12) * (zoom - 12) * 10}px` }}>
            <i className="fa-solid fa-house"></i>
        </div>;

    return (
        <article className="stay-map">
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyATDxgaZ8l4WmEcri_46uqKk-1T_M7QCA0" }}
                center={loc}
                defaultZoom={defaultProps.zoom}
                onChange={(pac) => setZoom(pac.zoom)}
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