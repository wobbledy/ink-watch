import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
// import LocationPin from '../LocationPin';

const mapStyles = {
    width: '500px',
    height: '300px'
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
            >
                <Marker
                    onClick={this.onMarkerClick}
                    name={'University of Arizona'}
                />
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.onClose}
                >
                    <div>
                        <h4>{this.state.selectedPlace.name}</h4>
                    </div>
                </InfoWindow>
            </Map>
        );
    }
}
export default GoogleApiWrapper({
    apiKey: `${process.env.GOOGLE_MAPS_API}`
})(MapContainer);