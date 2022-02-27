/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-rest-params */

import 'reflect-metadata';

import {
	validateUaEcommerceProducts,
	isArray,
	isEmptyArray,
} from '../utilities';

const uaEcommerceProducts = Symbol('UaEcommerceProducts');

// Method Decorator.
export function Validate(
	targetMethod: object,
	methodName: string,
	descriptor: TypedPropertyDescriptor<any>,
) {
	const method = descriptor.value;

	descriptor.value = function () {
		const uaEcommerceProductsParameters: number[] =
			Reflect.getOwnMetadata(uaEcommerceProducts, targetMethod, methodName) ||
			[];

		if (
			isArray(uaEcommerceProductsParameters) &&
			!isEmptyArray(uaEcommerceProductsParameters)
		) {
			for (const parameterIndex of uaEcommerceProductsParameters) {
				const argument = arguments[parameterIndex];

				if (isArray(argument) && !isEmptyArray(argument)) {
					validateUaEcommerceProducts(arguments[parameterIndex]);
				}
			}
		}
		return method.apply(this, arguments);
	};
}

// Argument Method Decorator.
export function UaEcommerceProducts(
	method: object,
	methodName: string | symbol,
	parameterIndex: number,
) {
	const existingUaEcommerceProductsParameters: number[] =
		Reflect.getOwnMetadata(uaEcommerceProducts, method, methodName) || [];

	existingUaEcommerceProductsParameters.push(parameterIndex);

	Reflect.defineMetadata(
		uaEcommerceProducts,
		existingUaEcommerceProductsParameters,
		method,
		methodName,
	);
}
