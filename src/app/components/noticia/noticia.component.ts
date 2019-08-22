import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../interfaces/interfaces';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia: Article;
  @Input() indice: number;
  @Input() enFavoritos: boolean;

  constructor(private iab: InAppBrowser, private actionsheetCtrl: ActionSheetController,
              private socialSharing: SocialSharing,
              private dataLocal: DataLocalService) {}

  ngOnInit() {}

  abrirNoticia() {
    const browser = this.iab.create(this.noticia.url, '_system');
  }

  async lanzarMenu() {

    let guardarBorrarBtn;

    if (this.enFavoritos) {

      guardarBorrarBtn = {
        text: 'Delete Favorite',
        icon: 'trash',
        handler: () => {
          this.dataLocal.borrarFavorito(this.noticia);

        }
      };

    } else {
      guardarBorrarBtn = {
        text: 'Saved in Favorites',
        icon: 'star',
        handler: () => {
          this.dataLocal.guardarFavoritos(this.noticia);

        }
      };
    }

    const actionSheet = await this.actionsheetCtrl.create({
      buttons: [{
        text: 'Share',
        icon: 'share',
        handler: () => {
          this.socialSharing.share(
            this.noticia.title,
            this.noticia.source.name,
            '',
            this.noticia.url
          );
          // console.log('Share clicked');
        }
      },
      guardarBorrarBtn,
     {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          // console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

  }

}
