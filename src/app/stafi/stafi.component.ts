import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../get-data.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { finalize } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalStafiComponent } from '../modal-stafi/modal-stafi.component';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-stafi',
  templateUrl: './stafi.component.html',
  styleUrls: ['./stafi.component.css']
})
export class StafiComponent implements OnInit {
  isShown;
  uploadProgress: number = 0;
  currentStafId: string = '';
  staf: any = [];
  reducedImage : any;
  downloadURL:any;
cikliNr : number;
levels:Array<Object> = [
  {num: 0, name: "Parashkollor"},
  {num: 1, name: "Cikli ulet"},
  {num: 2, name: "Cikli ulet mesem"},

  {num: 3, name: "Cikli ulet larte"}

];
  modalData = {
    add : false,
    titulli : false,
    key:'',
    stafiShqipTitulli:'',
    stafiShqipLenda : '',
    stafiShqipDetaje:'',
    stafiAnglishtTitulli:'' ,
    stafiAnglishtLenda :'',
    stafiAnglishtDetaje :'',
    pdfUrl:'',
    cikli : ''
  };
  constructor(
    private data: GetDataService,
    private storage: AngularFireStorage,
    private router : Router,
    private ng2ImgMaxService: Ng2ImgMaxService,
    private modalService: NgbModal,

  ) { }



  ngOnInit(): void {
    this.data.getStaf().subscribe((s) => {
      this.staf = [];
      s.forEach((element) => {
        this.staf.push({
          key: element.key,
          src: element.payload.val()['imageUrl'],
          titulli: element.payload.val()['titulli'],
          detaje: element.payload.val()['detaje'],
          lenda : element.payload.val()["lenda"],
          cikli : element.payload.val()["cikli"]

        });
      });
    });
  }

  onFileSelected(event) {
    this.currentStafId = event.target.id;
    var n = Date.now();
    const file = event.target.files[0];
    this.ng2ImgMaxService.compressImage(file,0.2,true).subscribe( result =>{
      this.reducedImage=result;
      console.log("Resized :", this.reducedImage);
      const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsImages/${n}`, this.reducedImage);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe((url) => {
            if (url) {
              this.data.updateStaftImage(event.target.id, url,filePath);
            }
          });
        })
      )
      .subscribe((url) => {
        if (url) {
          task.percentageChanges().subscribe((a) => (this.uploadProgress = a));
        }
      });
     }, error => {
          console.error("Resize error:", error);
     }
  );
    
  

  }

  openModalNew(titulli) {
    this.modalData.titulli = titulli;
    this.modalData.add = true;
    const modalRef = this.modalService.open(ModalStafiComponent);
    modalRef.componentInstance.modalData = this.modalData;

    modalRef.result.then((result) => {
      if (result) {
      }
    });
  }
  openModalConfirm(key) {
    const modalRef = this.modalService.open(ConfirmModalComponent);
    modalRef.componentInstance.key = key;

    modalRef.result.then((result) => {
      if (result) {
        this.data.deleteStaf(key);
      }
    });
  }
  openModal(key, img, titulli) {
    this.modalData.titulli = titulli;
    const modalRef = this.modalService.open(ModalStafiComponent);
    modalRef.componentInstance.modalData = this.modalData;
    this.modalData.key = key;
    this.modalData.stafiShqipTitulli = this.staf.find(
      (p) => p.key == key
    ).titulli;
    this.modalData.stafiShqipDetaje = this.staf.find(
      (p) => p.key == key
    ).detaje;
    this.modalData.stafiShqipLenda = this.staf.find(
      (p) => p.key == key
    ).lenda;
    this.modalData.cikli = this.staf.find(
      (p) => p.key == key
    ).cikli;
    modalRef.result.then((result) => {
      if (result) {
      }
    });
  }
 toNumber(){
    this.cikliNr = +this.cikliNr;
    console.log(this.cikliNr);
  }

}
