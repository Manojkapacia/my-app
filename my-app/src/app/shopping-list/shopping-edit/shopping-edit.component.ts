import { Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('fd') slForm: NgForm;
  subscription :Subscription;
  editMode=false;
  editNumber: number;
  editItem : Ingredient;
  constructor( private slService :ShoppingListService) { }

  ngOnInit() {
    this.subscription= this.slService.startedEditing
      .subscribe((index: number) => {
        this.editNumber=index;
        this.editMode=true;
        this.editItem= this.slService.getIngredient(index);
        this.slForm.setValue({
          name : this.editItem.Name,
          amount : this.editItem.Amount
        });

      });
  }

  onSubmit(form: NgForm){
    const data = form.value;
    const newIngredient = new Ingredient(data.name,data.amount);
    if(this.editMode){
      this.slService.updateIngredient(this.editNumber, newIngredient);
    }

    else{
      this.slService.addIngredient(newIngredient);
    }
    this.editMode=false;
    form.reset();
    
    //this.ingredientAdded.emit(newIngredient);
  }

  onClear(){
    this.slForm.reset();
    this.editMode=false;

  }

  onDelete(){
    this.slService.deleteIngredient(this.editNumber);
    this.onClear();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
