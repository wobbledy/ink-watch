import React from 'react';
import GoogleMapReact from 'google-map-react';
import LocationPin from '../LocationPin';



const GoogleMaps = ({ location, zoomLevel }) => (
    <div className="map">
      <h2 className="map-h2">Come Visit Us At Our Campus</h2>
  
      <div className="google-map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: `${process.env.GOOGLE_MAPS_API}` }}
          defaultCenter={location}
          defaultZoom={zoomLevel}
        >
          <LocationPin
            lat={location.lat}
            lng={location.lng}
            text={location.address}
          />
        </GoogleMapReact>
      </div>
    </div>
  )

export default GoogleMaps;