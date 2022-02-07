import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

import { UniversalAnalyticsVirtualPageViewsService } from './universal-analytics-virtual-page-views.service';

import { RouterTestingModule } from '@angular/router/testing';
import { NavigationEnd, Router } from '@angular/router';

import { Observable } from 'rxjs';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '',
  template: '<p>Mock Product Editor Component</p>'
})
class MockComponent {}


describe('UniversalAnalyticsVirtualPageViewsService', () => {
  let service: UniversalAnalyticsVirtualPageViewsService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
				{
					provide: 'TrackingGoogleTagManagerConfig',
					useValue: { id: 'test_id' },
				},
			],
      imports: [
				RouterTestingModule.withRoutes([
          {
            path: '',
            component: MockComponent
          },
          {
            path: 'test',
            component: MockComponent
          }
        ])
			]
    });

    service = TestBed.inject(UniversalAnalyticsVirtualPageViewsService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  describe('#navigationEndObservable', () => {
    it('should be an Observable of type NavigationEnd', (done) => {
      service['navigationEndObservable']?.subscribe((event) => {
        expect(event).toBeInstanceOf(NavigationEnd);
        done();
      });

      router.navigate(['test']);
    })
  });

  describe('#currentUrlAfterRedirects', () => {
    it('should be of type string', () => {
      expect(typeof service['currentUrlAfterRedirects']).toBe('string');
    });
  });

  describe('#init', () => {
    it('should call #startTrackingPageViews', () => {
      const spyOnStartTrackingPageViews = jest.spyOn(
        service as any,
        'startTrackingPageViews'
      );
      
      service['init']();

      expect(spyOnStartTrackingPageViews).toHaveBeenCalled();
    });
  });

  describe('#startTrackingPageViews', () => {

    it('should call #createObservable', () => {
      const spyOnCreateObservable = jest.spyOn(
        service as any,
        'createObservable'
      );

      service['startTrackingPageViews']();

      expect(spyOnCreateObservable).toHaveBeenCalled();
    });

    it('should call #listenForNewValuesOnObservable', () => {
      const spyOnListenForNewValuesOnObservable = jest.spyOn(
        service as any,
        'listenForNewValuesOnObservable'
      );

      service['startTrackingPageViews']();

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

      router.navigate(['test']);
    });
  });

  describe('#listenForNewValuesOnObservable', () => {
    
    describe('when navigating to /test route', () => {

      it('should call #saveCurrentUrlAfterRedirectsValue once', async() => {
        const spyOnSaveCurrentUrlAfterRedirectsValue = jest.spyOn(
          service as any,
          'saveCurrentUrlAfterRedirectsValue'
        );

        await router.navigate(['test']);

        expect(spyOnSaveCurrentUrlAfterRedirectsValue).toBeCalledTimes(1);
      });
      
      it('should call #triggerPageView once', async() => {
        const spyOnTriggerPageView = jest.spyOn(
          service as any,
          'triggerPageView'
        );

        await router.navigate(['test']);

        expect(spyOnTriggerPageView).toBeCalledTimes(1);

      });

    });

  });

  describe('#saveCurrentUrlAfterRedirectsValue', () => {
    it('should update the current value of #currentUrlAfterRedirects for the new value emit by the Observable', async() => {
      const oldUrlAfterRedirectsValue = service['currentUrlAfterRedirects'];

      await router.navigate(['test']);

      const newUrlAfterRedirectsValue = service['currentUrlAfterRedirects'];

      expect(oldUrlAfterRedirectsValue).not.toBe(newUrlAfterRedirectsValue);
      expect(newUrlAfterRedirectsValue).toBe('/test');
    });
  })

  describe('#triggerPageView', () => {

    describe('when navigating to /test route', () => {
      
      it('should push a pageView event to the dataLayer', async() => {
        
        await router.navigate(['test']);

        const pageViewEvent = window.dataLayer.find((gtmObj) => {
          return gtmObj.event === 'pageView';
        });

        expect(pageViewEvent?.event).toBe('pageView');
      
      })

      it('should push an GTM event with the property url equal to /test', async() => {
        
        await router.navigate(['test']);

        const pageViewEvent = window.dataLayer.find((gtmObj) => {
          return gtmObj.event === 'pageView';
        });

        expect(pageViewEvent?.['url']).toBe('/test');

      });

    });

  })

});
