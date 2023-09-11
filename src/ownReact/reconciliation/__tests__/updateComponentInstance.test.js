import { updateComponentInstance } from '../updateComponentInstance';
import { reconcile } from '../reconcile';

jest.mock('../reconcile');

describe('updateComponentInstance', () => {
    test('updateComponentInstance', () => {
        const currentInstance = {
            publicInstance: {
                props: {
                    className: 'test',
                },
                render: jest.fn(),
            },
            dom: {},
        };
        const element = {
            props: {
                className: 'testElement',
            },
        };
        const expectedChildElement = {
            type: 'div',
            props: {
                className: 'expectedTest',
            },
        };
        const expectedNextInstance = {
            dom: {},
            element: expectedChildElement,
            childInstances: [],
        };

        currentInstance.publicInstance.render.mockImplementation(() => expectedChildElement);
        reconcile.mockImplementation(() => expectedNextInstance);

        const result = updateComponentInstance(currentInstance, element);
        expect(currentInstance.publicInstance.props).toEqual(element.props);
        expect(currentInstance.publicInstance.__internalInstance).toEqual(expectedNextInstance);
        expect(currentInstance.publicInstance.render).toHaveBeenCalled();
        expect(reconcile).toHaveBeenCalledWith(currentInstance.dom, currentInstance, expectedChildElement);
        expect(result).toEqual(expectedNextInstance);
    });
});