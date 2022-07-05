import {AfterViewInit, Component, ElementRef, ViewChild, ViewEncapsulation} from '@angular/core';
import {Viewer} from 'photo-sphere-viewer';
import {ActivatedRoute} from '@angular/router';
import {getDownloadURL, getStorage, ref} from '@angular/fire/storage';

@Component({
  selector: 'app-photosphere',
  templateUrl: './photosphere.component.html',
  styleUrls: ['./photosphere.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class PhotosphereComponent implements AfterViewInit {
  private imageId: string;

  constructor(
    private route: ActivatedRoute,
  ) { }

  @ViewChild('viewer')
  private viewerContainer: ElementRef;

  ngAfterViewInit(): void {
    this.imageId = this.route.snapshot.paramMap.get('id');
    const storage = getStorage();
    const image = ref(storage, this.imageId);

    getDownloadURL(image).then((picture) => {
      const viewer = new Viewer({
        container: this.viewerContainer.nativeElement,
        panorama: `${picture}`,
      });
    });
  }
}
