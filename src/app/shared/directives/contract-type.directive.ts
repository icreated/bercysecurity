import {AfterViewInit, Directive, ElementRef, Input, inject} from '@angular/core';

@Directive({
  standalone: false,
  selector: '[appContractType]'
})
export class ContractTypeDirective implements AfterViewInit {

  private el = inject(ElementRef);

  @Input()
  appContractType = '';

  ngAfterViewInit(): void {
    switch (this.appContractType) {
      case 'SOLAR BELT':
        this.el.nativeElement.name = 'sunny';
        this.el.nativeElement.color = 'danger';
        break;
      case 'LUNAR':
        this.el.nativeElement.name = 'moon';
        this.el.nativeElement.color = 'warning';
        break;
      default:
        this.el.nativeElement.name = 'radio-button-on';
        this.el.nativeElement.color = 'primary';
    }
  }


}
