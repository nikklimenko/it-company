import {Component, OnInit} from '@angular/core';
import {OwlOptions} from "ngx-owl-carousel-o";
import {ServicesType} from "../../../types/services.type";
import {AdvantagesType} from "../../../types/advantages.type";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit{

  staticImagePath: string = './assets/images/page/';

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: false
  }

  services: ServicesType[] = [
    {
      category: 'development',
      image: 'services-1.png',
      title: 'Website development',
      description: 'In a short time we will create a high-quality and most importantly selling website to promote your business!',
      price: 1000
    },
    {
      category: 'promotion',
      image: 'services-2.png',
      title: 'Promotion',
      description: 'Do you need a high-quality SMM specialist or a competent targetologist? We are ready to provide you with the “Promotion” service at the highest level!',
      price: 3500
    },
    {
      category: 'advertising',
      image: 'services-3.png',
      title: 'Advertising',
      description: 'No business or specialist can do without advertising. Turning to us, we guarantee a rapid increase in customers due to properly configured advertising.',
      price: 1000
    },
    {
      category: 'copywriting',
      image: 'services-4.png',
      title: 'Copywriting',
      description: 'Our copywriters are ready to write you any selling texts that will not only ensure the growth of coverage, but also help you reach a new level in sales.',
      price: 750
    },
  ];

  advantages: AdvantagesType[] = [
    {
      title: 'Masterfully involve the audience in the process.',
      description: 'We increase the percentage of engagement in a short period of time.'
    },
    {
      title: 'We are developing a bomb visual concept.',
      description: 'Our experts know how to create a unique image of your project.'
    },
    {
      title: 'We create powerful funnels with the help of texts.',
      description: 'Our copywriters create not only tasty texts, but also cool funnels.'
    },
    {
      title: 'We help you sell more.',
      description: 'We not only help develop a sales strategy, but also adjust it to the needs of the customer.'
    },
  ]
  constructor() {
  }

  ngOnInit() {
  }


}
