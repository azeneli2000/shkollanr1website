import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';  
import { GetDataService } from '../get-data.service';

import { database } from 'firebase';

@Component({
  selector: 'app-homeanglisht',
  templateUrl: './homeanglisht.component.html',
  styleUrls: ['./homeanglisht.component.css']
})
export class HomeanglishtComponent implements OnInit {

  projects : any = [];
  isShown:boolean=false;
  activeMenu;
  constructor(config: NgbCarouselConfig, private data : GetDataService) {
    config.interval = 7000;  
    config.wrap = true;  
    config.keyboard = false;  
    config.pauseOnHover = false;  
    config.wrap=true;


}
currentSection = 'section1';

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
cikli0Anglsht;

cikli1;
cikli1Anglisht;
cikli2;
cikli2Anglisht;
cikli3;
cikli3Anglisht;
bursat;
bursatAnglisht;
srcBursat;

  ngOnInit(): void {
   this.data.getDataShqip().subscribe((s)=>{ 
   this.projects = [];
    s.forEach(element => {
     this.projects.push({'id':element.key,'src': element.payload.val()["imageUrl"],'titulli': element.payload.val()["titulli"],'detaje':element.payload.val()["detaje"],'pdfUrl':element.payload.val()["pdfUrl"]});

    });
    });


    this.data.getSettings().subscribe((s)=>{

      this.about = s.find((s)=>s.key=="about").payload.val()['teksti'];
      this.aboutAnglisht = s.find((s)=>s.key=="about").payload.val()['tekstiAnglisht'];
   
      this.cikli0 = s.find((s)=>s.key=="cikli0").payload.val()['teksti'];
      this.cikli0Anglsht = s.find((s)=>s.key=="cikli0").payload.val()['tekstiAnglisht'];
   
      this.cikli1 = s.find((s)=>s.key=="cikli1").payload.val()['teksti'];
      this.cikli1Anglisht = s.find((s)=>s.key=="cikli1").payload.val()['tekstiAnglisht'];
   
      this.cikli2 = s.find((s)=>s.key=="cikli2").payload.val()['teksti'];
      this.cikli2Anglisht = s.find((s)=>s.key=="cikli2").payload.val()['tekstiAnglisht'];
     
      this.cikli3 = s.find((s)=>s.key=="cikli3").payload.val()['teksti'];
      this.cikli3Anglisht = s.find((s)=>s.key=="cikli3").payload.val()['tekstiAnglisht'];
      this.bursat = s.find((s)=>s.key=="bursat").payload.val()['teksti'];
      this.bursatAnglisht = s.find((s)=>s.key=="bursat").payload.val()['tekstiAnglisht'];
      this.srcBursat = s.find((s)=>s.key=="bursat").payload.val()['pdfUrl'];

       })
  }



  onSectionChange(sectionId: string) {
    this.currentSection = sectionId;
  }

  scrollTo(section) {
    document.querySelector('#' + section)
    .scrollIntoView();
    this.isShown=false;
  }



}
