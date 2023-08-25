import OwnReactComponent from '../../OwnReact';
import instantiate from '../instantiate';
import updateDomProperties from '../updateDomProperties';
import createPublicInstance from '../createPublicInstance';

jest.mock('../updateDomProperties');
updateDomProperties.mockImplementation((domElement) => domElement);
jest.mock('../createPublicInstance');

const id = (x) => x;

const transformInstanceHtmlElement = (instance) => {
    const { dom, childInstances = [] } = instance;

    const transformedChildInstances = childInstances.map(transformInstanceHtmlElement);
    const { tagName = 'no tag name' } = dom;
    const attributes = {};

    const transformedInstance = [
        tagName.toLowerCase(),
        attributes,
        transformedChildInstances,
    ];
    return transformedInstance;
};

const transformInstanceTextElement = (instance) => {
    const { dom } = instance;
    
    const transformedInstance = [
        'TEXT ELEMENT',
        {
            nodeValue: dom.nodeValue,
        },
        []
    ];
    return transformedInstance;
};

describe("instantiate", () => {
    test('instantiate a DOM element: HTML element', () => {
        updateDomProperties.mockImplementation(id);
                    
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

        const instance = instantiate(element);
        const transformedInstance = transformInstanceHtmlElement(instance);

        const expectedInstance = [
            'div',
            {},
            [
                ['span', {}, []],
                ['i', {}, []],
            ],
        ];
        expect(transformedInstance).toEqual(expectedInstance);
    });

    test('instantiate a DOM element: text', () => {
        updateDomProperties.mockImplementation(id);

        const element = {
            type: 'TEXT ELEMENT',
            props: { nodeValue: 'foo' },
        }

        const instance = instantiate(element);
        const transformedInstance = transformInstanceTextElement(instance);

        const expectedInstance = [
            'TEXT ELEMENT',
            {
                nodeValue: 'foo',
            },
            [],
        ];
        expect(transformedInstance).toEqual(expectedInstance);
    });

    test('instantiate a class component', () => {
        createPublicInstance.mockImplementation((element, instance) => {
            const { type: ClassComponent } = element;
            classInstance = new ClassComponent();
            classInstance.props = {};
            classInstance.state = {};
            classInstance.__internalInstance = {};
            classInstance.isOwnReactComponent = () => true;
            return classInstance;
        });
        updateDomProperties.mockImplementation(id);
        
        class MockComponent {
            render() {
                return {
                    type: 'TEXT ELEMENT',
                    props: { nodeValue: 'foo' },
                };
            }
        }

        Object.setPrototypeOf(MockComponent, OwnReactComponent.prototype);

        const element = {
            type: MockComponent,
        };

        const instance = instantiate(element);
        const transformedInstance = transformInstanceTextElement(instance);

        const expectedInstance = [
            'TEXT ELEMENT',
            {
                nodeValue: 'foo',
            },
            [],
        ];
        expect(transformedInstance).toEqual(expectedInstance);
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
        const transformedInstance = transformInstanceTextElement(instance);

        const expectedInstance = [
            'TEXT ELEMENT',
            {
                nodeValue: 'foo',
            },
            [],
        ];
        expect(transformedInstance).toEqual(expectedInstance);
    });
});
