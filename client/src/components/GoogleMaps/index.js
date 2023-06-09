import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
// import LocationPin from '../LocationPin';

const mapStyles = {
    width: '100%',
    height: '100%'
};
export class MapContainer extends Component {
    state = {

        showingInfoWindow: "False", // Hides or shows the InfoWindow 

        activeMarker: {}, // Shows the active marker upon click 

        selectedPlace: {} // Shows the InfoWindow to the selected place upon a marker
    };

    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: "True"
        });
    onClose = props => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: "False",
                activeMarker: "None"
            });
        }
    };


    render() {
        return (
            <Map
                google={this.props.google}
                zoom={14}
                style={mapStyles}
                initialCenter={
                    {
                        lat: 32.2257,
                        lng: -110.9512
                    }
                }
            />
        );
    }
}
export default GoogleApiWrapper({
    apiKey: 'YOUR_GOOGLE_MAPS_API_KEY_GOES_HERE'
})(MapContainer);