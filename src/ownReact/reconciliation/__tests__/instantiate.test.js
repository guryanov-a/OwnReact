import instantiate from '../instantiate';
import updateDomProperties from '../updateDomProperties';
import createPublicInstance from '../createPublicInstance';
import HtmlToJsxElementParser from 'html-react-parser';

const id = (x) => x;

const renderInstanceDom = (instance) => {
    const { dom, childInstances = [] } = instance;

    const transformedChildInstances = childInstances.map(renderInstanceDom);
    dom.append(...transformedChildInstances);
    return dom.outerHTML;
};

const getEssentialJsxElement = (jsxElement) => {
    const { type, props = {} } = jsxElement;
    const { children: childrenWithHtml = [] } = props;

    const children = childrenWithHtml && childrenWithHtml.filter((child) => typeof child !== 'string') || childrenWithHtml;
    const transformedChildren = children && children.map(getEssentialJsxElement) || childrenWithHtml;

    return {
        type,
        props: {
            ...props,
            children: transformedChildren,
        },
    };
};

const OwnReactHtmlToJsxElementParser = (instance) => {
    if (instance.dom.nodeValue) {
        return {
            type: 'TEXT ELEMENT',
            props: {
                nodeValue: instance.dom.nodeValue,
            },
        };
    }

    const html = renderInstanceDom(instance);
    const jsxElement = HtmlToJsxElementParser(html);
    return getEssentialJsxElement(jsxElement);
};

jest.mock('../updateDomProperties');
jest.mock('../createPublicInstance');
jest.mock('../../OwnReactComponent');

describe("instantiate", () => {
    updateDomProperties.mockImplementation(id);

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

        const expectedInstance = {
            type: "div",
            props: {
              children: [
                {
                  type: "span",
                  props: {
                    children: null,
                  },
                },
                {
                  type: "i",
                  props: {
                    children: null,
                  },
                },
              ],
            },
          }

        const instance = instantiate(element);
        const jsxElement = OwnReactHtmlToJsxElementParser(instance);
        expect(jsxElement).toEqual(expectedInstance);
    });

    test('instantiate a DOM element: text', () => {
        const element = {
            type: 'TEXT ELEMENT',
            props: { nodeValue: 'foo' },
        };

        const expectedInstance = {
            type: 'TEXT ELEMENT',
            props: { nodeValue: 'foo' },
        };

        const instance = instantiate(element);
        const jsxElement = OwnReactHtmlToJsxElementParser(instance);

        
        expect(jsxElement).toEqual(expectedInstance);
    });

    test('instantiate a class component', () => {
        class MockClassComponent {
            static isOwnReactComponent() {}
            
            render() {
                return {
                    type: 'TEXT ELEMENT',
                    props: { nodeValue: 'foo' },
                };
            }
        }

        createPublicInstance.mockImplementation((element, instance) => new MockClassComponent());

        const element = {
            type: MockClassComponent,
        };

        const instance = instantiate(element);
        const jsxElement = OwnReactHtmlToJsxElementParser(instance);

        const expectedInstance = {
            type: 'TEXT ELEMENT',
            props: { nodeValue: 'foo' },
        };
        expect(jsxElement).toEqual(expectedInstance);
    });

    test('instantiate a function component', () => {
        const element = {
            type: () => {
                return {
                    type: 'TEXT ELEMENT',
                    props: { nodeValue: 'foo' },
                };
            },
            props: {},
        };

        const instance = instantiate(element);
        const jsxElement = OwnReactHtmlToJsxElementParser(instance);

        const expectedInstance = {
            type: 'TEXT ELEMENT',
            props: { nodeValue: 'foo' },
        };
        expect(jsxElement).toEqual(expectedInstance);
    });

    test('instantiate a null element', () => {
        const element = {
            type: null,
        };
        const expectedInstance = {
            dom: null,
            element,
        };

        const instance = instantiate(element);
        expect(instance).toEqual(undefined);
    });

    test('error: invalid type', () => {
        const element = {
            type: 1,
        };

        const result = instantiate(element);

        expect(result).toEqual(undefined);
    });
});
