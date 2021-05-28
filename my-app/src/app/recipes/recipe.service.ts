import { Injectable} from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe} from './recipe.model';


@Injectable()
export class RecipeService {

  recipeChanged = new Subject<Recipe[]>();
  //recipeSelected = new Subject<Recipe>();

  constructor(private slService :ShoppingListService) { }

  private recipes: Recipe[] = [
    new Recipe('A Recipe Test','This recipe is very tesy and swee',
    'https://i1.wp.com/www.eatthis.com/wp-content/'+
    'uploads/2019/10/pumpkin-pad-thai-recipe.jpg?resize=640%2C360&ssl=1',
     [
       new Ingredient ('Meat',20),
       new Ingredient ('French Frise', 50)
     ]),
    new Recipe('A Recipe','This recipe is very bed and waste of money',
    'https://i1.wp.com/www.eatthis.com/wp-content/'+
    'uploads/2019/10/pumpkin-pad-thai-recipe.jpg?resize=640%2C360&ssl=1',
        [
          new Ingredient ('Buns', 15),
          new Ingredient ('Meat',30)
        ])
  ];

  getRecipes(){
    return this.recipes.slice();
  }

  getRecipe(index : number){
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients : Ingredient[]){
    this.slService.addIngredients(ingredients);

  }

  addRecipe(recipe : Recipe){
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe : Recipe){
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

}
