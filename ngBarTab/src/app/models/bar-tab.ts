import { HttpClient, HttpHandler } from '@angular/common/http';
import { DrinkService } from './../services/drink.service';
import { Drink } from './drink';


export class BarTab {
  id: number;
  drinks: Drink[];
  location: string;
  createdAt: string;

  constructor(
    private drinkService: DrinkService,
    id?: number ,
    // drinks?: Drink[] ,
    location?: string ,
    createdAt?: string
  ) {
    this.id = id;
    if ( id ) {
      this.drinkService.show( id ).subscribe(
        (data) => {
          this.drinks = data;
          console.log(this.drinks);
          console.log('reload(): todo items retrieved');
        } ,
        (err) => {
          console.error('reload(): retrieval failed');
          console.error(err);
      });
    } else {
      this.drinks = [];
    }
      this.location = location;
      this.createdAt = createdAt;
    }
}
