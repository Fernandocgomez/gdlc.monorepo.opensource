import { UaEcommercePromotion } from '../models';

export class UaEcommercePromotionValidator {
	validate(promotions: UaEcommercePromotion[]): void {
		this.validateAgainstEmptyPromotionArray(promotions);

		promotions.forEach((promotions: UaEcommercePromotion, index: number) => {
			this.validatePromotionName(promotions, index);
			this.validatePromotionId(promotions, index);
		});
	}

	private validateAgainstEmptyPromotionArray(
		promotions: UaEcommercePromotion[],
	) {
		if (promotions.length < 1) {
			throw new Error(`UaEcommercePromotion can not be an empty Array.`);
		}
	}

	private validatePromotionName(
		promotions: UaEcommercePromotion,
		index: number,
	): void {
		if (!promotions.name) {
			throw new Error(
				`UaEcommercePromotion at index: ${index} has an invalid value. Name can not be an empty string.`,
			);
		}
	}

	private validatePromotionId(
		promotions: UaEcommercePromotion,
		index: number,
	): void {
		if (!promotions.id) {
			throw new Error(
				`UaEcommercePromotion at index: ${index} has an invalid value. Id can not be an empty string.`,
			);
		}
	}
}
