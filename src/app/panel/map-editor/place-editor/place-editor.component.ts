import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-place-editor',
  templateUrl: './place-editor.component.html',
  styleUrls: ['./place-editor.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaceEditorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
