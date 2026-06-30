import { Component } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class Tab3Page {

  fotoPerfil: string = 'https://ionicframework.com/docs/img/demos/avatar.svg';

  constructor(private toastController: ToastController) {}

  async tomarFoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        promptLabelHeader: 'Cambiar Foto de Perfil',
        promptLabelPhoto: 'Elegir de la Galería',
        promptLabelPicture: 'Tomar Foto'
      });

      if (image.webPath) {
        this.fotoPerfil = image.webPath;
        this.mostrarToast('¡Foto de perfil actualizada!');
      }

    } catch (error) {
      console.log('El usuario cerró la cámara o denegó los permisos:', error);
    }
  }

  async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2500,
      position: 'bottom',
      color: 'dark'
    });
    await toast.present();
  }
}