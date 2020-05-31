import { Component, OnInit, Input } from '@angular/core';
import { GetDataService } from '../get-data.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements OnInit {
@Input() key;
  constructor(public activeModal: NgbActiveModal,private data : GetDataService) { }

  ngOnInit(): void {
  }

  deleteProject(){
    //this.data.deleteProject (this.key);
    this.activeModal.close(this.key);
   }
   closeModal(){
     this.activeModal.close();
   }

}
