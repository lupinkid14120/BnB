import { Component, OnInit } from '@angular/core';
import { SegmentChangeEventDetail } from '@ionic/angular';
import { Place } from '../place.module';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {
  loadedPlaces: Place[];
  listLoadedPlaces: Place[];
  constructor(private placesService: PlacesService) { }

  ngOnInit() {
    this.loadedPlaces = this.placesService.places;
    this.listLoadedPlaces = this.loadedPlaces.slice(1);
  }

  onFillterUpdate(event: CustomEvent<SegmentChangeEventDetail>){
    console.log(event.detail);
  }
}
