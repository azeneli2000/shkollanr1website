import { Component, OnInit } from '@angular/core';
import { Lightbox } from 'ngx-lightbox';
import { GetDataService } from '../get-data.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
})
export class GalleryComponent implements OnInit {
  constructor(private _lightbox: Lightbox, private data: GetDataService) {}
  album: any = [];

  open(index: number): void {
    // open lightbox
    this._lightbox.open(this.album, index);
  }

  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }
  ngOnInit(): void {
    let l = this.data.checkGalery().subscribe((a) => {
      if (a.length == 0) this.data.addGAlleryEmpty();
      else {
        this.album = [];

        a.forEach((element) => {
          element.payload.val();
          this.album.push(element.payload.val());
        });
      }
    });
  }
}
