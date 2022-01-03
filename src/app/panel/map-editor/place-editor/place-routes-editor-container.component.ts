import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {PlaceModel} from '../map-editor-component/map-editor.component';
import {RoutesService} from '../services/routes.service';
import {map, switchMap} from 'rxjs/operators';
import {of, combineLatest, Observable} from 'rxjs';

@Component({
  selector: 'app-place-routes-editor-container',
  templateUrl: './place-routes-editor-container.component.html',
  styleUrls: ['./place-routes-editor-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaceRoutesEditorContainerComponent implements OnInit {

  public placeData$: Observable<[any, PlaceModel]>;

  private readonly routingState: PlaceModel;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private routesService: RoutesService
  ) {
    this.routingState = this.router.getCurrentNavigation().extras.state as PlaceModel;
  }

  ngOnInit(): void {
    this.placeData$ = this.activatedRoute.paramMap.pipe(
      map((params: {params: {id: string}} & ParamMap) => params.params.id),
      switchMap((id: string) => combineLatest([
        this.routesService.getPlaceCoordinatesData(id),
        !!this.routingState ? of(this.routingState) : this.routesService.getPlace(id)
      ])),
    );
  }

}
