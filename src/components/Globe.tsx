import React, { useCallback, useEffect, useState } from 'react'
// import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import { APIProvider, MapMouseEvent } from '@vis.gl/react-google-maps';
// import { Marker3DElement } from '@vis.gl/react-google-maps';
// import ControlPanel from './control-panel';
// import {MiniMap} from './minimap';

import { Map3D, Map3DCameraProps } from './map-3d';
import { MiniMap } from './map-3d/minimap';
import { Map3DMarker } from './map-3d/map-3d-marker';
// import { Map3DMarker } from './map-3d/map-3d-marker';

interface GlobeProps {
  userLocation: { lat: number; lon: number } | null
}

const API_KEY =
  globalThis.GOOGLE_MAPS_API_KEY ?? (process.env.GOOGLE_MAPS_API_KEY as string);

const INITIAL_VIEW_PROPS = {
  center: { lat: 37.72809, lng: -119.64473, altitude: 1300 },
  range: 5000,
  heading: 61,
  tilt: 69,
  roll: 0
};

const Globe: React.FC<GlobeProps> = () => {

  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [viewProps, setViewProps] = useState(INITIAL_VIEW_PROPS);

  const handleCameraChange = useCallback((props: Map3DCameraProps) => {
    setViewProps(oldProps => ({ ...oldProps, ...props }));
  }, []);

  const handleMapClick = useCallback((ev: MapMouseEvent) => {
    if (!ev.detail.latLng) return;

    const { lat, lng } = ev.detail.latLng;
    setViewProps(p => ({ ...p, center: { lat, lng, altitude: 0 } }));
  }, []);

  const geoOptions = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0
  };
  const successCallback = (position: GeolocationPosition) => {
    const { latitude, longitude, accuracy } = position.coords;
    console.log(`Browser Geolocation - Lat: ${latitude}, Lng: ${longitude}, Accuracy: ${accuracy}m`);
    updateLocation(latitude, longitude);
  };

  const errorCallback = (error: GeolocationPositionError) => {
    console.error("Error getting user location:", error);
    fetchGoogleGeolocation();
  };

  const fetchGoogleGeolocation = () => {
    const googleGeolocationEndpoint = `https://www.googleapis.com/geolocation/v1/geolocate?key=${API_KEY}`;

    fetch(googleGeolocationEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ considerIp: true })
    })
      .then(response => response.json())
      .then(data => {
        console.log('Google Geolocation - Lat:', data.location.lat, 'Lng:', data.location.lng, 'Accuracy:', data.accuracy);
        updateLocation(data.location.lat, data.location.lng);
      })
      .catch(error => console.error('Error with Google Geolocation:', error));
  };

  const updateLocation = (lat: number, lng: number) => {
    setUserLocation({ lat, lng });
    setViewProps(prev => ({
      ...prev,
      center: { lat, lng, altitude: prev.center.altitude }
    }));
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback, geoOptions);
    } else {
      console.log("Geolocation is not supported by this browser.");
      fetchGoogleGeolocation();
    }
  }, []);

  if (!userLocation) {
    return <div>Loading map...</div>;
  }

  return (
    <div className="w-full h-screen flex bg-black text-white">
      <div className="w-1/6 bg-black">
        {/* Left sidebar content */}
      </div>
      <div className="w-4/6 flex items-center justify-center">
        <div className="w-full h-full">
          <APIProvider apiKey={API_KEY} version='alpha' libraries={['marker']}>
            <Map3D
              {...viewProps}
              onCameraChange={handleCameraChange}
              defaultLabelsDisabled
            >
              {/* <AdvancedMarker position={userLocation}>
                <PinMarker scale={0.5} />
              </AdvancedMarker> */}
              <Map3DMarker position={userLocation} />
              {/* {userLocation && <Map3DMarker position={userLocation} />} */}
            </Map3D>
            <MiniMap camera3dProps={viewProps} onMapClick={handleMapClick} />
          </APIProvider>
        </div>
      </div>
      <div className="w-1/6 bg-black">
        {/* Right sidebar content */}
      </div>
    </div>
  );
}

export default Globe