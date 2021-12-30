import {Component, OnDestroy, OnInit} from '@angular/core';
import {PlacesService} from '../services/places.service';
import {MatTableDataSource} from '@angular/material/table';
import {BehaviorSubject, Subject} from 'rxjs';
import {takeUntil, tap} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {AddPlaceDialogComponent} from './add-place-dialog/add-place-dialog.component';

export interface PlaceModel {
  name: string;
  icon: string;
  latlng: string;
  scale: number;
}

@Component({
  selector: 'app-map-editor',
  templateUrl: './map-editor.component.html',
  styleUrls: ['./map-editor.component.css'],
})
export class MapEditorComponent implements OnInit, OnDestroy {

  public places: MatTableDataSource<PlaceModel>;
  public displayedColumns: string[] = ['number', 'name', 'icon', 'latlng', 'scale', 'edit'];

  public isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private placesService: PlacesService,
    public dialog: MatDialog
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
    const dialogRef = this.dialog.open(AddPlaceDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
