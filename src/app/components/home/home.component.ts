import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  headerConfig:any = {
    menuLeft: false,
    loggedIn: false
  };

  constructor(){}

  ngOnInit(){
  }
}
