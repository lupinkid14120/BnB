import { Injectable } from '@angular/core';
import { Booking } from './booking.model';

@Injectable({providedIn: 'root'})
export class BookingService{
  private _bookings: Booking[]=[
    {
      id: 'xyz',
      placeId: 'p1',
      placeTitle: 'Ha Noi',
      guestNumber: 2,
      userId: 'abc'
    }
  ];
  get bookings(){
    // eslint-disable-next-line no-underscore-dangle
    return [...this._bookings];
  }
}
