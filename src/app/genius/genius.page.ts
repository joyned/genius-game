import { Component, IterableDiffer, IterableDiffers, OnInit } from '@angular/core';
import { GeniusColor } from '../model/GeniusColor';

@Component({
  selector: 'app-genius',
  templateUrl: './genius.page.html',
  styleUrls: ['./genius.page.scss'],
})
export class GeniusPage implements OnInit {

  public image = '../../assets/down_left.png'

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

  // Jogo ja começou
  public started = false;

  // Resetar?
  public reset = false;

  // Nao mostra botão de inio ao resetar
  public notShowInitButtonOnRestart = false;

  // Carregando a tela?
  public isIniting = true;

  public avaliableColors: GeniusColor[] = [
    {
      id: 1,
      image: '../../assets/sup_left.png'
    },
    {
      id: 2,
      image: '../../assets/sup_right.png'
    },
    {
      id: 3,
      image: '../../assets/down_left.png'
    },
    {
      id: 4,
      image: '../../assets/down_right.png'
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
  }
  

  public startGame() {
    this.started = true;
    this.initAttributes();
    this.generateNumberAndBlinkSquareWithTimeOut();
    this.isIniting = false;
  }

  public restart() {
    this.reset = false;
    this.startGame();
    this.notShowInitButtonOnRestart = true;
  }

  private initAttributes() {
    this.geniusColorList = [];
    this.selectedColor = new GeniusColor();
    this.rounds = 0;
    this.reset = false;
    this.currentIndex = 0;
    this.clickUserTimes = 0;
  }

  public selectColor(color: GeniusColor) {
    if (this.started) {
      this.piscaQuadradoAoClicar(color);
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
        this.reset = true;
        this.started = false;
      }
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
        let shand = document.getElementsByClassName('piscado_' + element.id) as HTMLCollectionOf<HTMLElement>;

        if (shand.length != 0) {
          shand[0].style.display = 'block';
        }
        setTimeout(() => {
          if (shand.length != 0) {
            shand[0].style.display = 'none';
          }
        }, 500);
      }, index * 1000);
    });
  }

  private piscaQuadradoAoClicar(color: GeniusColor) {
    let shand = document.getElementsByClassName('piscado_' + color.id) as HTMLCollectionOf<HTMLElement>;
    if (shand.length != 0) {
      shand[0].style.display = 'block';
    }
    setTimeout(() => {
      if (shand.length != 0) {
        shand[0].style.display = 'none';
      }
    }, 500);
  }

}
