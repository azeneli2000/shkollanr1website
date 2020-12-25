import { Component, OnInit, Input } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';

import { GetDataService } from '../get-data.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { SettingsModalComponent } from '../settings-modal/settings-modal.component';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { Ng2ImgMaxService } from 'ng2-img-max';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  email ;
  isShown;
 isCollapsed = false;
currentCollapseId ='';
  uploadProgress: number = 0;
  currentProjectId: string = '';
  projects: any = [];
  cv: any = [];
  reducedImage;
  selectedFile: File = null;
  fb;
  downloadURL: Observable<string>;
  closeResult: string;
  modalData = {
    add: false,
    titulli: false,
    key: '',
    projektiShqipTitulli: '',
    projektiShqipDetaje: '',
    projektiAnglishtTitulli: '',
    projektiAnglishtDetaje: '',
    imageUrl: '',
    pdfUrl : ''
  };


  //SETTINGS
   modelSetting  = []//= [{
//     key : '',
//     teksti:'',
//     tekstiAnglisht : ''
// }]
  about  :{ } ;
  aboutAnglisht
  certifikime ;
  certifikimeAnglisht
  licensat ;
  licensatAnglisht
  partneret ;
  partneretAnglisht
  profili ;
  profiliAnglisht;


cikli0;
cikli0Anglisht;
cikli1;
cikli1Anglisht;
cikli2;
cikli2Anglisht;
cikli3;
cikli3Anglisht;
bursat;
bursatAnglisht;
srcBursat

  constructor(
    private data: GetDataService,
    private storage: AngularFireStorage,
    private modalService: NgbModal,
    private router : Router,
    private auth : AuthService,
    private ng2ImgMaxService: Ng2ImgMaxService
  ) {}
 

  ngOnInit(): void {
    if(!this.auth.isLoggedIn)
     this.router.navigate(['/login']);
      
     this.email= localStorage.getItem('userShkollaWeb');

    this.data.getDataShqip().subscribe((s) => {
      this.projects = [];
      s.forEach((element) => {
        this.projects.push({
          key: element.key,
          src: element.payload.val()['imageUrl'],
          titulli: element.payload.val()['titulli'],
          detaje: element.payload.val()['detaje'],
        });
      });
    });
    this.data.getSettings().subscribe((s)=>{

      this.about = s.find((s)=>s.key=="about").payload.val()['teksti'];
      this.aboutAnglisht = s.find((s)=>s.key=="about").payload.val()['tekstiAnglisht'];
   
      this.cikli0 = s.find((s)=>s.key=="cikli0").payload.val()['teksti'];
      this.cikli0Anglisht = s.find((s)=>s.key=="cikli0").payload.val()['tekstiAnglisht'];
   
      this.cikli1 = s.find((s)=>s.key=="cikli1").payload.val()['teksti'];
      this.cikli1Anglisht = s.find((s)=>s.key=="cikli1").payload.val()['tekstiAnglisht'];
   
      this.cikli2 = s.find((s)=>s.key=="cikli2").payload.val()['teksti'];
      this.cikli2Anglisht = s.find((s)=>s.key=="cikli2").payload.val()['tekstiAnglisht'];
     
      this.cikli3 = s.find((s)=>s.key=="cikli3").payload.val()['teksti'];
      this.cikli3Anglisht = s.find((s)=>s.key=="cikli3").payload.val()['tekstiAnglisht'];
      this.bursat = s.find((s)=>s.key=="bursat").payload.val()['teksti'];
      this.bursatAnglisht = s.find((s)=>s.key=="bursat").payload.val()['tekstiAnglisht'];
    });

    this.data.getCv().subscribe((s)=>{
      this.cv = [];

      s.forEach((element) => {
        this.cv.push({
          key: element.key,
          vjetersia: element.payload.val()['vjetersia'],
          atestimi: element.payload.val()['atestimi'],
          pershkrim: element.payload.val()['pershkrim'],
          diploma: element.payload.val()['diploma'],
          emri : element.payload.val()['emri'],
          tel : element.payload.val()['tel'],
          email : element.payload.val()['email'],
        });
      });
      console.log('cv :' + this.cv)
    }
    
    )
  }

  onFileSelected(event) {
    // this.currentProjectId = event.target.id;
    // var n = Date.now();
    // const file = event.target.files[0];
    // const filePath = `RoomsImages/${n}`;
    // const fileRef = this.storage.ref(filePath);
    // const task = this.storage.upload(`RoomsImages/${n}`, file);
    // task
    //   .snapshotChanges()
    //   .pipe(
    //     finalize(() => {
    //       this.downloadURL = fileRef.getDownloadURL();
    //       this.downloadURL.subscribe((url) => {
    //         if (url) {
    //           this.fb = url;
    //           this.data.updateProjectImage(event.target.id, url);
    //         }
    //       });
    //     })
    //   )
    //   .subscribe((url) => {
    //     if (url) {
    //       //this.uploadProgress= task.percentageChanges();

    //       task.percentageChanges().subscribe((a) => (this.uploadProgress = a));
    //     }
    //   });
    this.currentProjectId = event.target.id;
    var n = Date.now();
    const file = event.target.files[0];
    this.ng2ImgMaxService.compressImage(file,0.3,true).subscribe( result =>{
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
              this.fb = url;
              this.data.updateProjectImage(event.target.id, url,filePath);
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



  onFileSelectedPdfBursat(event) {
    this.currentProjectId = event.target.id;
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsImages/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe((url) => {
            if (url) {
              this.fb = url;
              this.data.updateBursatPdf(event.target.id, url);
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

  onFileSelectedPdfProjektet(event) {
  let projectId = event.target.id.substring(0, event.target.id.length - 3);

    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsImages/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe((url) => {
            if (url) {
              this.fb = url;
              this.data.updateProjektePdf(projectId, url);
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

  openModal(key, img, titulli) {
    this.modalData.titulli = titulli;
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.modalData = this.modalData;
    this.modalData.key = key;
    this.modalData.projektiShqipTitulli = this.projects.find(
      (p) => p.key == key
    ).titulli;
    this.modalData.projektiShqipDetaje = this.projects.find(
      (p) => p.key == key
    ).detaje;
    modalRef.result.then((result) => {
      if (result) {
      }
    });
  }

  openModalNew(titulli) {
    this.modalData.titulli = titulli;
    this.modalData.add = true;
    const modalRef = this.modalService.open(ModalComponent);
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
        this.data.deleteProject(key);
      }
    });
  }

  openModalSettings(setting,teksti,tekstiAnglisht) {
    const modalRef = this.modalService.open(SettingsModalComponent);
    modalRef.componentInstance.modalData = {
      key:setting,
    teksti:teksti,
    tekstiAnglisht :tekstiAnglisht
  }

    modalRef.result.then((result) => {
      if (result) {
      }
    });
  }


  scrollTo(section) {
    document.querySelector('#' + section)
    .scrollIntoView();
    this.isShown=false;
  }
  logout(){
    this.auth.logout()
  }
  deleteProject(key) {
    

    this.data.deleteProject(key);
  }


  openModalConfirmCv(key) {
    const modalRef = this.modalService.open(ConfirmModalComponent);
    modalRef.componentInstance.key = key;

    modalRef.result.then((result) => {
      if (result) {
        this.data.deleteCv(key);
      }
    });
  }
}
