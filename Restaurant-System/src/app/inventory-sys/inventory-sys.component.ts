import { Component, OnInit, Inject } from '@angular/core';
import { InventoryDto } from '../Models/inventoryDto';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogTitle } from '@angular/material';
import { InventoryService } from '../inventory.service';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ReservationDto } from '../Models/reservationDto';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-inventory-sys',
  templateUrl: './inventory-sys.component.html',
  styleUrls: ['./inventory-sys.component.css']
})
export class InventorySysComponent implements OnInit {
  displayedColumns: string[] = ['ItemId', 'ItemName', 'ItemQuantity', 'ItemPrice', 'Edit', 'Delete'];
  dataSource: InventoryDto[];
  selectedValue: string;
  constructor(public dialog: MatDialog,
              private router: Router,
              private currentRoute: ActivatedRoute,
              private service: InventoryService) { }

  ngOnInit() {
    this.service.getInvItemList().subscribe(result => {
      this.dataSource = result;
      console.log(this.dataSource);
    });
  }

  reloadPage(){
    this.ngOnInit();
  }

  deleteItem(element : InventoryDto){
    this.service.deleteInvItem(element.id).subscribe();
    console.log(element.id);
  }

  //DIALOG BOX
  openAddInventoryItem(): void{
    const dialogRef = this.dialog.open(AddInventoryItem, {
      width: '325px'
    });

    dialogRef.afterClosed();
  }

  openEditInventoryItem(element: InventoryDto): void{
    this.service.newInvItem = element;
    const dialogRef = this.dialog.open(EditInventoryItem, {
      width: '325px'
    });

    dialogRef.afterClosed();
  }

  openMeatPrices(): void{
    const dialogRef = this.dialog.open(MeatPrices, {
      width: '60%'
    });

    dialogRef.afterClosed();
  }

  openMeatPurchase(): void{
    const dialogRef = this.dialog.open(MeatPurchase, {
      width: '325px'
    });

    dialogRef.afterClosed();
  }
}

@Component({
  selector: 'app-add-inventory-item',
  templateUrl: './add-inventory-item.component.html',
})
export class AddInventoryItem implements OnInit{
  isValid: boolean = true;

  constructor(public dialogRef: MatDialogRef<AddInventoryItem>,
    public service: InventoryService
    ) {}

  ngOnInit() { this.resetForm(); }

  onNoClick(): void {
    this.dialogRef.close();
  }

    //INFO TO API
  resetForm(form?: NgForm) {
    if (form = null)
      form.resetForm();
    this.service.newInvItem = {
      id: null,
      itemName: null,
      itemQuantity: 0,
      itemMaxQuantity: 0,
      itemMinQuantity: 0,
      itemPrice: 0
    };
  }
  
    validateForm() {
      if (this.service.newInvItem.itemName == null)
        this.isValid = false;
      else if (this.service.newInvItem.itemQuantity == 0)
        this.isValid = false;
      else if (this.service.newInvItem.itemMaxQuantity == 0)
        this.isValid = false;
      else
        this.isValid = true;
  
  
      return this.isValid;
    }
  
    onSubmit(form: NgForm) {
      if (this.validateForm()) {
        this.service.saveInventory().subscribe(res => {
          this.resetForm();
          this.dialogRef.close();
        })
      }
    }

}

@Component({
  selector: 'app-edit-inventory-item',
  templateUrl: './edit-inventory-item.component.html',
})
export class EditInventoryItem implements OnInit{
  isValid: boolean = true;
  dataSource: InventoryDto[];
  selectedValue: string;
  newQuan: number;
  newPrice: number;
  tmpItem: InventoryDto;

  constructor(public dialogRef: MatDialogRef<EditInventoryItem>,
    public service: InventoryService
    ) {this.service.getInvItemList().subscribe(result => {
      this.dataSource = result;
    });}

  ngOnInit() {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  
    onSubmit(form: NgForm) {
      this.service.saveInventory().subscribe(res => {
        this.dialogRef.close();
      });
    }

}

@Component({
  selector: 'app-meat-purchase',
  templateUrl: './meat-purchase.component.html',
})
export class MeatPurchase implements OnInit{
  dataSource: InventoryDto[];
  purchaseItems: InventoryDto[] = [];

  constructor(public dialogRef: MatDialogRef<EditInventoryItem>,
    public service: InventoryService
    ) {this.service.getInvItemList().subscribe(result => {
      this.dataSource = result;
      result.forEach(res => {
        if(this.checkName(res.itemName))
          this.purchaseItems.push(res);
      });
    });}

  ngOnInit() {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  checkName(name: string): boolean{
    var tmp = name.toLowerCase();
    if(tmp == "beef")
      return true;
    else if(tmp == "chicken")
      return true;
    else if(tmp == "pork")
      return true;
    else
      return false;
  }
  
  onSubmit(form: NgForm) {
    this.service.saveInventory().subscribe(res => {
      this.dialogRef.close();
    });
  }

}

@Component({
  selector: 'app-meat-prices',
  templateUrl: './meat-prices.component.html',
})
export class MeatPrices implements OnInit{
  Radar=[];

  ngOnInit(){

    this.Radar = new Chart('radarChart', {
      type: 'radar',
    data: {
    labels: ["Beef $/lb", "Pork $/lb", "Chicken $/lb"],
    datasets: [{
        label: 'Current Months Pricing',
        data: [3.758 ,3.298 , 3.062],
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)'
        ],
        borderColor: [
            'rgba(255,99,132,1)'
        ],
        borderWidth: 1,
        pointBackgroundColor: [
          'rgba(255,99,132, 0.5)',
          'rgba(102, 255, 153, 0.5)',
          'rgba(51, 153, 255, 0.5)'
        ]
    }, {
      label: '2017-2019 Average Monthly Pricing',
      data: [3.690 ,3.341 , 3.133],
        backgroundColor: [
            'rgba(54, 162, 235, 0.2)'
        ],
        borderColor: [
            'rgba(51, 51, 51, 1)'
        ],
        borderWidth: 1,
        pointBackgroundColor:[
          'rgba(120, 120, 120, 0.5)'
        ]
    }]
    }, 
    options: {
      title:{
          text:"Meat Price Trends (Information Provided By: Department of Labor's Bureau of Labor Statistics)",
          display:true
      }
    }
    });
  }
}