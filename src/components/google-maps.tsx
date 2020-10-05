import React, { ComponentClass } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap } from 'react-google-maps';

const GoogleMapComponent: ComponentClass<any, any> = withScriptjs(
  withGoogleMap(
    (props: any): React.ReactElement => (
      <GoogleMap
        center={{ lat: 43.569134, lng: -88.943925 }}
        zoom={15}
        clickableIcons={false}
        defaultOptions={{
          streetViewControl: false,
          scaleControl: false,
          mapTypeControl: false,
          panControl: false,
          zoomControl: false,
          rotateControl: false,
          fullscreenControl: false
        }}
      />
    )
  )
);

export default GoogleMapComponent;
