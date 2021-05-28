import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute ,Params} from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode= false;
  recipeForm: FormGroup;

  constructor(private route : ActivatedRoute,
              private recipeServic : RecipeService) { }

  ngOnInit(){
    this.route.params
      .subscribe(
          (params: Params ) => {
            this.id= +params['id'];
            this.editMode= params['id'] != null;
            this.initForm();
            //console.log(this.editMode);
          }
        );
  }

  onSubmit(){
    //console.log(this.recipeForm);
    if(this.editMode){
      this.recipeServic.updateRecipe(this.id, this.recipeForm.value);
    }
    else{
      this.recipeServic.addRecipe(this.recipeForm.value);
    }
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name' : new FormControl(null, Validators.required),
        'amount' : new FormControl(null,[Validators.required])
      })
    );
  }

  private initForm(){
    let recipeName = '';
    let recipeImagePath = '';
    let description ='';
    let recipeIngredient = new FormArray([]);

    if(this.editMode){
      const recipe = this.recipeServic.getRecipe(this.id);
      recipeName= recipe.Name;
      recipeImagePath= recipe.ImagePath;
      description= recipe.Description;
      if(recipe['ingredients']){
        for(let ingredient of recipe.ingredients){
          recipeIngredient.push(
            new FormGroup({
              'name' : new FormControl(ingredient.Name, Validators.required),
              'amount' : new FormControl(ingredient.Amount,
                [Validators.required])
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name' : new FormControl(recipeName, Validators.required),
      'imagePath' : new FormControl(recipeImagePath,Validators.required),
      'description' : new FormControl(description,Validators.required),
      'ingredients' : recipeIngredient

    });
  }

  

}
