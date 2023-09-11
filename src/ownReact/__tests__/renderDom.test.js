import { renderDom } from "../renderDom";
import { reconcile } from "../reconciliation/reconcile";

jest.mock("../reconciliation/reconcile");

describe("renderDom", () => {
    test('renderDom', () => {
        const container = {
            tagName: 'container'
        };
        const expectedElement = {
            type: 'newDiv',
        };
        const expectedInstance = {
            dom: {},
            element: {
                type: 'newDivEnd',
            },
            childInstances: [],
        };

        const Component = jest.fn();
        const component = {
            render: jest.fn(),
        };

        Component.mockImplementation(() => component);
        component.render.mockImplementation(() => expectedElement);
        reconcile.mockImplementation(() => expectedInstance);

        const result = renderDom(Component, container);
        expect(reconcile).toHaveBeenCalledWith(container, null, expectedElement);
        expect(result).toEqual(expectedInstance);
    });
});