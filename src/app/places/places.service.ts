import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Place } from './place.module';
import { BehaviorSubject, of } from 'rxjs';
import { take, map , tap, delay, switchMap} from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';

// new Place(
//   'p1',
//   'Ha Noi',
//   'Hà Nội là thủ đô, thành phố trực thuộc trung ương và là một đô thị loại đặc biệt của Việt Nam.',
//   'https://bcp.cdnchinhphu.vn/thumb_w/640/334894974524682240/2022/3/7/quy-hoach-ha-noi-1-16466436850191543592786.jpg',
//   300000,
//   new Date('2019-01-01'),
//   new Date('2019-12-01'),
//   'abc'
// ),

// new Place(
//   'p2',
//   'Ho Chi Minh',
//   'Thành phố Hồ Chí Minh (thường được gọi là Sài Gòn) là một thành phố ở miền nam Việt Nam.',
//   'https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/06/20/16/ho-chi-minh-city.jpg?width=1200',
//   300000,
//   new Date('2019-01-01'),
//   new Date('2019-12-01'),
//   'abc'
// ),

// new Place(
//   'p3',
//   'Da Nang',
//   'Đà Nẵng là một thành phố trực thuộc trung ương, nằm trong vùng Duyên hải Nam Trung Bộ Việt Nam.',
//   'https://img.nhandan.com.vn/Files/Images/2021/03/23/40692162_9381807_image_a_23_1616-1616460198504.jpg',
//   250000,
//   new Date('2019-01-01'),
//   new Date('2019-12-01'),
//   'xyz'
// )

interface PlaceData{
  availableFrom: string;
  availableTo: string;
  description: string;
  imageUrl: string;
  price: number;
  title: string;
  userId: string;
}

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private _place = new BehaviorSubject<Place[]>([]);
  constructor(private authService: AuthService, private http: HttpClient) { };
  get places(){
    // eslint-disable-next-line no-underscore-dangle
    return this._place.asObservable();
    // return [...this._places];
  }

  fetchPlaces(){
    return this.http
      .get<{[key:string]: PlaceData}>('https://ionic-angular-course-76840-default-rtdb.asia-southeast1.firebasedatabase.app/offered-places.json')
      .pipe(
        map(resData => {
          const places = [];
          for(const key in resData){
            if(resData.hasOwnProperty(key)){
              places.push(
                new Place(
                  key,
                  resData[key].title,
                  resData[key].description,
                  resData[key].imageUrl,
                  resData[key].price,
                  new Date(resData[key].availableFrom),
                  new Date(resData[key].availableTo),
                  resData[key].userId
                )
              )
            }
          }
          return places;
          // return [];
        }),
        tap(places => {
          this._place.next(places);
        })
      );
  }

  getPlace(id: string){
    // eslint-disable-next-line no-underscore-dangle
    return this.http
      .get<PlaceData>(
        `https://ionic-angular-course-76840-default-rtdb.asia-southeast1.firebasedatabase.app/offered-places/${id}.json`
      )
      .pipe(
        map(placeData => {
          return new Place(
            id,
            placeData.title,
            placeData.description,
            placeData.imageUrl,
            placeData.price,
            new Date(placeData.availableFrom),
            new Date(placeData.availableTo),
            placeData.userId
          );
        })
      );
  }

  addPlace(title: string, description: string, price: number, dateFrom: Date, dateTo: Date){
    let generatedId: string;
    const newPlace = new Place(
      Math.random().toString(),
      title,
      description,
      'https://img.nhandan.com.vn/Files/Images/2021/03/23/40692162_9381807_image_a_23_1616-1616460198504.jpg',
      price,
      dateFrom,
      dateTo,
      this.authService.userId
    );
    return this.http.post<{name: string}>('https://ionic-angular-course-76840-default-rtdb.asia-southeast1.firebasedatabase.app/offered-places.json',{
      ...newPlace,
      id: null
    })
    .pipe(
      switchMap(resData => {
        generatedId = resData.name;
        return this.places;
      }),
      take(1),
      tap(places => {
        newPlace.id = generatedId;
        this._place.next(places.concat(newPlace));
    }))
    // return this.places.pipe(
    //   take(1),
    //   delay(1000),
    //   tap(places => {
    //     this._place.next(places.concat(newPlace));
    //   })
    // );
  }

  updatePlace(placeId: string, title: string, description: string){
    let updatePlases: Place[];
    return this.places.pipe(
      take(1),
      switchMap(places => {
        if(!places || places.length <= 0){
          return this.fetchPlaces();
        }else{
          return of(places);
        }
      }),
      switchMap(places => {
        const updatePlaceIndex = places.findIndex(pl => pl.id === placeId);
        updatePlases = [...places];
        const oldPlace = updatePlases[updatePlaceIndex];
        updatePlases[updatePlaceIndex] = new Place(
          oldPlace.id,
          title,
          description,
          oldPlace.imageUrl,
          oldPlace.price,
          oldPlace.availableFrom,
          oldPlace.availableTo,
          oldPlace.userId
        );
        return this.http.put(
          `https://ionic-angular-course-76840-default-rtdb.asia-southeast1.firebasedatabase.app/offered-places/${placeId}.json`,
          {...updatePlases[updatePlaceIndex], id: null}
        );
      }),
      tap(() => {
        this._place.next(updatePlases);
      })
    )
  }
}
