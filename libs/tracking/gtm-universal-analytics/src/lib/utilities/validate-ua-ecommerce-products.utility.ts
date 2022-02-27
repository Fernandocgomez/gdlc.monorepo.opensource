import { UaEcommerceProduct } from '../models';

export function validateUaEcommerceProducts(
	products: UaEcommerceProduct[],
): void {
	products.forEach((product: UaEcommerceProduct, index: number) => {
		validatePosition(product, index);
		validateId(product, index);
		validateName(product, index);
	});
}

function validatePosition(product: UaEcommerceProduct, index: number): void {
	if (product.position !== undefined && product.position <= 0) {
		throw new Error(
			`UaEcommerceProduct at index: ${index} has an invalid value. Position can not be a number less than 1.`,
		);
	}
}

function validateName(product: UaEcommerceProduct, index: number): void {
	if (!product.name) {
		throw new Error(
			`UaEcommerceProduct at index: ${index} has an invalid value. Name can not be an empty string.`,
		);
	}
}

function validateId(product: UaEcommerceProduct, index: number): void {
	if (!product.id) {
		throw new Error(
			`UaEcommerceProduct at index: ${index} has an invalid value. Id can not be an empty string.`,
		);
	}
}
