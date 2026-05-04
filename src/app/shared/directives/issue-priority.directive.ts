import {AfterViewInit, Directive, ElementRef, Input, inject} from '@angular/core';

@Directive({
  standalone: false,
  selector: '[appIssuePriority]'
})
export class IssuePriorityDirective implements AfterViewInit {

  private el = inject(ElementRef);

  @Input()
  appIssuePriority = '';


  ngAfterViewInit(): void {
    switch (this.appIssuePriority) {
      case 'P1':
        this.el.nativeElement.name = 'shield';
        this.el.nativeElement.color = 'danger';
        break;
      case 'P2':
        this.el.nativeElement.name = 'shield';
        this.el.nativeElement.color = 'warning';
        break;
      case 'P3':
        this.el.nativeElement.name = 'shield-half';
        this.el.nativeElement.color = 'secondary';
        break;
      case 'P4':
        this.el.nativeElement.name = 'shield-checkmark';
        this.el.nativeElement.color = 'success';
        break;
      default:
        this.el.nativeElement.name = 'shield-checkmark';
        this.el.nativeElement.color = 'medium';
    }
  }


}
