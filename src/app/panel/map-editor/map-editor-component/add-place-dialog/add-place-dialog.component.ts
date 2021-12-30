import {Component, OnInit} from '@angular/core';
import * as L from 'leaflet';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PlacesService} from '../../services/places.service';
import {GeoPoint} from '@angular/fire/firestore';


@Component({
  selector: 'app-add-place-dialog',
  templateUrl: './add-place-dialog.component.html',
  styleUrls: ['./add-place-dialog.component.css']
})
export class AddPlaceDialogComponent implements OnInit {

  public form: FormGroup;

  private map;
  private marker;


  constructor(
    private formBuilder: FormBuilder,
    private placesService: PlacesService,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      scale: [null, Validators.required],
      icon: [null],
    });

    document.getElementById('mapHTML').innerHTML =
      '<div id=\'mapAddPlace\' ' +
      'style="  height: 400px;\n' +
      '  width: 700px;\n' +
      '  border-radius: 4px;\n' +
      '  position: relative;\n' +
      '  z-index: 500;' +
      'cursor: pointer"' +
      'leaflet></div>';

    // @ts-ignore
    this.map = L.map('mapAddPlace', {drawControl: false, fullscreenControl: true}).setView([60.000, 100.000], 3);

    this.resetPoint();

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: 'Map data: &copy; ' +
        '<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> ' +
        'contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | <br>Map style: &copy; ' +
        '<a href="https://opentopomap.org">OpenTopoMaps</a> ' +
        '(<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    }).addTo(this.map);
  }

  resetPoint(): void {
    this.marker?.remove();
    this.map.on('click', (event) => {
      this.map.off('click');
      // @ts-ignore
      this.marker = L.marker(event.latlng).addTo(this.map);
    });
  }

  addNewPlace(): void {
    const newPlaceData = {
      latlng: new GeoPoint(this.marker._latlng.lat, this.marker._latlng.lng),
      ...this.form.getRawValue()
    };

    this.placesService.createNewPlace(newPlaceData);
  }
}
