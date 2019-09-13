import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';

@Component({
    selector: 'app-dishdetail',
    templateUrl: './dishdetail.component.html',
    styleUrls: ['./dishdetail.component.scss']
  })

  export class DishdetailComponent implements OnInit {

    dish: Dish;
    dishes: Dish[];
  
    constructor(private dishservice: DishService,
      private location: Location,
      private activatedroute: ActivatedRoute) { }
  
    ngOnInit() { 
      // const id = this.route.snapshot.params['id'];
      // this.dishservice.getDish(id);
      // .then((dish: Dish) => this.dish = dish);
      this.dishservice.getFeaturedDish()
      .subscribe((dish) => this.dish = dish);

      // this.dishservice.getDishes()
      // .subscribe((dishes) => this.dishes = dishes);
      
    }

    goBack(): void {
      this.location.back();
    }
  
  };