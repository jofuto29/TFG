import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  public images: { src: string, alt: string }[] = [
    { src: './assets/img/rodal.png', alt: 'Imagen 1' },
    { src: './assets/img/rodal1.png', alt: 'Imagen 2' },
    { src: './assets/img/rodal2.png', alt: 'Imagen 3' },
    { src: './assets/img/rodal3.png', alt: 'Imagen 4' },
    { src: './assets/img/rodal4.png', alt: 'Imagen 5' },
    { src: './assets/img/rodal5.png', alt: 'Imagen 6' },
    { src: './assets/img/rodal6.png', alt: 'Imagen 7' }
  ];
  public currentImage = 0;


  public page_title: string;
  constructor(){
    this.page_title = 'Inicio';
  }

  ngOnInit(): void {
    setInterval(() => {
      this.showNextImage();
    }, 3000);
  }

  showNextImage(): void {
    this.currentImage = (this.currentImage + 1) % this.images.length;
  }

  
}
