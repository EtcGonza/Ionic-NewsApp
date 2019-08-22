import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  noticiasFavoritas: Article [] = [];


  constructor(private storage: Storage, public ToastCtrl: ToastController) {
  this.cargarFavoritos();
  }

  async presentToast(mensaje: string) {
    const toast = await this.ToastCtrl.create({
      message: mensaje,
      duration: 1500
    });
    toast.present();
  }


  guardarFavoritos(noticia: Article) {

    const existe = this.noticiasFavoritas.find(noti => noti.title === noticia.title);

    if (!existe) {
      this.noticiasFavoritas.unshift(noticia);
      this.storage.set('favoritos', this.noticiasFavoritas);
    }

    this.presentToast('Saved in Favorites');

  }

  async cargarFavoritos() {
    const favoritos =  await this.storage.get('favoritos');

    if (favoritos) {
      this.noticiasFavoritas = favoritos;
    } else {
      this.noticiasFavoritas = [];
    }

  }

  borrarFavorito(noticia: Article) {
    this.noticiasFavoritas = this.noticiasFavoritas.filter( noti => noti.title !== noticia.title );
    this.storage.set('favoritos', this.noticiasFavoritas);
    this.presentToast('Delete Favorite');
  }

}
