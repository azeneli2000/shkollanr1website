import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GetDataService } from '../get-data.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() public img;
  @Input() public titulli=false;
  @Input() public modalData = {
    add : false,
    titulli : false,
    key:'',
    projektiShqipTitulli:'',
    projektiShqipDetaje:'',
    projektiAnglishtTitulli:'' ,
    projektiAnglishtDetaje :'',
    pdfUrl:''
  };
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  constructor( public activeModal: NgbActiveModal, private data : GetDataService) { }

  ngOnInit(): void {
  

  }

  passBack() {
    this.passEntry.emit(this.modalData);
    if(!this.modalData.add)
    this.data.updateProject(this.modalData.projektiShqipTitulli,this.modalData.projektiAnglishtTitulli,this.modalData.projektiShqipDetaje,this.modalData.projektiAnglishtDetaje,this.modalData.key,this.modalData.pdfUrl);
else
this.data.addNewProjet(this.modalData.projektiShqipTitulli,this.modalData.projektiShqipDetaje,this.modalData.projektiAnglishtTitulli,this.modalData.projektiAnglishtDetaje)
    this.activeModal.close(this.modalData);
  }

  

}
