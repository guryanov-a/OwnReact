import { reconcile } from '../reconcile';
import { createInstance } from '../createInstance';
import { removeInstance } from '../removeInstance';
import { updateInstance } from '../updateInstance';
import { updateComponentInstance } from '../updateComponentInstance';
import { replaceInstance } from '../replaceInstance';
import { OwnReactComponent } from '../../OwnReactComponent';
import { UnexpectedError, WrongDataError, WrongInputError } from '../reconcile';

jest.mock('../createInstance');
jest.mock('../removeInstance');
jest.mock('../updateInstance');
jest.mock('../replaceInstance');
jest.mock('../updateComponentInstance');

const originalConsoleError = console.error;

describe('reconcile', () => {
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
        const result = reconcile(parentDom, null, element);
        expect(createInstance).toHaveBeenCalledWith(parentDom, element);
        expect(result).toEqual({
            dom: {},
            element,
            childInstances: [],
        });
    });

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
        expect(result).toBe(null);
    });

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
        expect(result).toEqual(replacedInstance);
    });

    it('updateComponentInstance', () => {
        class MockComponent extends OwnReactComponent {
            render() {
                return {
                    type: 'TEXT ELEMENT',
                    props: { nodeValue: 'foo' },
                };
            }
        }

        const updatedInstance = {
            dom: {
                tagName: 'updatedDom'
            },
            element: {
                type: MockComponent,
                props: { nodeValue: 'bar' },
            },
            childInstances: [
                'updatedChildInstances'
            ],
        };

        updateComponentInstance.mockImplementation((prevInstance, element) => {
            return updatedInstance;
        });

        const parentDom = {};
        const element = {
            type: MockComponent,
        };
        const prevInstance = {
            dom: {},
            element: {
                type: MockComponent,
            },
            childInstances: [],
        };
        const result = reconcile(parentDom, prevInstance, element);
        expect(result).toEqual(updatedInstance);
    });

    describe('errors', () => {
        describe('error: wrong input', () => {
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
    
            const testCasesWrongParameters = [
                [undefined, element],
                [prevInstance, undefined],
                [undefined, undefined],
            ];
    
            test.each(testCasesWrongParameters)('error: wrong parameters = %p', (prevInstance, element) => {
                console.error = jest.fn();
                reconcile(parentDom, prevInstance, element);
                expect(console.error).toHaveBeenCalledWith(expect.any(WrongInputError));
                console.error = originalConsoleError;
            });
        });
    
        describe('error: wrong data', () => {
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
            const elementWrongData = {
                type: 'div',
            };
            const prevInstance = {
                dom: {},
                element: {
                    type: 'div',
                },
                childInstances: [],
            };
            const parentDomWrongData = {};
        
            const testCasesWrongData = [
                [prevInstance, elementTypeUndefined],
                [prevInstanceTypeUndefined, elementWrongData],
                [prevInstanceTypeUndefined, elementTypeUndefined],
                [prevInstanceElementUndefined, elementWrongData],
            ];
    
            test.each(testCasesWrongData)('error: wrong data = %p', (prevInstance, element) => {
                console.error = jest.fn();
    
                reconcile(parentDomWrongData, prevInstance, element);
                expect(console.error).toHaveBeenCalledWith(expect.any(WrongDataError));
                console.error = originalConsoleError;
            });
        });
    
        it('error: something went wrong', () => {
            console.error = jest.fn();
            class MockClassComponent {}
            const parentDom = {};
            const element = {
                type: MockClassComponent,
            };
            const prevInstance = {
                dom: {},
                element: {
                    type: MockClassComponent,
                },
                childInstances: [],
            };
    
            reconcile(parentDom, prevInstance, element);
    
            expect(console.error).toHaveBeenCalledWith(expect.any(UnexpectedError));
            console.error = originalConsoleError;
        });
    });
});