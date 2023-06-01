import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  public images: { src: string, alt: string }[] = [
    { src: './assets/img/slider01.jpg', alt: 'Imagen 1' },
    { src: './assets/img/slider02.jpg', alt: 'Imagen 1' },
    { src: './assets/img/slider03.jpg', alt: 'Imagen 1' },
    { src: './assets/img/slider04.jpg', alt: 'Imagen 1' }
  ];
  public currentImage = 0;


  public page_title: string;
  constructor(){
    this.page_title = 'Inicio';
  }

  ngOnInit(): void {
    setInterval(() => {
      this.showNextImage();
    }, 4000);
  }

  showNextImage(): void {
    this.currentImage = (this.currentImage + 1) % this.images.length;
  }
}
