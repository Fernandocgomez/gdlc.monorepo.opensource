import { Component } from '@angular/core';

@Component({
	template: '<p>Mock Component</p>',
})
class MockComponent {}

export const routesMockUp = [
	{
		path: '',
		component: MockComponent,
	},
	{
		path: 'test',
		component: MockComponent,
	},
];
