import HtmlToJsxElementParser from 'html-react-parser';
import { renderInstanceDom } from '../renderInstanceDom';
import { getEssentialJsxElement } from '../getEssentialJsxElement';

jest.mock('html-react-parser');
jest.mock('../renderInstanceDom');
jest.mock('../getEssentialJsxElement');

describe('utils', () => {
    it('ownReactHtmlToJsxElementParse', () => {
        const instance = {
            dom: {
                outerHTML: '<div><div id="test">test</div></div>'
            },
            childInstances: [
                {
                    dom: {
                        outerHTML: '<div id="test">test</div>'
                    },
                    childInstances: [],
                }
            ],
        };

        renderInstanceDom.mockImplementation(() => instance.dom);
        HtmlToJsxElementParser.mockImplementation(() => ({
            type: 'div',
            props: {
                children: [{
                    type: 'div',
                    props: {
                        children: [{
                            type: 'TEXT ELEMENT',
                            props: {
                                nodeValue: 'test',
                            },
                        }],
                        id: 'test',
                    },
                }],
            },
        }));
        getEssentialJsxElement.mockImplementation((jsxElement) => jsxElement);

        const result = ownReactHtmlToJsxElementParse(instance);

        expect(result).toEqual({
            type: 'div',
            props: {
                children: [{
                    type: 'div',
                    props: {
                        children: [{
                            type: 'TEXT ELEMENT',
                            props: {
                                nodeValue: 'test',
                            },
                        }],
                        id: 'test',
                    },
                }],
            },
        });
    });
});