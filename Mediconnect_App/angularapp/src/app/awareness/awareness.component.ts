import { AfterViewInit, Component } from '@angular/core';
declare let Swiper: any;

@Component({
  selector: 'app-awareness',
  templateUrl: './awareness.component.html',
  styleUrls: ['./awareness.component.scss']
})
export class AwarenessComponent implements AfterViewInit {


  ngAfterViewInit() {
    const testiomnialData = [
      {
        avatar: "https://img.freepik.com/free-photo/woman-with-long-hair-yellow-hoodie-with-word-music-it_1340-39068.jpg",
        name: "John Smith",
        review: "Medi Connect made the organ donation process seamless and straightforward. I found a compatible donor within weeks, and today, I have a second chance at life. Thank you, Medi Connect!",
        location: 'New York, NY'
      },
      {
        avatar: "https://img.freepik.com/free-photo/close-up-portrait-young-bearded-man-white-shirt-jacket-posing-camera-with-broad-smile-isolated-gray_171337-629.jpg",
        name: "Sarah Johnson",
        review: "I registered as an organ donor through Medi Connect, and the support and guidance I received were exceptional. Knowing that I could potentially save a life is a wonderful feeling.",
        location: 'Los Angeles, CA'
      },
      {
        avatar: "https://img.freepik.com/free-photo/handsome-african-guy-with-stylish-haircut-taking-photo-digital-camera_171337-1345.jpg",
        name: "Mark Davis",
        review: "The team at Medi Connect is doing incredible work. They're not just connecting donors with recipients; they're building a community of people who care about saving lives.",
        location: 'Chicago, IL'
      },
      {
        avatar: "https://img.freepik.com/free-photo/pretty-smiling-joyfully-female-with-fair-hair-dressed-casually-looking-with-satisfaction_176420-15187.jpg",
        name: "Amanda Turner",
        review: "My family was in a desperate situation, and we were fortunate to find a donor through Medi Connect. The platform's speed and accuracy were truly lifesaving.",
        location: 'Houston, TX'
      },
      {
        avatar: "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg",
        name: "Michael Chang",
        review: "Medi Connect brings hope to those in need. Their dedication to organ donation is commendable, and their platform is user-friendly and effective.",
        location: 'San Francisco, CA'
      },
      {
        avatar: "https://img.freepik.com/free-photo/close-up-portrait-young-bearded-man-white-shirt-jacket-posing-camera-with-broad-smile-isolated-gray_171337-629.jpg",
        name: "Emily Rodriguez",
        review: "I registered as a donor on Medi Connect and found the process incredibly straightforward. It's empowering to know that I've taken a step toward saving a life.",
        location: 'Miami, FL'
      }, {
        avatar: "https://img.freepik.com/free-photo/handsome-african-guy-with-stylish-haircut-taking-photo-digital-camera_171337-1345.jpg",
        name: "Linda Carter",
        review: "Medi Connect's commitment to transparency and privacy in organ donation is truly impressive. I felt secure in every step of my journey as a donor.",
        location: 'Dallas, TX'
      }
    ]
    const slideHolder = document.querySelector("#slideHolder");
    if (slideHolder)
      for (let i of testiomnialData) slideHolder.innerHTML += `<div class="swiper-slide"> <div class="ImgHolder"><img class="img-avatar" src="${i.avatar}"></div><div class="ContentHolder"><h3>${i.name}</h3><p class="text-center mb-0">${i.location}</p><p class="mb-0">${i.review}</p></div></div>`

    const swiper = new Swiper('#craouselContainer', {
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 2.3,
      loop: true,
      spaceBetween: 30,
      effect: "coverflow",
      coverflowEffect: {
        rotate: 0,
        depth: 800,
        slideShadows: true,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      autoplay: { delay: 5000 }
    });
    window.onresize = queryResizer
    queryResizer();
    function queryResizer() {
      if (window.innerWidth < 724) swiper.params.slidesPerView = 2
      if (window.innerWidth > 501) swiper.params.slidesPerView = 2
      if (window.innerWidth > 724) swiper.params.slidesPerView = 2.3
      if (window.innerWidth < 501) swiper.params.slidesPerView = 1
      swiper.update()
    }
  }
  }
