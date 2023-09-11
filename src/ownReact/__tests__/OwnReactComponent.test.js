import { OwnReactComponent, InvalidChildError } from "../OwnReactComponent";
import { updateComponent } from "../updateComponent";

jest.mock("../updateComponent");

describe("OwnReactComponent", () => {
  test('constructor', () => {
    const component = new OwnReactComponent();
    expect(component.props).toEqual({});
    expect(component.state).toEqual({});
  });

  test('setState', () => {
    const component = new OwnReactComponent();
    component.__internalInstance = {
      dom: {
        tagName: 'updatedDom'
      },
      element,
      childInstances: [
        'updatedChildInstances'
      ],
    };
    const element = {
      type: 'div',
      props: {
        id: 'test'
      }
    };

    updateComponent.mockImplementation((internalInstance) => {
      internalInstance.dom = {
        tagName: 'updatedDom'
      };
      internalInstance.element = element;
      internalInstance.childInstances = [
        'updatedChildInstances'
      ];
    });

    component.setState({ test: 'test' });
    expect(component.state).toEqual({test: 'test'});
    expect(updateComponent).toHaveBeenCalledWith(component.__internalInstance);
  });

  describe('createElement', () => {
    test('object child', () => {
      const element = OwnReactComponent.createElement('div', { id: 'test' }, { type: 'div', props: { id: 'test' } });
      expect(element).toEqual({
        type: 'div',
        props: {
          id: 'test',
          children: [{
            type: 'div',
            props: {
              id: 'test'
            }
          }]
        }
      });
    });
    
    test('string', () => {
      const element = OwnReactComponent.createElement('div', { id: 'test' }, 'Hello world!');
      expect(element).toEqual({
        type: 'div',
        props: {
          id: 'test',
          children: [{
            type: 'TEXT ELEMENT',
            props: {
              nodeValue: 'Hello world!'
            }
          }]
        }
      });
    });

    test('InvalidChildError', () => {
      console.error = jest.fn();
      const element = OwnReactComponent.createElement('div', { id: 'test' }, 1);

      expect(element).toEqual({
        type: 'div',
        props: {
          id: 'test',
          children: []
        }
      });
      expect(console.error).toHaveBeenCalledWith(expect.any(InvalidChildError));

      // restore original console.error
      delete console.error;
    });
  });
});
