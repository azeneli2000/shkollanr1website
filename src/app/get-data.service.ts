import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import{AngularFireList} from '@angular/fire/database/database'
import { AngularFireStorage } from '@angular/fire/storage';
import { disableDebugTools } from '@angular/platform-browser';
import { first } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  constructor(private db : AngularFireDatabase,private storage: AngularFireStorage) { }

  getDataShqip(){
    return(this.db.list('projekte/projects').snapshotChanges())
  }
  updateProjectImage(key,url,path){
    this.db.list('projekte/projects').update(key,{
      imageUrl : url,
      imageRef : path
    })
  }
  updateProject(titulliShqip,titulliAnglsht,detajeShqip,DetajeAnglisht,key,pdfUrl){
    this.db.list('projekte/projects').update(key,{
      titulli : titulliShqip,
      detaje : detajeShqip,
      detajeanglisht:DetajeAnglisht,
      titullianglisht:  titulliAnglsht,
      pdfUrl : pdfUrl
    })
  }
  addNewProjet(titulliShqip,detajeShqip,titulliAnglisht,detajeAnglisht){
    this.db.list('projekte/projects').push({
      imageUrl : 'https://firebasestorage.googleapis.com/v0/b/primaenrgy-7887e.appspot.com/o/RoomsImages%2F1589882706015?alt=media&token=8f02f2ae-f962-4a9b-8bc5-3933109ee02f', 
      titulli :titulliShqip,
      detaje :detajeShqip,
      titullianglisht :titulliAnglisht,
      detajeanglisht : detajeAnglisht,
      pdfUrl:""
    });
  }

deleteProject(key){
  this.db.list('projekte/projects').snapshotChanges().pipe(first()).subscribe((s)=>{
    this.storage.ref(s.find((s)=>s.key==key).payload.val()['imageRef']).delete().toPromise().then(
        ()=>   this.db.list('projekte/projects').remove(key));
   })



 
}
//settings

getSettings(){
 return( this.db.list('projekte/settings/').snapshotChanges());
}
setSetting(setting : string , value : any){
  delete value.key;
  this.db.list('projekte/settings').update(setting,value);
}


checkGalery(){
 return this.db.list('projekte/galeri').snapshotChanges();
}
addGAlleryEmpty(){
this.db.list('projekte/galeri').push({'src':
'https://firebasestorage.googleapis.com/v0/b/primaenrgy-7887e.appspot.com/o/RoomsImages%2F1589882706015?alt=media&token=8f02f2ae-f962-4a9b-8bc5-3933109ee02f',
'caption':'','thumb':'https://firebasestorage.googleapis.com/v0/b/primaenrgy-7887e.appspot.com/o/RoomsImages%2F1589882706015?alt=media&token=8f02f2ae-f962-4a9b-8bc5-3933109ee02f'});
}

updateGallery(key,url,path){
 
  this.db.list('projekte/galeri').snapshotChanges().pipe(first()).subscribe((s)=>{
    if((s.find((s)=>s.key==key).payload.val()['imageRef'])!="")

    this.storage.ref(s.find((s)=>s.key==key).payload.val()['imageRef']).delete().toPromise().then(
        ()=>this.db.list('projekte/galeri').update(key,{
          caption : "",
          src : url,
          imageRef : path
        })  );
        else
        this.db.list('projekte/galeri').update(key,{
          caption : "",
          thumb : url,
          imageRef: path
        })
   })


}
updateGalleryResized(key,url,path){
 
  this.db.list('projekte/galeri').snapshotChanges().pipe(first()).subscribe((s)=>{
    if((s.find((s)=>s.key==key).payload.val()['reducedRef'])!="")
    this.storage.ref(s.find((s)=>s.key==key).payload.val()['reducedRef']).delete().toPromise().then(
        ()=>this.db.list('projekte/galeri').update(key,{
          caption : "",
          thumb : url,
          reducedRef: path
        })  );
        else
        this.db.list('projekte/galeri').update(key,{
          caption : "",
          thumb : url,
          reducedRef: path
        })
   })

}




addGallery(){
  this.db.list('projekte/galeri').push({
    caption : "",
    src : 'https://firebasestorage.googleapis.com/v0/b/primaenrgy-7887e.appspot.com/o/RoomsImages%2F1589882706015?alt=media&token=8f02f2ae-f962-4a9b-8bc5-3933109ee02f',
    thumb : 'https://firebasestorage.googleapis.com/v0/b/primaenrgy-7887e.appspot.com/o/RoomsImages%2F1589882706015?alt=media&token=8f02f2ae-f962-4a9b-8bc5-3933109ee02f',
    imageRef :'',
    reducedRef :  ''
  });
}
deleteGallery(key){


   this.db.list('projekte/galeri').remove(key);
}

updateBursatPdf(key,url){
  this.db.list('projekte/settings').update('bursat',{
    pdfUrl : url
  })
}

updateProjektePdf(key,url){

  this.db.list('projekte/projects').update(key,{
    pdfUrl : url
  })
}
}
