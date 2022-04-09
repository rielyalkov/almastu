import { GeoPoint } from '@angular/fire/firestore';

export default interface MapDoc {
  icon: string;
  id: number;
  latlng: GeoPoint;
  name: string;
  scale: number;
}
