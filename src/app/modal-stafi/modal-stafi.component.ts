import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { GetDataService } from '../get-data.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-stafi',
  templateUrl: './modal-stafi.component.html',
  styleUrls: ['./modal-stafi.component.css']
})
export class ModalStafiComponent implements OnInit {

  cikliNr : number;
  levels:Array<Object> = [
    {num: 0, name: "Parashkollor"},
    {num: 1, name: "Cikli ulet"},
    {num: 2, name: "Cikli ulet mesem"},
  
    {num: 3, name: "Cikli ulet larte"}
  
  ];

  @Input() public modalData = {
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
    cikli :0
  };
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  constructor(public activeModal: NgbActiveModal,private data : GetDataService) { }

  ngOnInit(): void {
  }
  toNumber(){
    this.modalData.cikli = +this.modalData.cikli;
    console.log(this.modalData.cikli);
  }
  passBack() {
    this.passEntry.emit(this.modalData);
    if(!this.modalData.add)
    this.data.updateStaf(this.modalData.stafiShqipTitulli,this.modalData.stafiAnglishtTitulli,this.modalData.stafiShqipDetaje,this.modalData.stafiAnglishtDetaje,this.modalData.key,this.modalData.pdfUrl,this.modalData.stafiAnglishtLenda,this.modalData.stafiShqipLenda,this.modalData.cikli);
else
this.data.addNewStaf(this.modalData.stafiShqipTitulli,this.modalData.stafiShqipDetaje,this.modalData.stafiAnglishtTitulli,this.modalData.stafiAnglishtDetaje,this.modalData.stafiAnglishtLenda,this.modalData.stafiShqipLenda,this.modalData.cikli)
    this.activeModal.close(this.modalData);
  }
}
