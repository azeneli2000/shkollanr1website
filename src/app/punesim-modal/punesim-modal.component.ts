import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../get-data.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-punesim-modal',
  templateUrl: './punesim-modal.component.html',
  styleUrls: ['./punesim-modal.component.css']
})
export class PunesimModalComponent implements OnInit {
  modalData = {
    emri : '',
    diploma: '',
    vjetersia : '',
    atestimi : '',
    pershkrim : '',
    tel :'',
    email : ''
  }
  constructor(public activeModal: NgbActiveModal,private data : GetDataService ) { }

  ngOnInit(): void {

  }
  passBack(){
    this.data.addCv(this.modalData);
    this.activeModal.close();
  }


}
