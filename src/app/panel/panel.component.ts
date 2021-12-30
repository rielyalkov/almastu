import { Component } from '@angular/core';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent {

  constructor() {
  }

  public links: {link: string, name: string}[] = [
    {
      link: '/',
      name: 'Домой'
    },
    {
      link: '/panel/editor',
      name: 'Редактор новостей'
    },
    {
      link: '/panel/map-editor',
      name: 'Редактор карты'
    },
  ];

}
