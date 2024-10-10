import React, { useEffect, useState } from 'react';
import { useMapsLibrary } from '@vis.gl/react-google-maps';

interface Map3DMarkerProps {
  position: google.maps.LatLngLiteral;
}

export const Map3DMarker: React.FC<Map3DMarkerProps> = ({ position }) => {
  const [marker, setMarker] = useState<google.maps.marker.AdvancedMarkerElement | null>(null);
  const markerLibrary = useMapsLibrary('marker');

  useEffect(() => {
    if (!markerLibrary) return;

    const { AdvancedMarkerElement } = markerLibrary;
    const newMarker = new AdvancedMarkerElement({
      position,
    });

    setMarker(newMarker);

    return () => {
      if (newMarker) {
        newMarker.map = null;
      }
    };
  }, [markerLibrary, position]);

  useEffect(() => {
    if (!marker) return;

    const map3d = document.querySelector('gmp-map-3d') as google.maps.maps3d.Map3DElement;
    if (map3d) {
      marker.map = map3d.innerMap;
    }
  }, [marker]);

  return null;
};