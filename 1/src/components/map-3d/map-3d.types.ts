import {DOMAttributes, RefAttributes} from 'react';

// add an overload signature for the useMapsLibrary hook, so typescript
// knows what the 'maps3d' library is.
declare module '@vis.gl/react-google-maps' {
  export function useMapsLibrary(
    name: 'maps3d'
  ): typeof google.maps | null;
  // Define the Map3DMarker component
  export interface Map3DMarkerProps {
    position: google.maps.LatLngLiteral;
    icon?: string;
    label?: string;
    title?: string;
    draggable?: boolean;
    clickable?: boolean;
    visible?: boolean;
    zIndex?: number;
    // Add any other props specific to Map3DMarker
  }

  export const Map3DMarker: React.FC<Map3DMarkerProps>;
}
// add the <gmp-map-3d> custom-element to the JSX.IntrinsicElements
// interface, so it can be used in jsx
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      ['gmp-map-3d']: CustomElement<
        google.maps.maps3d.Map3DElement,
        {
          [key in GmpMap3DAttributeNames]?: string;
        }
      >;
      ['gmp-map-3d-marker']: CustomElement<
        google.maps.marker.AdvancedMarkerElement,
        Map3DMarkerAttributes
      >;
    }
    
  }
}

type GmpMap3DAttributeNames = keyof Omit<
  google.maps.maps3d.Map3DElementOptions,
  'bounds'
>;

// Define attributes specific to Map3DMarker
type Map3DMarkerAttributes = {
  position?: string;
  icon?: string;
  label?: string;
  title?: string;
  draggable?: string;
  clickable?: string;
  visible?: string;
  zIndex?: string;
  // Add any other attributes specific to Map3DMarker
};

// a helper type for CustomElement definitions
type CustomElement<TElem, TAttr> = Partial<
  TAttr &
    DOMAttributes<TElem> &
    RefAttributes<TElem> & {
      // for whatever reason, anything else doesn't work as children
      // of a custom element, so we allow `any` here
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      children: any;
    }
>;
