import React, { useState } from "react";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = () =>
    <div className="stay-icon">
        <i className="fa-solid fa-house"></i>
    </div>;

export function StayMap({ loc }) {
    const [location, setLocation] = useState({ lat: loc.lat, lng: loc.lng })

    const defaultProps = {
        center: {
            lat: location.lat,
            lng: location.lng
        },
        zoom: 14
    };

    return (
        <section className="stay-map">
            <h2>Where you’ll be</h2>
            <div className="map">
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyD9SpyLlVqGFhsZLgZx0X1CGlLxt0RiUxM" }}
                    center={location}
                    defaultZoom={defaultProps.zoom}
                >
                    <AnyReactComponent
                        lat={loc.lat}
                        lng={loc.lng}
                        text="My Marker"
                    />
                </GoogleMapReact>
            </div>
            <h3>{loc.address}, {loc.city}, {loc.country}</h3>
            <p>Very quiet and pleasant neighborhood</p>
        </section>
    );
}