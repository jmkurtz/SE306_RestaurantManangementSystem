import { Component, OnInit } from '@angular/core';

export interface Menu {
  name: string;
}

export interface MenuItem {
  name: string;
  calories: number;
  price: number;
  imageUrl: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  items: Menu[] = [
    {name: 'Chicken'},
    {name: 'Beef'},
    {name: 'Pork'},
  ];
   
  chickenItems: MenuItem[] = [
    {name: 'Chicken Tenders Platter', calories: 1460, price: 11.79, imageUrl: '../assets/img/menu/Chicken Tenders Platter.jpg'},
    {name: 'Fiesta Lime Chicken', calories: 1230, price: 12.99, imageUrl: '../assets/img/menu/Fiesta Lime Chicken.jpg'},
    {name: 'Bourbon Street Chicken and Shrimp', calories: 610, price: 14.59, imageUrl: '../assets/img/menu/Bourbon Street Chicken and Shrimp.jpg'},
    {name: 'Cedar Grilled Lemon Chicken', calories: 600, price: 12.79, imageUrl: '../assets/img/menu/Cedar Grilled Lemon Chicken.jpg'},
    {name: 'Chicken Wonton Stir Fry', calories: 790, price: 11.99, imageUrl: '../assets/img/menu/Chicken Wonton Stir Fry.jpg'},
    {name: 'Classic Chicken Parmesan', calories: 1560, price: 14.79, imageUrl: '../assets/img/menu/Classic Chicken Parmesan.jpg'},
    {name: 'Grilled Chicken Breast', calories: 190, price: 10.79, imageUrl: '../assets/img/menu/Grilled Chicken Breast.jpg'},
    {name: 'Three Cheese Chicken Penne', calories: 1380, price: 13.79, imageUrl: '../assets/img/menu/Three Cheese Chicken Penne.jpg'},
    {name: 'Four Cheese Mac and Cheese with Honey Pepper Chicken Tenders', calories: 1640, price: 13.79, imageUrl: '../assets/img/menu/Four Cheese Mac and Cheese with Honey Pepper Chicken Tenders.jpg'},
  ];
  beefItems: MenuItem[] = [
    {name: 'Classic Burger', calories: 780, price: 9.79, imageUrl: '../assets/img/menu/Classic Burger.jpg'},
    {name: 'Classic Cheeseburger', calories: 780, price: 10.29, imageUrl: '../assets/img/menu/Classic Cheeseburger.jpg'},
    {name: 'Classic Bacon Cheeseburger', calories: 880, price: 11.29, imageUrl: '../assets/img/menu/Classic Bacon Cheeseburger.jpg'},
    {name: '8 oz. Top Sirloin', calories: 270, price: 15.29, imageUrl: '../assets/img/menu/8 oz. Top Sirloin.jpg'},
    {name: '6 oz. Top Sirloin', calories: 200, price: 13.59, imageUrl: '../assets/img/menu/6 oz. Top Sirloin.jpg'},
    {name: 'Bourbon Street Steak', calories: 650, price: 17.59, imageUrl: '../assets/img/menu/Bourbon Street Steak.jpg'},
    {name: 'Double-glazed Baby Back Ribs', calories: 950, price: 18.49, imageUrl: '../assets/img/menu/Double-glazed Baby Back Ribs.jpg'},
    {name: 'Half Rack Double-glazed Baby Back Ribs', calories: 470, price: 15.49, imageUrl: '../assets/img/menu/Half Rack Double-glazed Baby Back Ribs.jpg'},
  ];
  porkItems: MenuItem[] = [
    //{name: 'Stuffed Pork Chop', calories: 380, price: 10.29, imageUrl: '../assets/img/menu/Stuffed Pork Chop.jpg'},
    {name: 'Pork Belly Sandwhich', calories: 860, price: 9.79, imageUrl: '../assets/img/menu/Pork Belly Sandwhich.jpg'},
    {name: 'French Style Pork Chop', calories: 450, price: 13.59, imageUrl: '../assets/img/menu/French Style Pork Chop.jpg'},
    //{name: 'Parmesan Crusted Pork Loin', calories: 570, price: 11.29, imageUrl: '../assets/img/menu/Parmesan Crusted Pork Loin.jpg'},
    //{name: 'Spicy Barbecue Pork Belly', calories: 420, price: 10.79, imageUrl: '../assets/img/menu/Spicy Barbecue Pork Belly.jpg'},
  ];
  constructor() { }

  ngOnInit() {
  }

}
