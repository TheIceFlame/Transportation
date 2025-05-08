import {Directive, ElementRef, OnInit, Renderer2} from '@angular/core';
import {Router} from '@angular/router';

@Directive({
  selector: '[appConditionalMenu]'
})
export class ConditionalMenuDirective implements OnInit {
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      const currentRoute = this.router.url;
      if (currentRoute.includes('SignIn') || currentRoute.includes('Registration')) {
        this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
      } else {
        this.renderer.setStyle(this.el.nativeElement, 'display', 'flex');
      }
    });
  }
}
