import { Component, OnInit , OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { IonItemSliding, MenuController } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { Place } from '../place.module';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit, OnDestroy {

  offers: Place[];
  isLoading = false;
  private placesSub: Subscription
  constructor(private placesService: PlacesService, private route: Router) { }

  ngOnInit() {
    this.placesSub =  this.placesService.places.subscribe(places => {
      this.offers = places;
    })
  }

  ionViewWillEnter(){
    this.isLoading = true;
    this.placesService.fetchPlaces().subscribe(() => {
      this.isLoading = false;
    });
  }

  onEdit(offerId: string, slidingItem: IonItemSliding){
    slidingItem.close();
    this.route.navigate(['/', 'places','tabs','offers','edit',offerId]);
  }

  ngOnDestroy(){
    if(this.placesSub){
      this.placesSub.unsubscribe();
    }
  }
}
