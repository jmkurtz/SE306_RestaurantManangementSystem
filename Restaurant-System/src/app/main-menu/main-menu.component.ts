import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoginSystemComponent } from '../login-system/login-system.component';
import { RegSystemComponent } from '../reg-system/reg-system.component';
import { UserService } from '../users.service';
import { UserDto } from '../Models/userDto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {
  events: string[] = [];
  opened: boolean;
  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));

  constructor(public dialog: MatDialog, public service: UserService, public router: Router) { }

  ngOnInit() { 
    this.getUserData();
  }

  curlogout(){
    localStorage.clear();
    this.router.navigate(['homepage']);
    this.ngOnInit();
  }

  locObj: UserDto;
  getUserData(){
    if(localStorage.getItem('userdata') === null){
        this.locObj = {id: null,firstName: null,lastName: null,passWord: null,emailAddress: null,isAdmin: null,priorityStatus: null};
    }
    else{
      this.locObj = JSON.parse(localStorage.getItem('userdata'));
    }
  }

  openLogin(): void{
    const dialogRef = this.dialog.open(LoginSystemComponent, {
      width: '295px'
    });

    dialogRef.afterClosed().subscribe(res => {
      this.ngOnInit();
    });

  }

  resetForm() {
    this.service.loginRequest = {
      id: null,
      firstName: null,
      lastName: null,
      emailAddress: null,
      passWord: null,
      isAdmin: false,
      priorityStatus: null
    };
  }

  openRegister(): void{
    this.resetForm();
    const dialogRef = this.dialog.open(RegSystemComponent, {
      width: '520px'
    });

    dialogRef.afterClosed();
  }

}
