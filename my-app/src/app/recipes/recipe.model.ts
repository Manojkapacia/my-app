import { Ingredient } from "../shared/ingredient.model";

export class Recipe {
    public Name : string;
    public Description : string;
    public ImagePath : string;
    public ingredients : Ingredient[];

    constructor (name:string, desc:string, image : string, ingredients : Ingredient[]) {

        this.Name= name;
        this.Description= desc;
        this.ImagePath= image;
        this.ingredients= ingredients;
    }
}