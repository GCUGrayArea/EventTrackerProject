import { BarTab } from './bar-tab';

export class Drink {
  id: number;
  name: string;
  price: number;
  tab: BarTab = null;

  constructor(
    id?: number ,
    name?: string ,
    price?: number
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}
