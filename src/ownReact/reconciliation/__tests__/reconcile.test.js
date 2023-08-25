import { reconcile } from '../reconcile';
import createInstance from '../createInstance';
import removeInstance from '../removeInstance';
import updateInstance from '../updateInstance';
import { replaceInstance } from '../replaceInstance';
import OwnReactComponent from '../../OwnReactComponent';

jest.mock('../createInstance');
jest.mock('../removeInstance');
jest.mock('../updateInstance');
jest.mock('../replaceInstance');

describe('reconcile', () => {
    // createInsance is mocked with expected data and is called with right arguments
    it('createInsance', () => {
        createInstance.mockImplementation((parentDom, element) => {
            return {
                dom: {},
                element,
                childInstances: [],
            };
        });

        const parentDom = {};
        const element = {
            type: null,
        };
        const result = reconcile(parentDom, null, element, createInstance);
        expect(createInstance).toHaveBeenCalledWith(parentDom, element);
        expect(result).toEqual({
            dom: {},
            element,
            childInstances: [],
        });
    });

    // removeInstance is mocked with expected data and is called with right arguments
    it('removeInstance', () => {
        removeInstance.mockImplementation((prevInstance) => {
            return null;
        });

        const parentDom = {};
        const element = null;
        const prevInstance = {
            dom: {},
            element,
            childInstances: [],
        };
        const result = reconcile(parentDom, prevInstance, element);
        expect(removeInstance).toHaveBeenCalledWith(prevInstance);
        expect(result).toBe(null);
    });

    // updateInstance is mocked with expected data and is called with right arguments
    it('updateInstance: in case of minor changes', () => {
        const updatedInstance = {
            dom: {
                tagName: 'updatedDom'
            },
            element,
            childInstances: [
                'updatedChildInstances'
            ],
        };
        updateInstance.mockImplementation((prevInstance, element) => {
            return updatedInstance;
        });
        const parentDom = {};
        const element = {
            type: 'div',
        };
        const prevInstance = {
            dom: {},
            element: {
                type: 'div',
            },
            childInstances: [],
        };
        const result = reconcile(parentDom, prevInstance, element);
        expect(updateInstance).toHaveBeenCalledWith(prevInstance, element);
        expect(result).toEqual(updatedInstance);
    });

    it('updateInstance: in case if the element for the update is simple', () => {
        const updatedInstance = {
            dom: {
                tagName: 'updatedDom'
            },
            element: {
                type: 'span',
            },
            childInstances: [
                'updatedChildInstances'
            ],
        };

        updateInstance.mockImplementation((prevInstance, element) => {
            return updatedInstance;
        });

        const parentDom = {};
        const element = {
            type: 'span',
        };
        const prevInstance = {
            dom: {},
            element: {
                type: 'div',
            },
            childInstances: [],
        };

        const result = reconcile(parentDom, prevInstance, element);
        expect(updateInstance).toHaveBeenCalledWith(prevInstance, element);
        expect(result).toEqual(updatedInstance);
    });

    // replaceInstance is mocked with expected data and is called with right arguments
    it('replaceInstance', () => {
        class MockComponent1 extends OwnReactComponent {
            render() {
                return {
                    type: 'TEXT ELEMENT',
                    props: { nodeValue: 'foo' },
                };
            }
        }

        class MockComponent2 extends OwnReactComponent {
            render() {
                return {
                    type: 'TEXT ELEMENT',
                    props: { nodeValue: 'bar' },
                };
            }
        }

        const replacedInstance = {
            dom: {
                tagName: 'replacedDom'
            },
            element: {
                type: MockComponent2,
            },
            childInstances: [
                'replacedChildInstances'
            ],
        };

        replaceInstance.mockImplementation((instance, element) => {
            return replacedInstance;
        });

        const parentDom = {};
        const element = {
            type: MockComponent2,
        };
        const prevInstance = {
            dom: {},
            element: {
                type: MockComponent1,
            },
            childInstances: [],
        };
        const result = reconcile(parentDom, prevInstance, element);
        expect(replaceInstance).toHaveBeenCalledWith(prevInstance, element);
        expect(result).toEqual(replacedInstance);
    });

    it('error: prev instance or curr element is undefined', () => {
        const parentDom = {};
        const element = {
            type: 'div',
        };
        const prevInstance = {
            dom: {},
            element: {
                type: 'div',
            },
            childInstances: [],
        };
        expect(() => reconcile(parentDom, undefined, element)).toThrow();
        expect(() => reconcile(parentDom, prevInstance, undefined)).toThrow();
    });

    it('error: prev or curr element type is undefined', () => {
        const parentDom = {};
        const elementTypeUndefined = {
            type: undefined,
        };
        const prevInstanceTypeUndefined = {
            dom: {},
            element: {
                type: undefined,
            },
            childInstances: [],
        };
        const prevInstanceElementUndefined = {
            dom: {},
            element: undefined,
            childInstances: [],
        };
        const element = {
            type: 'div',
        };
        const prevInstance = {
            dom: {},
            element: {
                type: 'div',
            },
            childInstances: [],
        };

        expect(() => reconcile(parentDom, prevInstance, elementTypeUndefined)).toThrow();
        expect(() => reconcile(parentDom, prevInstanceTypeUndefined, element)).toThrow();
        expect(() => reconcile(parentDom, prevInstanceTypeUndefined, elementTypeUndefined)).toThrow();
        expect(() => reconcile(parentDom, prevInstanceElementUndefined, element)).toThrow();
    });

    it('error: something went wrong', () => {
        class MockClassComponent {}

        const parentDom = {};
        const element = {
            type: MockClassComponent,
        };
        const prevInstance = {
            dom: {},
            element: {
                type: 'div',
            },
            childInstances: [],
        };
        expect(() => reconcile(parentDom, prevInstance, element)).toThrow();
    });
});