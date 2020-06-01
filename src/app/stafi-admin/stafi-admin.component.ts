import { Component, OnInit, Input } from '@angular/core';
import { GetDataService } from '../get-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stafi-admin',
  templateUrl: './stafi-admin.component.html',
  styleUrls: ['./stafi-admin.component.css']
})
export class StafiAdminComponent implements OnInit {
  cikliNr : any;
  staf: any = [];
  titulli : string;


  constructor( private route: ActivatedRoute,   private data: GetDataService,) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
     this.cikliNr= params.get('id');
    if (this.cikliNr==0)
     this.titulli='Parashkollor';
    if (this.cikliNr==1)
     this.titulli='Cikli i ulet';
    if (this.cikliNr==2)
     this.titulli='Cikli i mesem i ulet';
    if (this.cikliNr==3)
     this.titulli='Cikli i mesem i larte';
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
      });
      
    







  }

}
