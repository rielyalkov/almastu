import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component, Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import * as L from 'leaflet';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PlacesService} from '../../../services/places.service';
import {GeoPoint} from '@angular/fire/firestore';
import {PlaceModel} from '../edit-places-table.component';
import {BehaviorSubject, combineLatest, Observable, Subject} from 'rxjs';
import {OSM_CONFIG, OsmConfig} from '../../../../../osm-config/osm.config';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {convertGeoPointToLatLng} from '../../../shared/geopoint-to-latlng.function';
import {takeUntil} from 'rxjs/operators';
import {LatLng, Marker} from 'leaflet';


@Component({
  selector: 'app-edit-place-dialog',
  templateUrl: './edit-place-dialog.component.html',
  styleUrls: ['./edit-place-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditPlaceDialogComponent implements OnInit, AfterViewInit, OnDestroy {

  public form: FormGroup;
  public isValid: boolean;
  public isCreating$: Observable<boolean>;

  private marker$: BehaviorSubject<Marker> = new BehaviorSubject<Marker>(null);
  private destroy$: Subject<boolean> = new Subject<boolean>();
  private map: L.Map;

  constructor(
    private formBuilder: FormBuilder,
    private placesService: PlacesService,
    private cdRef: ChangeDetectorRef,
    private dialogRef: MatDialogRef<EditPlaceDialogComponent>,
    @Inject(OSM_CONFIG) public osmConfig: OsmConfig,
    @Inject(MAT_DIALOG_DATA) public data: PlaceModel,
  ) {
    this.isCreating$ = this.placesService.isCreating$;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [this.data?.name, [
        Validators.required,
        this.validatePlaces(this.placesService.places),
      ],
      ],
      scale: [this.data?.scale, Validators.required],
      icon: [this.data?.icon ?? 'icon'],
    });

    combineLatest([
      this.marker$,
      this.form.statusChanges
    ]).pipe(
      takeUntil(this.destroy$),
    ).subscribe(
      (q) => {
        this.isValid = q[1] === 'VALID' && !!this.marker$.getValue();
        this.cdRef.detectChanges();
      },
    );

    this.form.updateValueAndValidity();
  }

  validatePlaces(places: PlaceModel[]): any {
    return (name: FormControl) =>
      places.some((place: PlaceModel) => place.name === name.value && place.name !== this.data?.name) ?
      {
        validatePlace: { valid: false }
      } :
      null;
  }

  addListenerPoint(): void {
    this.map.on('click', (event) => {
      this.marker$.getValue()?.remove();
      // @ts-ignore
      this.marker$.next(L.marker(event.latlng).addTo(this.map));
    });
  }

  savePlace(): void {
    const currentMarker: LatLng = this.marker$.getValue().getLatLng();
    const newPlaceData = {
      latlng: new GeoPoint(currentMarker.lat, currentMarker.lng),
      id: this.data?.id ?? this.placesService.places.length,
      ...this.form.getRawValue()
    };

    this.placesService.createNewPlace(newPlaceData).pipe(
      takeUntil(this.destroy$),
    ).subscribe(() => this.dialogRef.close());
  }

  ngAfterViewInit(): void {
    // @ts-ignore
    this.map = L.map('mapAddPlace').setView([60.000, 100.000], 2);

    L.tileLayer(this.osmConfig.urlTemplate, {
      maxZoom: this.osmConfig.maxZoom,
      attribution: this.osmConfig.attribution
    }).addTo(this.map);

    this.addListenerPoint();

    if (!!this.data) {
      this.marker$.next(L.marker(
        convertGeoPointToLatLng(this.data.latlng)
      ).addTo(this.map));
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.map.remove();
  }
}
