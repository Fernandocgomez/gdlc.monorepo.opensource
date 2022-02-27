import { GtmEvent, UaEcommerceEvent } from '../models';

import { GtmService } from '../services/gtm.service';

export abstract class UaEcommerceEventAbstraction {
	protected ecommerceEvent?: UaEcommerceEvent;
	protected eventCategory = 'ecommerce';

	constructor(protected gtmService: GtmService) {}

	protected abstract initEcommerceEvent(): void;

	protected transformToGtmEvent(): GtmEvent {
		return { ...this.ecommerceEvent, event: 'angularEcommerce' };
	}

	sendEventToTheDataLayer(): void {
		const gtmEvent = this.transformToGtmEvent();

		this.gtmService.clearEcommerceObject();
		this.gtmService.pushToDataLayer(gtmEvent);
	}
}
