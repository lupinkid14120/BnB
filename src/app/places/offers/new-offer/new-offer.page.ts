import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import {format, parseISO} from 'date-fns';

import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.page.html',
  styleUrls: ['./new-offer.page.scss'],
})
export class NewOfferPage implements OnInit {
  // @ViewChild('popoverDatetime', {read: ElementRef}) datetime: ElementRef;
  // @ViewChild('popoverDatetime2', {read: ElementRef}) datetime2: ElementRef;
  // @ViewChildren(IonDatetime) datetimmList: IonDatetime;
  dateValue = '';
  dateValue2 = '';
  form: FormGroup;

  constructor(private placesService: PlacesService, private router: Router, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null,{
        updateOn: 'blur',
        validators:[Validators.required]
      }),
      description: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(180)]
      }),
      price: new FormControl(null,{
        updateOn: 'blur',
        validators: [Validators.required, Validators.min(1)]
      }),
      dateFrom: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      dateTo: new FormControl(null,{
        updateOn: 'blur',
        validators:[Validators.required]
      })
    });
  }

  onCreateOffer(){
    if(!this.form.valid){
      return;
    }
    this.loadingCtrl.create({
      message: 'Creatr place...'
    }).then(loadinEl =>{
      loadinEl.present();
      this.placesService
      .addPlace(
        this.form.value.title,
        this.form.value.description,
        this.form.value.price,
        new Date(this.form.value.dateFrom),
        new Date(this.form.value.dateTo)
      )
      .subscribe(place => {
        loadinEl.dismiss();
        this.form.reset();
        this.router.navigate(['/places/tabs/offers']);
      });
    });
  }

  formatDate(value: string) {
    return format(parseISO(value), 'MMM dd yyyy');
  }

  // done() {
  //   console.log(this.datetime.nativeElement);
  //   console.log(this.dateValue);
  // }
  // cancel() {
  // }
  // done2() {
  //   console.log(this.datetime2.nativeElement);
  //   console.log(this.dateValue2);
  // }
}
