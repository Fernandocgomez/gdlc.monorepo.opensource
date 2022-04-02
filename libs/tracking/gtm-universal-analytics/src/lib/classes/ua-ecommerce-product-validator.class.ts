import { UaEcommerceProduct } from '../models';

export class UaEcommerceProductValidator {
	validate(products: UaEcommerceProduct[]): void {
		products.forEach((product: UaEcommerceProduct, index: number) => {
			this.validateProductId(product, index);
			this.validateProductPosition(product, index);
			this.validateProductName(product, index);
		});
	}

	validateAgainstEmptyProductArray(products: UaEcommerceProduct[]) {
		if (products.length < 1) {
			throw new Error(`UaEcommerceProduct can not be an empty Array.`);
		}
	}

	private validateProductPosition(
		product: UaEcommerceProduct,
		index: number,
	): void {
		if (product.position !== undefined && product.position <= 0) {
			throw new Error(
				`UaEcommerceProduct at index: ${index} has an invalid value. Position can not be a number less than 1.`,
			);
		}
	}

	private validateProductName(
		product: UaEcommerceProduct,
		index: number,
	): void {
		if (!product.name) {
			throw new Error(
				`UaEcommerceProduct at index: ${index} has an invalid value. Name can not be an empty string.`,
			);
		}
	}

	private validateProductId(product: UaEcommerceProduct, index: number): void {
		if (!product.id) {
			throw new Error(
				`UaEcommerceProduct at index: ${index} has an invalid value. Id can not be an empty string.`,
			);
		}
	}
}
