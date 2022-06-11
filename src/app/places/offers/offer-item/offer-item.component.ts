import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Place } from '../../place.module';

@Component({
  selector: 'app-offer-item',
  templateUrl: './offer-item.component.html',
  styleUrls: ['./offer-item.component.scss'],
})
export class OfferItemComponent implements OnInit {
  @Input() offer: Place;

  constructor(private route: Router) { }

  ngOnInit() {}

  onLog(){
    console.log(this.offer.id);
    // this.route.navigate(['/', 'places','tabs','offers',this.offer.id]);
  }
}
