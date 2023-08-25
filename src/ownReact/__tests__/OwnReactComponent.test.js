import OwnReactComponent from "../OwnReactComponent";
import { reconcile } from "../reconciliation/reconcile";

jest.mock("../reconciliation/reconcile");

describe("OwnReactComponent", () => {
  test('constructor', () => {
    const component = new OwnReactComponent();
    expect(component.props).toEqual({});
    expect(component.state).toEqual({});
  });

  test('createElement', () => {
    const element = OwnReactComponent.createElement('div', {id: 'test'}, 'test');
    expect(element).toEqual(['div', {id: 'test'}, 'test']);
  });

  test('render', () => {
    const updatedInstance = {
      dom: {
        tagName: 'updatedDom'
      },
      element,
      childInstances: [
        'updatedChildInstances'
      ],
    };
    reconcile.mockImplementation((parentDom, prevInstance, element) => {
      parentDom.innerHTML = '<div id="test">test</div>';

      return updatedInstance;
    });
    const element = OwnReactComponent.createElement('div', {id: 'test'}, 'test');
    const container = document.createElement('div');
    const result = OwnReactComponent.render(element, container);
    expect(container.innerHTML).toEqual('<div id="test">test</div>');
    expect(reconcile).toHaveBeenCalledWith(container, null, element);
    expect(result).toEqual(updatedInstance);
  });
});
