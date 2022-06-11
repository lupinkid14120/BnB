import { Component, OnDestroy, OnInit } from '@angular/core';
import { SegmentChangeEventDetail } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';

import { Place } from '../place.module';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {
  loadedPlaces: Place[];
  listLoadedPlaces: Place[];
  relevantPlaces: Place[];
  isLoading = false;
  private placeSub: Subscription;
  private chosenFilter = 'all';
  constructor(private placesService: PlacesService, private authService: AuthService) { }

  ngOnInit() {
    // this.loadedPlaces =
    this.placeSub = this.placesService.places.subscribe(place => {
      this.loadedPlaces = place;
      if(this.chosenFilter === 'all'){
        this.relevantPlaces = this.loadedPlaces;
        this.listLoadedPlaces = place.slice(1);
      }else{
        this.relevantPlaces = this.loadedPlaces.filter(place => place.id !== this.authService.userId);
        this.listLoadedPlaces = this.relevantPlaces.slice(1);
      }
    });
  }

  ionViewWillEnter(){
    this.isLoading = true;
    this.placesService.fetchPlaces().subscribe(() => {
      this.isLoading = false;
    })
  }

  onFillterUpdate(event: CustomEvent<SegmentChangeEventDetail>){
      if(event.detail.value === 'all'){
        this.relevantPlaces = this.loadedPlaces;
        this.listLoadedPlaces = this.relevantPlaces.slice(1);
        this.chosenFilter = 'all';
      }else{
        this.relevantPlaces = this.loadedPlaces.filter(
          place => place.userId !== this.authService.userId
        );
        this.listLoadedPlaces = this.relevantPlaces.slice(1);
        this.chosenFilter = 'bookable';
      }
  }

  ngOnDestroy() {
    if(this.placeSub){
      this.placeSub.unsubscribe();
    }
  }
}
