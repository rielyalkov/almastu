import {LatLng} from 'leaflet';
import {GeoPoint} from '@angular/fire/firestore';

export function convertGeoPointToLatLng(geoPoint: GeoPoint): LatLng {
  return new LatLng(
    geoPoint.latitude,
    geoPoint.longitude
  );
}
