import {Component, OnInit} from '@angular/core';
import {OwlOptions} from "ngx-owl-carousel-o";
import {ServicesType} from "../../../types/services.type";
import {AdvantagesType} from "../../../types/advantages.type";
import {ArticleType} from "../../../types/article.type";
import {ArticleService} from "../../shared/services/article.service";
import {ReviewType} from "../../../types/review.type";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit{

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
  };
  customOptionsReview: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    margin: 25,
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
        items: 3
      },
      940: {
        items: 3
      }
    },
    nav: false
  };

  staticImagePath: string = './assets/images/page/';

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
  ];

  reviews: ReviewType[] = [
    {
      name: "Stanislav",
      image: 'review1.png',
      review: "Thanks a lot to ITStorm for a wonderful blog with useful articles! It was they who prompted me to delve into the topic of SMM and start my career."
    },
    {
      name: "Irina",
      image: 'review2.png',
      review: "I turned to ITStorm for the help of a copywriter. Never regretted it! The guys really put their heart and soul into what they do, and every text I get is looking forward to putting it online."
    },
    {
      name: "Masha",
      image: 'review3.png',
      review: "The ITStorm team has done the impossible in such a short period of time: it has grown from a simple promotion service company into a powerful blog about the importance of a personal brand."
    },
    {
      name: "David Wilson",
      image: 'review4.jpg',
      review: "I'm impressed with the SMM and web development services provided by this IT company. They have a deep understanding of social media platforms and their web development team creates visually appealing and user-friendly websites."
    },
    {
      name: "Olivia Anderson",
      image: 'review5.jpg',
      review: "This IT company is a reliable partner for SMM and web development. Their SMM strategies helped me grow my social media following, and their web development team delivered a responsive website that perfectly represents my brand."
    },
    {
      name: "Daniel Rodriguez",
      image: 'review6.jpg',
      review: "I couldn't be happier with the SMM and web development services provided by this IT company. Their team is professional and responsive, and they delivered exceptional results. I highly recommend them for all your digital needs."
    },
  ];

  popularArticles: ArticleType[] = [];

  constructor(private articleService: ArticleService) {
  }

  ngOnInit() {

    this.articleService.getPopularArticles()
      .subscribe((data:ArticleType[]) => {
        this.popularArticles = data;
      })


  }


}
