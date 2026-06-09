import { Component } from '@angular/core';
import { AlertController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule
  ]
})
export class Tab2Page {

  opciones: string[] = [
    'Pizza Italiana 🍕',
    'Sushi Handroll 🍣',
    'Ensalada César 🥗',
    'Hamburguesa con Papas 🍔',
    'Tacos al Pastor 🌮'
  ];

  estiloRotacion: string = 'rotate(0deg)';
  estaGirando: boolean = false;
  anguloActual: number = 0;

  constructor(private alertController: AlertController) {}

  async girarRuleta() {
    if (this.estaGirando) return;

    this.estaGirando = true;

    const indiceGanador = Math.floor(Math.random() * this.opciones.length);
    const opcionGanadora = this.opciones[indiceGanador];
    const gradosPorOpcion = 360 / this.opciones.length;
    const anguloDestino = 360 - (indiceGanador * gradosPorOpcion) - (gradosPorOpcion / 2);
    const vueltasExtras = (Math.floor(Math.random() * 4) + 5) * 360;
    
    this.anguloActual += vueltasExtras + anguloDestino;
    this.estiloRotacion = `rotate(${this.anguloActual}deg)`;

    setTimeout(() => {
      this.mostrarGanador(opcionGanadora);
      this.estaGirando = false;
    }, 4000);
  }

  async mostrarGanador(premio: string) {
    const alert = await this.alertController.create({
      header: '¡Decisión Tomada! 🎉',
      subHeader: 'La ruleta ha hablado:',
      message: `Te toca almorzar:\n\n**${premio}**`,
      backdropDismiss: false, 
      buttons: [
        {
          text: 'Quizás otra vez',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: '📍 Buscar locales cerca',
          handler: () => {
            const terminoBusqueda = premio.replace(/[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD00-\uDFFF]/g, '').trim();
            const urlMaps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(terminoBusqueda + ' cerca de mi')}`;
            window.open(urlMaps, '_blank');
          }
        }
      ]
    });

    await alert.present();
  }
}
