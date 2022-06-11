import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { Booking } from './booking.model';
import { BookingService } from './booking.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit, OnDestroy {
  loadedBookings: Booking[];
  isLoading = false;
  private bookinhSub: Subscription;

  constructor(private bookingService: BookingService, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.bookinhSub = this.bookingService.bookings.subscribe(bookings => {
      this.loadedBookings = bookings
    })
  }

  ionViewWillEnter(){
    this.isLoading = true;
    this.bookingService.fetchBookings().subscribe(() => {
      this.isLoading = false;
    })
  }

  onCancelBooking(bookingId: string, slidingEl: IonItemSliding){
    slidingEl.close();
    this.loadingCtrl.create({message:'Canceling ...'}).then(loadingEl => {
      loadingEl.present();
      this.bookingService.cancelBooking(bookingId).subscribe(() => {
        loadingEl.dismiss();
      });
    })
  }

  ngOnDestroy() {
    if(this.bookinhSub){
      this.bookinhSub.unsubscribe();
    }
  }
}
