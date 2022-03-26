import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {PlaceModel} from '../edit-places-table/edit-places-table.component';
import {RoutesService} from '../../services/routes.service';
import {map, switchMap, tap} from 'rxjs/operators';
import {of, combineLatest, Observable} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {RouteDialogComponent} from './route-dialog/route-dialog.component';
import {RouteModel} from './routes-editor-table/routes-editor-table.component';

@Component({
  selector: 'app-place-routes-editor-container',
  templateUrl: './routes-editor-container.component.html',
  styleUrls: ['./routes-editor-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoutesEditorContainerComponent implements OnInit {

  public placeData$: Observable<[RouteModel[], PlaceModel]>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private routesService: RoutesService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.placeData$ = this.activatedRoute.paramMap.pipe(
      map((params: {params: {id: string}} & ParamMap) => params.params.id),
      switchMap((id: string) => combineLatest([
        this.routesService.getPlaceCoordinatesData(id),
        this.routesService.getPlace(id)
      ])),
    );
  }

  addRoute(placeData: [RouteModel[], PlaceModel]): void {
    this.dialog.open(RouteDialogComponent, {
      height: '80vh',
      width: '80vw',
      data: placeData
    });
  }
}
