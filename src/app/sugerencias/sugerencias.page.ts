import { Component, OnInit } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService, SugerenciaComunidad } from '../services/api';

@Component({
  selector: 'app-sugerencias',
  templateUrl: './sugerencias.page.html',
  styleUrls: ['./sugerencias.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SugerenciasPage implements OnInit {

  listaSugerencias: SugerenciaComunidad[] = [];
  cargando: boolean = true;

  constructor(
    private apiService: ApiService,
    private toastController: ToastController 
  ) { }

  ngOnInit() {
    this.cargarDatosDeLaAPI();
  }

  cargarDatosDeLaAPI() {
    this.cargando = true;
    
    this.apiService.obtenerSugerencias().subscribe({
      next: (data) => {
        this.listaSugerencias = data.slice(0, 10);
        this.cargando = false;
        localStorage.setItem('cache_sugerencias', JSON.stringify(this.listaSugerencias));
        console.log('API Online: Datos respaldados en persistencia local.');
      },
      error: async (err) => {
        console.error('Error detectado en la API Rest:', err);
        const datosPersistidos = localStorage.getItem('cache_sugerencias');
        
        if (datosPersistidos) {
          this.listaSugerencias = JSON.parse(datosPersistidos);
          this.mostrarAvisoOffline('Modo Offline: Mostrando datos almacenados anteriormente.');
        } else {
          this.mostrarAvisoOffline('Error de conexión y no hay datos respaldados.');
        }
        
        this.cargando = false;
      }
    });
  }

  async mostrarAvisoOffline(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000,
      position: 'bottom',
      color: 'warning'
    });
    await toast.present();
  }
}