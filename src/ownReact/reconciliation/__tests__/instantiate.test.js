import instantiate from "../instantiate";

describe("instantiate", () => {
    // - [ ] instantiate a DOM element
    test('instantiate a DOM element', () => {
        // given
        const element = {
            type: 'div',
            props: {
                className: 'foo',
                children: [
                    {
                        type: 'TEXT ELEMENT',
                        props: { nodeValue: 'bar' },
                    },
                ],
            },
        };

        // when
        const instance = instantiate(element);

        // then
        const expectedInstance = {
            dom: {
                className: 'foo',
                children: [
                    {
                        nodeValue: 'bar',
                    },
                ],
            },
            element,
            childInstances: [
                {
                    dom: {
                        nodeValue: 'bar',
                    },
                    element: {
                        type: 'TEXT ELEMENT',
                        props: { nodeValue: 'bar' },
                    },
                    childInstances: [],
                },
            ],
        };
        expect(instance).toEqual(expectedInstance);
    });

    // - [ ] instantiate a class component
    test('instantiate a class component', () => {
        // given
        class Component {
            render() {
                return {
                    type: 'TEXT ELEMENT',
                    props: { nodeValue: 'foo' },
                };
            }
        }
        const element = {
            type: Component,
            props: {},
        };

        // when
        const instance = instantiate(element);

        // then
        const expectedInstance = {
            dom: {
                nodeValue: 'foo',
            },
            element,
            childInstances: [],
        };
        expect(instance).toEqual(expectedInstance);
    });

    // - [ ] instantiate a function component
    test('instantiate a function component', () => {
        // given
        const element = {
            type: () => {
                return {
                    type: 'TEXT ELEMENT',
                    props: { nodeValue: 'foo' },
                };
            },
            props: {},
        };

        // when
        const instance = instantiate(element);

        // then
        const expectedInstance = {
            dom: {
                nodeValue: 'foo',
            },
            element,
            childInstances: [],
        };
        expect(instance).toEqual(expectedInstance);
    });

    // - [ ] instantiate a text element
    test('instantiate a text element', () => {
        // given
        const element = {
            type: 'TEXT ELEMENT',
            props: { nodeValue: 'foo' },
        };

        // when
        const instance = instantiate(element);

        // then
        const expectedInstance = {
            dom: {
                nodeValue: 'foo',
            },
            element,
            childInstances: [],
        };
        expect(instance).toEqual(expectedInstance);
    });
});
