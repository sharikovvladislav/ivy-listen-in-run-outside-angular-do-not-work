import { Component, ViewChild, ElementRef, Renderer2, NgZone } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('ref', { static: true }) ref: ElementRef;
  title = 'latest-ng-ivy-boilerplate';

  constructor(private renderer: Renderer2, private ngZone: NgZone) {}

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      this.renderer.listen(this.ref.nativeElement, 'click', this.handlerFromOutsideNgZone);
    });

    this.renderer.listen(this.ref.nativeElement, 'click', this.handlerFromNgZone);
  }

  handlerFromNgZone(evt: MouseEvent) {
    console.log('>> clicked from NgZone', evt);
  }

  handlerFromOutsideNgZone(evt: MouseEvent) {
    console.log('>> clicked from outside NgZone', evt);
  }
}
