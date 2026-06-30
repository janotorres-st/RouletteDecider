import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform } from '@ionic/angular';

export interface HistorialGiro {
  id?: number;
  opcion: string;
  fecha: string;
}

@Injectable({
  providedIn: 'root'
})
export class DBService {
  
  private dbInstance!: SQLiteObject;
  private isDbReady: boolean = false;

  constructor(
    private platform: Platform,
    private sqlite: SQLite
  ) {
    this.platform.ready().then(() => {
      this.initDatabase();
    });
  }

  private initDatabase() {
    this.sqlite.create({
      name: 'roulette_decider.db',
      location: 'default'
    })
    .then((db: SQLiteObject) => {
      this.dbInstance = db;
      this.createTables();
    })
    .catch(e => {
      console.error('Error al abrir la base de datos SQLite:', e);
      this.isDbReady = true; 
    });
  }

  private createTables() {
    this.dbInstance.executeSql(`
      CREATE TABLE IF NOT EXISTS historial_giros (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        opcion TEXT NOT NULL,
        fecha TEXT NOT NULL
      )
    `, [])
    .then(() => {
      this.isDbReady = true;
      console.log('Persistencia SQLite: Tabla historial_giros lista.');
    })
    .catch(e => console.error('Error creando tablas en SQLite', e));
  }

  async guardarGiro(opcion: string): Promise<any> {
    const fechaActual = new Date().toLocaleString();
    if (!this.isDbReady) return Promise.reject('Base de datos SQLite no inicializada');
    
    return this.dbInstance.executeSql(
      'INSERT INTO historial_giros (opcion, fecha) VALUES (?, ?)', 
      [opcion, fechaActual]
    );
  }

  async obtenerHistorial(): Promise<HistorialGiro[]> {
    if (!this.isDbReady) return [];
    
    return this.dbInstance.executeSql('SELECT * FROM historial_giros ORDER BY id DESC', [])
      .then((res) => {
        let items: HistorialGiro[] = [];
        if (res.rows.length > 0) {
          for (let i = 0; i < res.rows.length; i++) {
            items.push({
              id: res.rows.item(i).id,
              opcion: res.rows.item(i).opcion,
              fecha: res.rows.item(i).fecha
            });
          }
        }
        return items;
      })
      .catch(e => {
        console.error('Error leyendo SQLite', e);
        return [];
      });
  }
}