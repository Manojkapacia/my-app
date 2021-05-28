import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

 

  recipes: Recipe[];

  
  constructor(private recipeService : RecipeService,
              private router : Router,
              private route : ActivatedRoute ) { }

  ngOnInit() {
    this.recipeService.recipeChanged
      .subscribe(
        (recipe : Recipe[]) => {
            //console.log(recipe);
          this.recipes=recipe;
        });
    //this.recipes = this.recipeService.getRecipes();
    this.recipes = this.recipeService.getRecipes();  
  }

  onNewRecipe(){

    this.router.navigate(['new'], { relativeTo: this.route }); 

  }

}