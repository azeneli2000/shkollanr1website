import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../get-data.service';
import {ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css']
})
export class ViewerComponent implements OnInit {
 src ;

  constructor(public data: GetDataService , private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      let id= params.get('id');
      if (params.get('id'))
      {
        console.log(id)
        this.data.getDataShqip().subscribe((s)=>{
          this.src = s.find((s)=>s.key==id).payload.val()['pdfUrl'];
      });
      }
     // console.log(params.get('id'))
      else
      this.data.getSettings().subscribe((s)=>{
        this.src = s.find((s)=>s.key=="bursat").payload.val()['pdfUrl'];
    });


})
  }

}
