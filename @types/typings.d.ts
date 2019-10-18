interface HTMLElement {
	trigger: (eventName: string, isBubbling?: boolean) => void;
	update: () => void;
}

interface Window {
	//XMLHttpRequest: jest.Mock<any, any>;
	returnMockHttpResponse: (response: any) => void;
	MutationObserver: any;
	WebKitMutationObserver: any;
}

interface Type<T> {
	new (...args: any[]): T;
}

interface String {
	translate: (...args: any) => string;
}
