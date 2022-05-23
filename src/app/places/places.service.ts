import { Injectable } from '@angular/core';
import { Place } from './place.module';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private _places: Place[] = [
    new Place(
      'p1',
      'Ha Noi',
      'Hà Nội là thủ đô, thành phố trực thuộc trung ương và là một đô thị loại đặc biệt của Việt Nam.',
      'https://bcp.cdnchinhphu.vn/thumb_w/640/334894974524682240/2022/3/7/quy-hoach-ha-noi-1-16466436850191543592786.jpg',
      300000,
      new Date('2019-01-01'),
      new Date('2019-12-01')
    ),

    new Place(
      'p2',
      'Ho Chi Minh',
      'Thành phố Hồ Chí Minh (thường được gọi là Sài Gòn) là một thành phố ở miền nam Việt Nam.',
      'https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/06/20/16/ho-chi-minh-city.jpg?width=1200',
      300000,
      new Date('2019-01-01'),
      new Date('2019-12-01')
    ),

    new Place(
      'p3',
      'Da Nang',
      'Đà Nẵng là một thành phố trực thuộc trung ương, nằm trong vùng Duyên hải Nam Trung Bộ Việt Nam.',
      'https://img.nhandan.com.vn/Files/Images/2021/03/23/40692162_9381807_image_a_23_1616-1616460198504.jpg',
      250000,
      new Date('2019-01-01'),
      new Date('2019-12-01')
    )
  ];
  constructor() { };
  get places(){
    // eslint-disable-next-line no-underscore-dangle
    return [...this._places];
  }

  getPlace(id: string){
    // eslint-disable-next-line no-underscore-dangle
    return {...this._places.find(p => p.id === id)};
  }
}
