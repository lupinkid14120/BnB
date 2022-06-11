import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {format, parseISO} from 'date-fns';
import { ModalController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

import { Place } from '../../places/place.module';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {
  @Input() selectedPlace: Place;
  @Input() selectedMode: 'select' | 'random';
  @ViewChild('f') form: NgForm;
  startDate: string = '';
  endDate: string = '';

  constructor(private modalCtrl: ModalController) { }
  ngOnInit() {
    const availableFrom = new Date(this.selectedPlace.availableFrom);
    const availableTo = new Date(this.selectedPlace.availableTo);
    if(this.selectedMode === 'random'){
      this.startDate = new Date(
        availableFrom.getTime() +
          Math.random() *
            (availableTo.getTime() -
              7*24*60*60*1000 -
              availableFrom.getTime())
      ).toISOString();

      this.endDate = new Date(
        new Date(this.startDate).getTime() +
          Math.random() *
            (new Date(this.startDate).getTime() +
              6*24*60*60*1000 -
              new Date(this.startDate).getTime())
      ).toISOString();
    }
  }

  onCancel(){
    this.modalCtrl.dismiss(null, 'cancel');
  }

  onBookPlace(){
    if(!this.form.valid || !this.datesValid){
      return;
    }
    this.modalCtrl.dismiss(
      {
        bookingData:{
          firstName: this.form.value['first-name'],
          lastName: this.form.value['last-name'],
          guestNumber: +this.form.value['guest-number'],
          startDate: new Date(this.form.value['date-input-from']),
          endDate: new Date(this.form.value['date-input-to']),
        }
      },'confirm');
    // console.log(this.form);
    console.log(this.form.value);
  }

  // formatDate(value: string) {
  //   return format(parseISO(value), 'MMM dd yyyy');
  // }

  datesValid(){
    const startDate = new Date(this.form.value['date-form']);
    const endDate = new Date(this.form.value['date-to']);
    return endDate > startDate;
  }
}
