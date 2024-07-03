import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from '../../models/post';
import { PostsService } from '../../services/posts.service';
import { ActivatedRoute } from '@angular/router';
import { get } from '@angular/fire/database';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.css',
})
export class NewPostComponent implements OnInit {

  // for disable
  flagValue=true

  permalink: string = '';
  imgSrc: any = './previewimage.png';
  selectedImg: any;
  categories: any;

  postForm !: FormGroup;

  post:any

  FormStatus:string="Add New"

  docId!:string

  constructor(
    private categoryService: CategoriesService,
    private fb: FormBuilder,
    private postService:PostsService,
    private route:ActivatedRoute,
     
  ) 
  
  {
    this.route.queryParams.subscribe((val:any) => {
      // console.log(val);
      this.docId=val.id

      if(this.docId){
       this.flagValue=true
        this.postService.loadOneData(val.id).subscribe( post =>  {
          this.post=post
  
          this.postForm = this.fb.group({
            title: [this.post.title, [Validators.required, Validators.minLength(10)]],
            permalink: [this.post.permalink, Validators.required],
            excerpt: [this.post.excerpt, [Validators.required, Validators.minLength(50)]],
            category: [`${this.post.category.categoryId}-${this.post.category.category}`, Validators.required],
            postImg: [this.post.postImgPath, Validators.required],
            content: [this.post.content, Validators.required],
          });
  
          this.imgSrc=this.post.postImgPath
          this.FormStatus='Edit'
  
        })

      }
      else{
        this.flagValue=true,
        this.postForm = this.fb.group({
          
          title: ['', [Validators.required, Validators.minLength(10)]],
          permalink: ['', Validators.required],
          excerpt: ['', [Validators.required, Validators.minLength(50)]],
          category: ['', Validators.required],
          postImg: ['', Validators.required],
          content: ['', Validators.required],
        });
        
      }

    });
    






   
  }
  ngOnInit(): void {
    this.categoryService.loadData().subscribe((val) => {
      this.categories = val;
    });
  }
  get fc() {
    return this.postForm.controls  //not use  this one
  }

  // title to perlink
  onTitleChange($event: any) {
    // console.log($event.target.value); this is how you get the value from the event

    const title = $event.target.value;
    this.permalink = title.replace(/\s/g, '-'); // this is a RE for  removing spaces

    // console.log(this.permlink)
  }

  //// image preview  change
  showPreview($event: any) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imgSrc = e.target?.result;
    };

    reader.readAsDataURL($event.target.files[0]);
    this.selectedImg = $event.target.files[0];



  }

  onSubmit(){

    // console.log(this.postForm.value)  this prints form data
    
     let splited= this.postForm.value.category.split('-');
      // console.log(splited)  this is to split the data
    const postData :Post = {
      title:this.postForm.value.title,
      permalink: this.postForm.value.permalink,
      category :{
        categoryId:splited[0],
        category:splited[1]
      },
      postImgPath:'',
      excerpt:this.postForm.value.excerpt,
      content:this.postForm.value.content,
      isFeatured:false,
      views:0,
      status:'new',
      createdAt:new Date()

    }
    // console.log(postData); this will priint the  post Data
    this.postService.uploadImage(this.selectedImg , postData,this.FormStatus,this.docId);

    this.postForm.reset();
    this.imgSrc = './previewimage.jpg';


  }




}
