import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, NavigationEnd, RouterEvent } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from './home.component';
import { Subject } from 'rxjs';
import { MoleculesModule } from '../../molecules/molecules.module';
import { PATHS } from 'src/app/util/paths.constants';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let router: Router;
  let routerEventsSubject: Subject<RouterEvent>;


  beforeEach(async () => {
    routerEventsSubject = new Subject<RouterEvent>();

    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [RouterTestingModule, MoleculesModule],
      providers: [
        {
          provide: Router,
          useValue: {
            url: '/',
            events: routerEventsSubject.asObservable(),
            navigate: jasmine.createSpy('navigate'),
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set showMoleculeListItem to true for relevant routes', () => {
    routerEventsSubject.next(new NavigationEnd(0, '/', PATHS.TECHNOLOGY));
    expect(component.showMoleculeListItem).toBe(true);

    routerEventsSubject.next(new NavigationEnd(0, '/', PATHS.CAPACITY));
    expect(component.showMoleculeListItem).toBe(true);

    routerEventsSubject.next(new NavigationEnd(0, '/', PATHS.BOOTCAMP));
    expect(component.showMoleculeListItem).toBe(true);
  });

  it('should set showMoleculeListItem to false for non-relevant routes', () => {
    routerEventsSubject.next(new NavigationEnd(0, '/', '/non-relevant-route'));
    expect(component.showMoleculeListItem).toBe(false);
  });
});

