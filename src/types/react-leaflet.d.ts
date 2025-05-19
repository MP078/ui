// Custom type augmentation for react-leaflet Marker to allow icon prop
import { Marker as LeafletMarker, DivIcon, Icon } from 'leaflet';
import { MarkerProps as RLMarkerProps } from 'react-leaflet';

declare module 'react-leaflet' {
  interface MarkerProps extends RLMarkerProps {
    icon?: Icon | DivIcon;
  }
}
