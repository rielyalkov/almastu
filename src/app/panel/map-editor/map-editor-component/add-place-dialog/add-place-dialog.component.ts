import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import * as L from 'leaflet';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PlacesService} from '../../services/places.service';
import {GeoPoint} from '@angular/fire/firestore';
import {PlaceModel} from '../map-editor.component';
import {tap} from 'rxjs';
import {OSM_CONFIG, OsmConfig} from '../../../../osm-config/osm.config';


@Component({
  selector: 'app-add-place-dialog',
  templateUrl: './add-place-dialog.component.html',
  styleUrls: ['./add-place-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddPlaceDialogComponent implements OnInit, AfterViewInit, OnDestroy {

  public form: FormGroup;

  private marker;

  map;


  constructor(
    private formBuilder: FormBuilder,
    private placesService: PlacesService,
    private cdRef: ChangeDetectorRef,
    @Inject(OSM_CONFIG) public osmConfig: OsmConfig
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      scale: [null, Validators.required],
      icon: [null],
    });

    this.form.valueChanges.pipe(
      tap((q) => console.log(this.placesService.places.some((place: PlaceModel) => place.name === q.name)))
    ).subscribe();
  }

  addListenerPoint(): void {
    this.map.on('click', (event) => {
      this.marker?.remove();
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

  ngAfterViewInit(): void {
    // @ts-ignore
    this.map = L.map('mapAddPlace').setView([60.000, 100.000], 3);


    L.tileLayer(this.osmConfig.urlTemplate, {
      maxZoom: this.osmConfig.maxZoom,
      attribution: this.osmConfig.attribution
    }).addTo(this.map);

    this.addListenerPoint();

  }

  ngOnDestroy(): void {
    this.map.remove();
  }
}
