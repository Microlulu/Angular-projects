import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[pkmnBorderCard]'
})
export class BorderCardDirective {

  private initialColor: string = '#f5f5f5';
  private defaultColor: string = '#009688';
  private defaultHeight: number = 180;

  constructor(private el: ElementRef) { 
    this.setBorder(this.initialColor);
    this.setHeight(this.defaultHeight);
  }

  @Input ('pkmnBorderCard') borderColor: string; //alias
  // @Input() pkmnBorderCard: string; sans alias

  // HostListener is use to check what the user do
  // In this case : OnMouseEnter (same as hover) , OnMouseLeave (when the user do hover the element)
  @HostListener('mouseenter') onMouseEnter(){
    this.setBorder(this.borderColor || this.defaultColor);
  }
  // || means "or"

  @HostListener('mouseleave') onMouseLeave(){
    this.setBorder(this.initialColor);
  }
  setHeight(height: number){
    // nativeElement take the element directly in the DOM (HTML structure)
    this.el.nativeElement.style.height = `${height}px`;
  }
  private setBorder(color: string){
    let border = 'solid 4px' + color;
    this.el.nativeElement.style.border = border;
    
  }

}
