import {Directive, ElementRef, HostListener, Renderer2} from '@angular/core';

@Directive({
  selector: '[appHoverToggle]'
})
export class HoverToggleDirective {

  private descriptionEl: HTMLElement | null;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.descriptionEl = this.el.nativeElement.querySelector('.description');
  }

  @HostListener('mouseenter') onMouseEnter() {
    if (this.descriptionEl) {
      this.renderer.setStyle(this.descriptionEl, 'transition', 'all 0.3s ease');
      this.renderer.setStyle(this.descriptionEl, 'opacity', '1');
      this.renderer.setStyle(this.descriptionEl, 'height', 'auto');
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this.descriptionEl) {
      this.renderer.setStyle(this.descriptionEl, 'transition', 'all 0.3s ease');
      this.renderer.setStyle(this.descriptionEl, 'opacity', '0');
      this.renderer.setStyle(this.descriptionEl, 'height', '0');
      this.renderer.setStyle(this.descriptionEl, 'overflow', 'hidden');
    }
  }

}
