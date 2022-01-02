import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PlaceModel} from '../map-editor-component/map-editor.component';

@Component({
  selector: 'app-place-editor',
  templateUrl: './place-editor.component.html',
  styleUrls: ['./place-editor.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaceEditorComponent implements OnInit {

  private routingState: PlaceModel;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.routingState = this.router.getCurrentNavigation().extras.state as PlaceModel;
  }

  ngOnInit(): void {
  }

}
