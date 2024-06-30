import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../models/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {
  categoryArray!: any;
  formCategory: any;
  formStatus: string = 'Add';
  catogoryId: String = '';

  constructor(private categoryService: CategoriesService) {}

  ngOnInit(): void {
    this.categoryService.loadData().subscribe((val) => {
      this.categoryArray = val;
      // console.log(val)

      // console.log(val[0].data);
    });
  }

  onSubmit(formData: any) {
    let categoryData: Category = {
      category: formData.value.category,
      // status:'active' you get this err because you add the interface in the interface only category is present adding additional will give err
      // here the category  is name given to the input tag in html means value.category
    };
    if (this.formStatus == 'Add') {
      this.categoryService.saveData(categoryData);
      // console.log(categoryData);
      formData.reset();
    } else if (this.formStatus == 'Edit') {
      this.categoryService.updataData(this.catogoryId, categoryData);
      formData.reset();
      this.formStatus='Add';
    }

    //  let subCategoryData={
    //   subCategory:'subCategory1'
    //  }
    // this.afs.collection('categories').add(categoryData).then(docRef => {console.log(docRef);
      // QUERY PATH mETHD

      // this.formStatus.doc(`categories/${docRef.id}/subcategories/${docRef1.Id}`)

    //   this.afs.collection('categories').doc(docRef.id).collection('subcategories').add(subCategoryData).then( (docRef1)=>{console.log(docRef1)})
    // })
    // .catch(err =>  console.log(err))
  }

  onEdit(category: any, id: any) {
    this.formCategory = category;
    this.formStatus = 'Edit';
    this.catogoryId = id;
  }
    // Delete data

    onDelete(id:any){
      this.categoryService.deleteData(id)

    }




}
