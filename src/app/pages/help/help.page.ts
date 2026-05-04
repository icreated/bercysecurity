import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HelpPage implements OnInit {

  ngOnInit() {
  }

}
