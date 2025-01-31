import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private storage:AngularFireStorage,
    private afs:AngularFirestore,
  private toastr:ToastrService,
    private router:Router) { }

  uploadImage(selectedImage:any ,postData:any ,formStatus:any,id:any){
    const filePath=`postIMG/${Date.now()}`;
    console.log(filePath);

    this.storage.upload(filePath,selectedImage).then(() =>{
      console.log('image updated successfully..!');
      console.log(postData)

      this.storage.ref(filePath).getDownloadURL().subscribe( URL => {
        postData.postImgPath = URL
        console.log(postData);

        if(formStatus == 'Edit'){
          this.updateData(id,postData)
        }
        else{

          this.saveData(postData)
        }


        // this.afs.collection('posts').add(postData).then(docRef =>{
        //   this.toastr.success('Data Inserted Successfully ');})
      });


    }
  )


}

saveData(postData:any){
  // this is to seperate the collection and storage
  this.afs.collection('posts').add(postData).then(docRef =>{
    this.toastr.success('Data Inserted Successfully ');
    this.router.navigate(['/posts']);
  
  })
}


    loadData(){
      return this.afs.collection('posts').snapshotChanges().pipe(
      map(actions =>{ return actions.map(a =>{
        
      const data = a.payload.doc.data();
      const id = a.payload.doc.id
      return {id,data}
    })}
    ))
    }


    loadOneData(id:any){
      return this.afs.doc(`posts/${id}`).valueChanges();

    }

    updateData(id:any,postData:any){
      this.afs.doc(`posts/${id}`).update(postData).then(() => {
        this.toastr.success('Data Updated Successfully')
        this.router.navigate(['/posts']);
      })

    }


    deleteImage(postImgPath:any,id:any){
      this.storage.storage.refFromURL(postImgPath).delete().then(() =>{ 
        // in the  'this.storage.storage ' first is injected service and secnd one is cloud sorage
        this.deleteData(id)
      })
    } 
    
    deleteData(id:any){
      this.afs.doc(`posts/${id}`).delete().then(() =>{
        this.toastr.warning('Data Deleted ..!')
      })

    }


    markFeatured(id:any,featuredData:any){

      this.afs.doc(`posts/${id}`).update(featuredData).then( () =>
      this.toastr.info('Feature status Updated..!')
    )};

}
