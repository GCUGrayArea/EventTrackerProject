import { DrinkService } from './../../services/drink.service';
import { BarTabService } from './../../services/bar-tab.service';
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { Component, OnInit } from '@angular/core';
import { BarTab } from 'src/app/models/bar-tab';
import { Drink } from 'src/app/models/drink';

@Component({
  selector: 'app-bar-tab-display',
  templateUrl: './bar-tab-display.component.html',
  styleUrls: ['./bar-tab-display.component.css']
})
export class BarTabDisplayComponent implements OnInit {

  newTab: BarTab = new BarTab( this.drinkService );
  newDrink: Drink = new Drink();
  editDrink: Drink = null;
  selectedTab: BarTab = null;
  editTab: BarTab = null;
  totalAllTabs: number = 0;
  howManyTabs: number = 0;
  tabs: BarTab[];

  constructor( private barTabService: BarTabService , private drinkService: DrinkService ) { }

  tabTotal() {
    let sum = 0;
    for ( let tab of this.tabs ) {
      for ( let drink of tab.drinks ) {
        sum += drink.price;
      }
    }

    this.totalAllTabs = sum;
    this.howManyTabs = this.tabs.length;

  }

  reloadTabs() {
    this.barTabService.index().subscribe(
      (data) => {
        console.log('RETRIEVAL SUCCESSFUL');
        this.tabs = data;
      } ,
      (err) => {
        console.error('RETRIEVAL FAILED');
        console.error(err);
      });
  }

  selectTab( tab: BarTab ) {
    this.selectedTab = tab;
  }

  deleteTab( id: number ) {
    this.barTabService.destroy( id ).subscribe(
      (data) => {
        console.log('DELETE SUCCESSFUL');
        this.reloadTabs();
      } ,
      (err) => {
        console.error('DELETE FAILED');
        console.error(err);
      });
  }

  total( tab: BarTab ): number {
    let sum = 0;
    for ( let drink of tab.drinks ) {
      sum += drink.price;
    }
    return sum;
  }

  numberOfDrinksOnTab( tab: BarTab ) {
    return tab.drinks.length;
  }

  createTab() {
    return this.barTabService.create(this.newTab).subscribe(
      (data) => {
        console.log('TAB CREATED');
        this.reloadTabs();
      } ,
      (err) => {
        console.error('TAB CREATION FAILED');
        console.error(err);
      });
  }

  addDrinkToSelectedTab() {
    this.newDrink.tab = new BarTab( this.drinkService );
    this.newDrink.id = -1;
    this.newDrink.tab.id = this.selectedTab.id;
    console.log(this.newDrink);
    this.drinkService.create( this.newDrink , this.selectedTab.id ).subscribe(
      (data) => {
        console.log('DRINK ADDED TO TAB');
        this.reloadTabs();
        this.barTabService.show(this.selectedTab.id).subscribe(
          (data) => {
            console.log('RETRIEVAL SUCCESSFUL');
            this.selectedTab = data;
            this.newDrink = new Drink();
          } ,
          (err) => {
            console.error('RETRIEVAL FAILED');
            console.error(err);
          });
      } ,
      (err) => {
        console.error('DRINK CREATION FAILED');
        console.error(err);
      });
  }

  deleteDrink( drink: Drink ) {
    this.drinkService.destroy( drink.id ).subscribe(
      (data) => {
        console.log('DRINK DELETE SUCCESSFUL');
        this.reloadTabs();
        this.barTabService.show(this.selectedTab.id).subscribe(
          (data) => {
            console.log('RETRIEVAL SUCCESSFUL');
            this.selectedTab = data;
          } ,
          (err) => {
            console.error('RETRIEVAL FAILED');
            console.error(err);
          });
      } ,
      (err) => {
        console.error('DRINK DELETE FAILED');
        console.error(err);
      });
  }

  updateDrink( tabId: number ) {

    this.editDrink.tab = new BarTab( this.drinkService );
    this.editDrink.tab.id = tabId;
    this.drinkService.update( this.editDrink ).subscribe(
      (data) => {
        console.log('DRINK UPDATED');
        this.reloadTabs();
        this.barTabService.show(this.selectedTab.id).subscribe(
          (data) => {
            console.log('RETRIEVAL SUCCESSFUL');
            this.selectedTab = data;
            this.editDrink = null;
          } ,
          (err) => {
            console.error('RETRIEVAL FAILED');
            console.error(err);
          });
      } ,
      (err) => {
        console.error('DRINK UPDATE FAILED');
        console.error(err);
      });
  }

  initializeDrinkEdit( drink: Drink ) {
    this.editDrink = drink;
  }

  initializeTabEdit( tab: BarTab ) {
    this.editTab = Object.assign( {} , tab );
  }

  updateTab() {
    this.editTab.createdAt += "T00:00:00";
    this.barTabService.update(this.editTab).subscribe(
      (data) => {
        this.reloadTabs();
        console.log("TAB UPDATE SUCCESSFUL");
        this.editTab = null;
      } ,
      (err) => {
        console.error('TAB UPDATE FAILED');
        console.error(err);
      }
    );
  }

  ngOnInit(): void {
    this.reloadTabs();
  }

}
