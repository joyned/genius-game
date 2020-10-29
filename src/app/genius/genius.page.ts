import { Component, IterableDiffer, IterableDiffers, OnInit } from '@angular/core';
import { GeniusColor } from '../model/GeniusColor';

@Component({
  selector: 'app-genius',
  templateUrl: './genius.page.html',
  styleUrls: ['./genius.page.scss'],
})
export class GeniusPage implements OnInit {

  // Cores que já foram sorteadas
  public geniusColorList: GeniusColor[];

  // Cor que o usuário selecionou
  public selectedColor: GeniusColor;

  // Numero aleatorio
  private randomNumber: number;

  // Index que o usuário está
  private currentIndex = 0;

  // Quantidades de vezes que foi apertada
  private clickUserTimes = 0;

  // Quantidade de vezes que o usuário acertou
  public rounds = 0;

  // Exibe botão reset
  public showReset = false;

  public avaliableColors: GeniusColor[] = [
    {
      id: 1,
      color: '#FF0000',
      selectedColor: '#000000'
    },
    {
      id: 2,
      color: '#00FF00',
      selectedColor: '#000000'
    },
    {
      id: 3,
      color: '#0000FF',
      selectedColor: '#000000'
    },
    {
      id: 4,
      color: '#FFFF00',
      selectedColor: '#000000'
    }
  ];

  iterableDiffer: IterableDiffer<GeniusColor>;

  constructor(private iterableDiffers: IterableDiffers) {
    this.iterableDiffer = iterableDiffers.find([]).create(null);
  }

  ngDoCheck() {
    let changes = this.iterableDiffer.diff(this.geniusColorList);
    if (changes) {
    }
  }

  ngOnInit(): void {
    // this.initAttributes();
    // this.generateNumberAndBlinkSquareWithTimeOut();
  }


  private initAttributes() {
    this.geniusColorList = [];
    this.selectedColor = new GeniusColor();
    this.rounds = 0;
    this.showReset = false;
    this.currentIndex = 0;
    this.clickUserTimes = 0;
  }

  public selectColor(color: GeniusColor) {
    const selectRightColor = this.geniusColorList[this.currentIndex].id === color.id;
    if (selectRightColor) {
      if (this.geniusColorList.length > 1) {
        this.currentIndex++;
        this.clickUserTimes++;
      }
      if ((this.clickUserTimes === this.geniusColorList.length) || this.geniusColorList.length === 1) {
        this.generateNumberAndBlinkSquareWithTimeOut();
        this.currentIndex = 0;
        this.clickUserTimes = 0;
        this.rounds++;
      }
    } else {
      this.rounds = 0;
      this.showReset = true;
    }
  }

  private generateRandomNumber() {
    this.randomNumber = Math.floor((Math.random() * 4) + 1);
    this.geniusColorList.push(this.avaliableColors.find(obj => {
      if (obj.id == this.randomNumber) {
        return obj;
      }
    }));
  }

  private generateNumberAndBlinkSquareWithTimeOut() {
    setTimeout(() => {
      this.generateRandomNumber();
      this.piscaQuadrado();
    }, 1000);
  }

  public piscaQuadrado() {
    this.geniusColorList.forEach(function (element, index) {
      setTimeout(() => {
        let shand = document.getElementsByClassName('color_' + element.id) as HTMLCollectionOf<HTMLElement>;

        if (shand.length != 0) {
          shand[0].style.background = element.selectedColor;
        }
        setTimeout(() => {
          if (shand.length != 0) {
            shand[0].style.background = element.color;
          }
        }, 500);
      }, index * 1000);
    });
  }

  private changeBackgroundColor(className: string, color: string) {
    let shand = document.getElementsByClassName(className) as HTMLCollectionOf<HTMLElement>;

    if (shand.length != 0) {
      shand[0].style.background = color;
    }
  }

}
