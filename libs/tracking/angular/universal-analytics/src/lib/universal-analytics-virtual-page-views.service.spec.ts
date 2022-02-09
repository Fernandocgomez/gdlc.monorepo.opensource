import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NavigationEnd, Router } from '@angular/router';

import { UniversalAnalyticsVirtualPageViewsService } from './universal-analytics-virtual-page-views.service';

import { Observable } from 'rxjs';

import { MockComponent } from './utilities/mock.component';

const routes = [
  {
    path: '',
    component: MockComponent
  },
  {
    path: 'test',
    component: MockComponent
  }
]

interface GtmEvent {
	event: string;

	[key: string]: any;
}


describe('UniversalAnalyticsVirtualPageViewsService', () => {
  let service: UniversalAnalyticsVirtualPageViewsService;
  let router: Router;

  const navigateToTestRoute = () => {
    router.navigate(['test']);
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
				{
					provide: 'TrackingGoogleTagManagerConfig',
					useValue: { id: 'test_id' },
				},
			],
      imports: [
				RouterTestingModule.withRoutes(routes)
			]
    });

    service = TestBed.inject(UniversalAnalyticsVirtualPageViewsService);
    router = TestBed.inject(Router);

    service.trackPageViews();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  describe('#navigationEndObservable', () => {
    it('should be an Observable of type NavigationEnd', (done) => {

      expect(service['navigationEndObservable']).toBeInstanceOf(Observable);

      service['navigationEndObservable']?.subscribe((event) => {
        expect(event).toBeInstanceOf(NavigationEnd);
        done();
      });

      navigateToTestRoute();
    })
  });

  describe('#trackPageViews', () => {
    let spyOnCreateObservable: jest.SpyInstance<any, unknown[]>;
    let spyOnListenForNewValuesOnObservable: jest.SpyInstance<any, unknown[]>;

    beforeEach(() => {
      spyOnListenForNewValuesOnObservable = jest.spyOn(
        service as any,
        'listenForNewValuesOnObservable'
      );

      spyOnCreateObservable = jest.spyOn(
        service as any,
        'createObservable'
      );

      service.trackPageViews();

    });

    it('should call #createObservable', () => {
      expect(spyOnCreateObservable).toHaveBeenCalled();
    });

    it('should call #listenForNewValuesOnObservable', () => {
      expect(spyOnListenForNewValuesOnObservable).toHaveBeenCalled();
    });

  });

  describe('#createObservable', () => {
    it('should return an Observable of type NavigationEnd', (done) => {
      const observable: Observable<NavigationEnd> = service['createObservable']();

      expect(observable).toBeInstanceOf(Observable);

      observable.subscribe((event) => {
        expect(event).toBeInstanceOf(NavigationEnd);
        done();
      });

      navigateToTestRoute();
    });
  });

  describe('#listenForNewValuesOnObservable', () => {
    
    describe('when navigating to /test route', () => {
      
      it('should call #triggerPageView once', async() => {

        const spyOnTriggerPageView = jest.spyOn(
          service as any,
          'triggerPageView'
        );

        await navigateToTestRoute();

        expect(spyOnTriggerPageView).toBeCalledTimes(1);
      });

    });

  });

  describe('#triggerPageView', () => {

    describe('when navigating to /test route', () => {
      let pageViewEvent: GtmEvent | undefined;

      beforeEach(async() => {

        await navigateToTestRoute();

        pageViewEvent = window.dataLayer.find((gtmObj) => {
          return gtmObj.event === 'pageView';
        });

      });
      
      it('should push a pageView event to the dataLayer', async() => {
        expect(pageViewEvent?.event).toBe('pageView');
      
      })

      it('should push an GTM event with the property url equal to /test', async() => {
        expect(pageViewEvent?.['url']).toBe('/test');
      });

    });

  })

});
