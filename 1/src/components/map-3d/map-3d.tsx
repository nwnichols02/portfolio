import { useMapsLibrary } from '@vis.gl/react-google-maps';
import {
    ForwardedRef,
    forwardRef,
    useEffect,
    useImperativeHandle,
    useMemo,
    useState
} from 'react';
import { useMap3DCameraEvents } from './use-map-3d-camera-events';
import { useCallbackRef, useDeepCompareEffect } from './util.hooks';

import './map-3d.types';

export type Map3DProps = google.maps.maps3d.Map3DElementOptions & {
    onCameraChange?: (cameraProps: Map3DCameraProps) => void;
};

export type Map3DCameraProps = {
    center: google.maps.LatLngAltitudeLiteral;
    range: number;
    heading: number;
    tilt: number;
    roll: number;
};

export const Map3D = forwardRef(
    (
        props: Map3DProps & { children?: any },
        forwardedRef: ForwardedRef<google.maps.maps3d.Map3DElement | null>
    ) => {
        useMapsLibrary('maps3d');

        const [map3DElement, map3dRef] =
            useCallbackRef<google.maps.maps3d.Map3DElement>();

        useMap3DCameraEvents(map3DElement, p => {
            if (!props.onCameraChange) return;

            props.onCameraChange(p);
        });

        const [customElementsReady, setCustomElementsReady] = useState(false);
        useEffect(() => {
            customElements.whenDefined('gmp-map-3d').then(() => {
                setCustomElementsReady(true);
            });
        }, []);

        const { center, ...map3dOptions } = props;

        // useDeepCompareEffect(() => {
        //     if (!map3DElement) return;

        //     // copy all values from map3dOptions to the map3D element itself
        //     Object.assign(map3DElement, map3dOptions);
        // }, [map3DElement, map3dOptions]);


        useDeepCompareEffect(() => {
            if (!map3DElement) return;

            const updateMap3D = () => {
                Object.entries(map3dOptions).forEach(([key, value]) => {
                    if (key !== 'children' && map3DElement[key] !== value) {
                        try {
                            map3DElement[key] = value;
                        } catch (error) {
                            console.warn(`Failed to set ${key} on map3DElement:`, error);
                        }
                    }
                });
            };

            updateMap3D();
        }, [map3DElement, map3dOptions]);

        useImperativeHandle<
            google.maps.maps3d.Map3DElement | null,
            google.maps.maps3d.Map3DElement | null
        >(forwardedRef, () => map3DElement, [map3DElement]);

        const centerString = useMemo(() => {
            const lat = center?.lat ?? 0.0;
            const lng = center?.lng ?? 0.0;
            const altitude = center?.altitude ?? 0.0;

            return [lat, lng, altitude].join(',');
        }, [center?.lat, center?.lng, center?.altitude]);

        if (!customElementsReady) return null;

        return (
            <gmp-map-3d
                ref={map3dRef}
                center={centerString}
                range={String(props.range)}
                heading={String(props.heading)}
                tilt={String(props.tilt)}
                roll={String(props.roll)}
                dangerouslySetInnerHTML={{ __html: props.children }}
                >
                {/* {props.children} */}
            </gmp-map-3d>
        );
    }
);
