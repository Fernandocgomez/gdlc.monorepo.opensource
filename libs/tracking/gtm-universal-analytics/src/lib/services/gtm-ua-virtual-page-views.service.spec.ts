import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { GtmUaVirtualPageViewsService } from './gtm-ua-virtual-page-views.service';
import { GtmService } from './gtm.service';

import { Observable } from 'rxjs';

import { GtmEvent } from '../models/gtm-event.interface';

import { routesMockUp } from '../utilities/routes-mock-up.utility';

describe('GtmUaVirtualPageViewsService', () => {
	type SpyInstance = jest.SpyInstance<any, unknown[]>;

	let service: GtmUaVirtualPageViewsService;
	let gtmService: GtmService;
	let router: Router;
	let title: Title;

	let spyOnCreateNavigationEndObservable: SpyInstance;
	let spyOnListenForNewNavigationEndEvent: SpyInstance;
	let spyOnPushVirtualPageViewEvent: SpyInstance;

	const navigateToTestRoute = (): void => {
		router.navigate(['test']);
	};

	const spyOn = (method: string): SpyInstance => {
		return jest.spyOn(service as any, method);
	};

	const getLastElementOnDataLayer = (): GtmEvent => {
		const dataLayer = gtmService.getDataLayer();
		return dataLayer[dataLayer.length - 1];
	};

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{
					provide: 'GtmConfig',
					useValue: { id: 'test_id' },
				},
			],
			imports: [RouterTestingModule.withRoutes(routesMockUp)],
		});

		gtmService = TestBed.inject(GtmService);
		service = TestBed.inject(GtmUaVirtualPageViewsService);
		router = TestBed.inject(Router);
		title = TestBed.inject(Title);

		spyOnCreateNavigationEndObservable = spyOn('createNavigationEndObservable');
		spyOnListenForNewNavigationEndEvent = spyOn(
			'listenForNewNavigationEndEvent',
		);
		spyOnPushVirtualPageViewEvent = spyOn('pushVirtualPageViewEvent');

		title.setTitle('test');
		service.sendVirtualPageViews();
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	describe('#sendVirtualPageViews', () => {
		it('should invoke #createNavigationEndObservable', () => {
			expect(spyOnCreateNavigationEndObservable).toHaveBeenCalled();
		});

		it('should initialize navigationEndObservable property as an Observable of Navigation End', (done) => {
			expect(service['navigationEndObservable']).toBeInstanceOf(Observable);

			service['navigationEndObservable']?.subscribe((event) => {
				expect(event).toBeInstanceOf(NavigationEnd);
				done();
			});

			navigateToTestRoute();
		});

		it('should invoke #listenForNewNavigationEndEvent', () => {
			expect(spyOnListenForNewNavigationEndEvent).toHaveBeenCalled();
		});

		it('should set isSendingVirtualPageViews property to true', () => {
			expect(service['isSendingVirtualPageViews']).toBe(true);
		});
	});

	describe('#createNavigationEndObservable', () => {
		it('should return an Observable of type NavigationEnd', (done) => {
			const returnValue = service['createNavigationEndObservable']();

			expect(returnValue).toBeInstanceOf(Observable);

			returnValue.subscribe((event) => {
				expect(event).toBeInstanceOf(NavigationEnd);
				done();
			});

			navigateToTestRoute();
		});
	});

	describe('#listenForNewNavigationEndEvent', () => {
		it('should invoke #pushVirtualPageViewEvent when user navigate to another route', async () => {
			await navigateToTestRoute();

			expect(spyOnPushVirtualPageViewEvent).toBeCalledTimes(1);
		});
	});

	describe('#pushVirtualPageViewEvent', () => {
		const url = '/test';

		beforeEach(() => {
			service['pushVirtualPageViewEvent'](url);
		});

		it('should push a "virtualPageView" event to the dataLayer', () => {
			expect(getLastElementOnDataLayer().event).toBe('virtualPageView');
		});

		it('should passed the page title on the property title', () => {
			expect(getLastElementOnDataLayer()['title']).toBe(title.getTitle());
		});

		describe('argument "url"', () => {
			it('should be on the object pushed to the data layer under the property "url"', () => {
				expect(getLastElementOnDataLayer()['url']).toBe(url);
			});
		});
	});
});
