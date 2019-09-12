import { Component, OnInit } from '@angular/core';
import { Leader } from "../shared/leader";
import { LeaderService } from '../services/leader.service';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})

export class AboutComponent implements OnInit {

  leader: Leader[];
  leaders: Leader[];
  dishes: Dish[]

  constructor(
    private leaderService: LeaderService,
    private dishService: DishService) { }
  ngOnInit() {

    this.dishService.getDishes()
    .then(dishes => this.dishes = dishes);

    this.leaderService.getLeaders()
    .then(leaders => this.leaders = leaders);


    // this.leader = this.leaderservice.getFeaturedLeader();
    // this.leaders = this.leaderservice.getLeaders();
  }

}
