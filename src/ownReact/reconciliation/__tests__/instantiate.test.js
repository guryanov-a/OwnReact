import instantiate from '../instantiate';
import { updateDomProperties } from '../updateDomProperties';
import createPublicInstance from '../createPublicInstance';
import { identity } from "ramda";
import { OwnReactComponent } from '../../OwnReactComponent';

jest.mock('../updateDomProperties');
jest.mock('../createPublicInstance');

describe("instantiate", () => {
    updateDomProperties.mockImplementation(identity);

    test('instantiate a DOM element: HTML element', () => {
        const element = {
            type: 'div',
            props: {
                children: [
                    {
                        type: 'span',
                    },
                    {
                        type: 'i',
                    }
                ],
            },
        };

        const expectedInstanceDom = document.createElement('div');
        const expectedInstanceDomChild1 = document.createElement('span');
        const expectedInstanceDomChild2 = document.createElement('i');
        expectedInstanceDom.appendChild(expectedInstanceDomChild1);
        expectedInstanceDom.appendChild(expectedInstanceDomChild2);

        const expectedInstance = {
            dom: expectedInstanceDom,
            element,
            childInstances: [
                {
                    dom: expectedInstanceDomChild1,
                    element: {
                        type: 'span',
                    },
                    childInstances: [],
                },
                {
                    dom: expectedInstanceDomChild2,
                    element: {
                        type: 'i',
                    },
                    childInstances: [],
                },
            ],
        };

        const instance = instantiate(element);
        expect(instance).toEqual(expectedInstance);
    });

    test('instantiate a DOM element: text', () => {
        const element = {
            type: 'TEXT ELEMENT',
            props: { nodeValue: 'foo' },
        };
        const expectedInstance = {
            dom: document.createTextNode('foo'),
            element,
            childInstances: [],
        };

        const instance = instantiate(element);
        
        expect(instance).toEqual(expectedInstance);
    });

    test('instantiate a class component', () => {
        const MockClassComponent = jest.fn();
        MockClassComponent.render = jest.fn(() => ({
            type: 'TEXT ELEMENT',
            props: { nodeValue: 'foo' },
        }));
        OwnReactComponent.isPrototypeOf = jest.fn(() => true);

        createPublicInstance.mockImplementation((element, instance) => new MockClassComponent());

        const element = {
            type: MockClassComponent,
        };

        const instance = instantiate(element);

        const expectedInstance = {
            dom: document.createTextNode('foo'),
            element,
            childInstances: [],
        };
        expect(instance).toEqual(expectedInstance);
    });

    const originalConsoleError = console.error;

    test('error: invalid type', () => {
        const element = {
            type: 1,
        };

        console.error = jest.fn();
        const result = instantiate(element);

        expect(console.error).toHaveBeenCalledWith(`Invalid type: ${String(element.type)}`);
        expect(result).toEqual(undefined);

        console.error = originalConsoleError;
    });

    const testCases = [
        [null, undefined], 
        [undefined, undefined],
        [0, undefined],
        [false, undefined],
        ['', undefined],
        [NaN, undefined],
        [{}, undefined],
        [{type: null}, undefined],
        [{type: 0}, undefined],
        [{type: false}, undefined],
        [{type: ''}, undefined],
        [{type: NaN}, undefined],
      ];

    // use test.each to iterate over the test cases and run your function with each value of initialElement
    test.each(testCases)('error: wrong input with input = %p', (initialElement, expectedType) => {
        console.error = jest.fn();
        const result = instantiate(initialElement);

        expect(result).toBe(expectedType);
        expect(console.error).toHaveBeenCalledWith(`Invalid input: ${String(initialElement)}`);

        console.error = originalConsoleError;
    });
});
