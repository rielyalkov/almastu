import { AfterViewInit, Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { Viewer } from 'photo-sphere-viewer';
import { ActivatedRoute } from '@angular/router';
import { getDownloadURL, getStorage, ref } from '@angular/fire/storage';
import { Location } from '@angular/common';
import * as mitchTree from 'd3-mitch-tree';

const treeData = [
  {
    id: 1,
    name: '19 июня',
    description: 'Первая днёвка, урочище Ходыки',
    fileName: '19.06.22.jpg'
  },
  {
    id: 2,
    name: '21 июня',
    parentId: 1,
    description: 'Поле близ деревни Козихи',
    fileName: '21.06.22.jpg'
  },
  {
    id: 3,
    name: '23 июня',
    parentId: 2,
    description: '5 км после деревни Заверняйка',
    fileName: '23.06.22.jpg'
  },
  {
    id: 4,
    name: '24 июня',
    parentId: 3,
    description: 'Стоянка напротив деревни Кишкино',
    fileName: '24.06.22.jpg'
  },
  {
    id: 5,
    name: '26 июня',
    parentId: 4,
    description: '2 км после притока Шесть, правый берег',
    fileName: '26.06.22.jpg'
  },
  {
    id: 6,
    name: '26 июня',
    parentId: 4,
    description: 'Выход к берегу на стоянке 26.06',
    fileName: '26.06.22.river.jpg'
  },
  {
    id: 7,
    name: '27 июня',
    parentId: 5,
    description: 'Правый берег после моста над р. Сороть',
    fileName: '27.06.22.jpg'
  },
  {
    id: 8,
    name: '27 июня',
    parentId: 6,
    description: 'Выход к берегу на стоянке 27.06',
    fileName: '27.06.22.river.jpg'
  },
];

const panoramas = {
  '19.06.22.jpg': 'f',
  '21.06.22.jpg': 'bf',
  '23.06.22.jpg': 'bf',
  '24.06.22.jpg': 'bf',
  '26.06.22.jpg': 'bfr',
  '26.06.22.river.jpg': 'm',
  '27.06.22.jpg': 'br',
  '27.06.22.river.jpg': 'm'
};

@Component({
  selector: 'app-photosphere',
  templateUrl: './photosphere.component.html',
  styleUrls: ['./photosphere.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class PhotosphereComponent implements AfterViewInit {
  private imageId: string;

  public mode = 'f';

  @ViewChild('viewer')
  private viewerContainer: ElementRef;
  public next = '';
  public prev = '';
  public toRiver = '';
  @ViewChild('tree')
  private treeContainer: ElementRef;
  private viewer: Viewer;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
  ) {
  }

  public setPano(image: string): void {
    getDownloadURL(ref(getStorage(), image)).then((picture) => {
      this.viewer.setPanorama(picture).then(() => {
        this.location.replaceState('photosphere/' + image);
      });
    });
  }

  ngAfterViewInit(): void {
    this.imageId = this.route.snapshot.paramMap.get('id');
    const storage = getStorage();
    const image = ref(storage, this.imageId);

    getDownloadURL(image).then((picture) => {
      this.viewer = new Viewer({
        container: this.viewerContainer.nativeElement,
        panorama: `${picture}`,
        lang: {
          autorotate: 'Поворот по компасу',
          zoom: 'Приближение',
          zoomOut: 'Отдалить',
          zoomIn: 'Приблизить',
          move: 'Подвинуть',
          download: 'Скачать',
          fullscreen: 'Во весь экран',
          menu: 'Меню',
          twoFingers: 'Двигайте двумя пальцами',
          ctrlZoom: 'Удерживайте ctrl и крутите колесико для приближения',
          loadError: 'Не удалось загрузить панораму',
        },
      });
      const tree = new mitchTree.boxedTree().setData(treeData)
        .setAllowFocus(false)
        .setAllowZoom(false)
        .setAllowPan(false)
        .setAllowNodeCentering(true)
        .setIsFlatData(true)
        .setElement(this.treeContainer.nativeElement)
        .setIdAccessor(data => data.id)
        .setParentIdAccessor(data => data.parentId)
        .setBodyDisplayTextAccessor(data => data.description)
        .setTitleDisplayTextAccessor(data => data.name)
        .getNodeSettings()
        .setSizingMode('nodesize')
        .setVerticalSpacing(30)
        .setHorizontalSpacing(100)
        .back()
        .on('nodeClick', event => {
          this.location.replaceState('photosphere/' + event.nodeDataItem.data.fileName);
          getDownloadURL(ref(storage, event.nodeDataItem.data.fileName)).then(
            newPicture => this.viewer.setPanorama(newPicture)
          );
          if (event.type === 'collapse') {
            event.preventDefault();
          }
        })
        .initialize();
      tree.getNodes().forEach((node, index, _A) => {
        tree.expand(node);
        if (index === 6) {
          tree.centerNode(node);
        }
      });
      tree.update(tree.getRoot());
      this.viewer.on('panorama-loaded', (event) => {
        const pano: string = event.args[0].panorama;
        const panoKeys = Object.keys(panoramas);
        panoKeys.forEach((key, index) => {
          if (pano.includes(key)) {
            this.mode = panoramas[key];
            if (index > 0) {
              this.prev = panoKeys[index - 1];
              if (this.prev.includes('river')) {
                this.prev = panoKeys[index - 2];
              }
            }
            if (index < 6) {
              this.next = panoKeys[index + 1];
              if (this.next.includes('river')) {
                this.next = panoKeys[index + 2];
              }
            }
            if (this.mode.includes('r')) {
              this.toRiver = panoKeys[index].replace('.jpg', '.river.jpg');
            }
            if (this.mode.includes('m')) {
              this.toRiver = panoKeys[index].replace('.river.jpg', '.jpg');
            }
          }
        });
      });
    });
  }
}
