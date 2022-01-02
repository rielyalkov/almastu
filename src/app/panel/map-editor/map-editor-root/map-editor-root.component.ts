import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-map-editor-root',
  templateUrl: './map-editor-root.component.html',
  styleUrls: ['./map-editor-root.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapEditorRootComponent { }
