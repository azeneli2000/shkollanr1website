import { Component, OnInit } from '@angular/core';
import { Lightbox } from 'ngx-lightbox';
import { GetDataService } from '../get-data.service';
import { Observable } from 'rxjs';
import { AngularFireStorage, createStorageRef } from '@angular/fire/storage';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize, first } from 'rxjs/operators';
import { disableDebugTools } from '@angular/platform-browser';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { AngularFireDatabase } from '@angular/fire/database';


@Component({
  selector: 'app-galery-admim',
  templateUrl: './galery-admim.component.html',
  styleUrls: ['./galery-admim.component.css']
})
export class GaleryAdmimComponent implements OnInit {

  constructor(private db : AngularFireDatabase,private _lightbox: Lightbox,private data:GetDataService,private storage: AngularFireStorage,private ng2ImgMaxService: Ng2ImgMaxService,
    private modalService: NgbModal) { }
  downloadURL: Observable<string>;
  uploadProgress: number = 0;
  currentImageId: string = '';
  fb;
  filePath;
  reducedImage;
  album:any = [];
  photo : {
    key : any
    src : ''
    caption : ''
    thumb : ''
  }
  open(index: number): void {
    // open lightbox
    this._lightbox.open(this.album, index);
  }
 
  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }
  ngOnInit(): void {
    let l =this.data.checkGalery().subscribe((a)=>{
      if(a.length==0)      
        this.data.addGAlleryEmpty();
       
     });

     this.data.checkGalery().subscribe((s)=>{
     this.album = [];
      s.forEach(element => {
            this.album.push({key:element.key,...element.payload.val() as {}})
            
      });
     })
  }
  openModalConfirm(key){
    const modalRef = this.modalService.open(ConfirmModalComponent);
    modalRef.componentInstance.key = key;

    modalRef.result.then((result) => {
      if (result) {
  this.db.list('projekte/galeri').snapshotChanges().pipe(first()).subscribe((s)=>{
    this.storage.ref(s.find((s)=>s.key==key).payload.val()['imageRef']).delete().toPromise().then(
      ()=>  this.storage.ref(s.find((s)=>s.key==key).payload.val()['reducedRef']).delete().toPromise().then(
        ()=>  this.data.deleteGallery(result)));
  ;
   })
      
      }
    });
  }
  onFileSelected(event){
    this.currentImageId = event.target.id;
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    this.filePath = filePath;
    const task = this.storage.upload(`RoomsImages/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe((url) => {
            if (url) {
              this.fb = url;
              this.data.updateGallery(event.target.id, url,filePath);
            }
          });
        })
      )
      .subscribe((url) => {
        if (url) {
          //this.uploadProgress= task.percentageChanges();

          task.percentageChanges().subscribe((a) => (this.uploadProgress = a));
        }
      });
  }

  onFileSelectedReducedImage(event){
    this.currentImageId = event.target.id;
    var n = Date.now();
    const file = event.target.files[0];
    this.ng2ImgMaxService.compressImage(file,0.3,true).subscribe( result =>{
      this.reducedImage=result;
      console.log("Resized :", this.reducedImage);
      const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    this.filePath = filePath;
    const task = this.storage.upload(`RoomsImages/${n}`, this.reducedImage);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe((url) => {
            if (url) {
              this.fb = url;
              this.data.updateGalleryResized(event.target.id, url,filePath);
            }
          });
        })
      )
      .subscribe((url) => {
        if (url) {
          //this.uploadProgress= task.percentageChanges();

          task.percentageChanges().subscribe((a) => (this.uploadProgress = a));
        }
      });
     }, error => {
          console.error("Resize error:", error);
     }
  );
    
  
  }

  addNewImage(){
    this.data.addGallery();
  }

}
