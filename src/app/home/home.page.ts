import { Component, IterableDiffer, IterableDiffers } from '@angular/core';
import { Router } from '@angular/router';
import { GeniusColor } from '../model/GeniusColor';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router) { }


  ngOnInit(){

  }

  public goToGenius(){
    this.router.navigateByUrl('/genius');
  }

}
