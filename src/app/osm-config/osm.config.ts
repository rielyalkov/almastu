import { InjectionToken } from '@angular/core';

const attribution = 'Map data: &copy; ' +
  '<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> ' +
  'contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | <br>Map style: &copy; ' +
  '<a href="https://opentopomap.org">OpenTopoMaps</a> ' +
  '(<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)';

export interface OsmConfig {
  urlTemplate: string;
  maxZoom: number;
  attribution: string;
}

export const DEFAULT_OSM_CONFIG: OsmConfig = {
  urlTemplate: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  maxZoom: 19,
  attribution,
};

// AppConfig 타입의 InjectionToken APP_CONFIG 생성
export const OSM_CONFIG = new InjectionToken<OsmConfig>('osm.config');

// Providers
export const OsmConfigProvider = {
  provide: OSM_CONFIG, // InjectionToken
  useValue: DEFAULT_OSM_CONFIG
};
