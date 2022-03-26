import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {PlacesService} from '../../services/places.service';
import {MatTableDataSource} from '@angular/material/table';
import {BehaviorSubject, Subject} from 'rxjs';
import {takeUntil, tap} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {EditPlaceDialogComponent} from './edit-place-dialog/edit-place-dialog.component';
import {GeoPoint} from '@angular/fire/firestore';
import {DeletePlaceDialogComponent} from './delete-place-dialog/delete-place-dialog.component';
import {Router} from '@angular/router';

export interface PlaceModel {
  name: string;
  icon: string;
  id: number;
  docId: string;
  latlng: GeoPoint;
  scale: number;
}

@Component({
  selector: 'app-edit-places-table-container',
  templateUrl: './edit-places-table.component.html',
  styleUrls: ['./edit-places-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditPlacesTableComponent implements OnInit, OnDestroy {

  public places: MatTableDataSource<PlaceModel>;
  public displayedColumns: string[] = ['number', 'name', 'icon', 'latlng', 'scale', 'edit'];

  public isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private placesService: PlacesService,
    private dialog: MatDialog,
    private router: Router,
  ) { }

  public ngOnInit(): void {
    this.getPlaces();
  }

  getPlaces(): void {
    this.isLoading$.next(true);
    this.placesService.getPlaces().pipe(
      tap(() => this.isLoading$.next(false)),
      takeUntil(this.destroy$)
    ).subscribe(
      (places: PlaceModel[]) => this.places = new MatTableDataSource<PlaceModel>(places)
    );
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
  }

  addPlace(): void {
    this.dialog.open(EditPlaceDialogComponent);
  }

  editPlace(placeData: PlaceModel): void {
    this.dialog.open(EditPlaceDialogComponent, {data: placeData});
  }

  deletePlace(placeData: PlaceModel): void {
    this.dialog.open(DeletePlaceDialogComponent, {data: {
        docId: placeData.docId,
        name: placeData.name,
      }
    });
  }

  openPlaceRoutes(placeData: PlaceModel): void {
    this.router.navigateByUrl(`/panel/map-editor/place/${placeData.docId}`).then();
  }
}
