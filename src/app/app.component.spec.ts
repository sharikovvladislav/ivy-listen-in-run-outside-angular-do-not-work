import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should listen click without runOutsideAngular wrapper`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const debugElement = fixture.debugElement;
    const component = fixture.componentInstance;

    spyOn(component, 'handlerFromNgZone').and.callThrough();
    fixture.detectChanges();

    const elementWithListenerDebugElement = debugElement.query(By.css('.click-me'));

    const event = {};

    elementWithListenerDebugElement.triggerEventHandler('click', event);

    expect(component.handlerFromNgZone).toHaveBeenCalledWith(event);
  });

  it(`should listen click wrapped with runOutsideAngular`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const debugElement = fixture.debugElement;
    const component = fixture.componentInstance;

    spyOn(component, 'handlerFromOutsideNgZone').and.callThrough();
    fixture.detectChanges();

    const elementWithListenerDebugElement = debugElement.query(By.css('.click-me'));

    const event = {};

    elementWithListenerDebugElement.triggerEventHandler('click', event);

    expect(component.handlerFromOutsideNgZone).toHaveBeenCalledWith(event);
  });
});
