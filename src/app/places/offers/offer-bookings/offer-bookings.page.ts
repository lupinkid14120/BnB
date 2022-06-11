import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { Place } from '../../place.module';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-offer-bookings',
  templateUrl: './offer-bookings.page.html',
  styleUrls: ['./offer-bookings.page.scss'],
})
export class OfferBookingsPage implements OnInit, OnDestroy {
  place: Place;
  private placeSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private placesService: PlacesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paraMap => {
      if(!paraMap.has('placeId')){
        this.navCtrl.navigateBack('/places/tabs/offers');
        return;
      }
      this.placeSub = this.placesService.getPlace(paraMap.get('placeId')).subscribe(place => {
        // console.log(place.id);
        this.place = place;
        // console.log(this.place.id);
      });
    });
  }

  onNav(){
    this.router.navigate(['/', 'places','tabs','offers','edit',this.place.id])
  }

  ngOnDestroy() {
    if(this.placeSub){
      this.placeSub.unsubscribe();
    }
  }
}
