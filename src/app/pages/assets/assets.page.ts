import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { AssetService } from '../../shared/services/asset.service';
import { I18nService } from '../../shared/services/i18n.service';

@Component({
  standalone: false,
  selector: 'app-assets',
  templateUrl: './assets.page.html',
  styleUrls: ['./assets.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssetsPage implements OnInit {

  protected assetService = inject(AssetService);
  protected i18n         = inject(I18nService);

  ngOnInit() {
    this.assetService.loadAssets();
  }

  doRefresh(event: any) {
    setTimeout(() => {
      this.assetService.loadAssets();
      event.target.complete();
    }, 1500);
  }
}
