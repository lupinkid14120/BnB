import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { delay, take, tap, switchMap, map } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';
import { Booking } from './booking.model';


interface BookingData{
  bookedFrom: string;
  bookedTo: string;
  firstname: string;
  guestNumber: number;
  lastName: string;
  placeId: string;
  placeImage: string;
  placeTitle: string;
  userId:string
}
@Injectable({providedIn: 'root'})
export class BookingService{
  private _bookings =  new  BehaviorSubject<Booking[]>([]);
  get bookings(){
    // eslint-disable-next-line no-underscore-dangle
    return this._bookings.asObservable();
  }

  constructor(private authService: AuthService, private http: HttpClient){}

  addBooking(
    placeId: string,
    placeTitle: string,
    placeImage: string,
    firstName: string,
    lastName: string,
    guestNumber: number,
    dateFrom: Date,
    dateTo: Date,
  ){
    let generatedId: string;
    const newBooking = new Booking(
      Math.random().toString(),
      placeId,
      this.authService.userId,
      placeTitle,
      placeImage,
      firstName,
      lastName,
      guestNumber,
      dateFrom,
      dateTo
    );
    return this.http.post<{name: string}>('https://ionic-angular-course-76840-default-rtdb.asia-southeast1.firebasedatabase.app/bookings.json',{
      ...newBooking,
      id: null
    })
    .pipe(
      switchMap(resData => {
        generatedId = resData.name;
        return this.bookings;
      }),
      take(1),
      tap(bookings => {
        newBooking.id = generatedId;
        this._bookings.next(bookings.concat(newBooking));
    }))
    // return this.bookings.pipe(
    //   take(1),
    //   delay(1000),
    //   tap(bookings => {
    //     this._bookings.next(bookings.concat(newBooking));
    //   })
    // );
  }

  cancelBooking(bookingId: string){
    return this.http.delete(
      `https://ionic-angular-course-76840-default-rtdb.asia-southeast1.firebasedatabase.app/bookings/${bookingId}.json`
    )
      .pipe(
        switchMap(() => {
          return this.bookings;
        }),
        take(1),
        tap(bookings => {
          this._bookings.next(bookings.filter(b => b.id !== bookingId));
        })
    );
  }

  fetchBookings(){
    return this.http.get<{[key:string]: BookingData}>(
      `https://ionic-angular-course-76840-default-rtdb.asia-southeast1.firebasedatabase.app/bookings.json?orderBy="userId"&equalTo="${
        this.authService.userId
      }"`
    )
    .pipe(
      map(bookingData => {
        const bookings = [];
        for(const key in bookingData){
          if(bookingData.hasOwnProperty(key)){
            bookings.push(
              new Booking(
                key,
                bookingData[key].placeId,
                bookingData[key].userId,
                bookingData[key].placeTitle,
                bookingData[key].placeImage,
                bookingData[key].firstname,
                bookingData[key].lastName,
                bookingData[key].guestNumber,
                new Date(bookingData[key].bookedFrom),
                new Date(bookingData[key].bookedTo),
              )
            )
          }
        }
        return bookings;
        // return [];
      }),
      tap(bookings => {
        this._bookings.next(bookings);
      })
    );
  }
}

