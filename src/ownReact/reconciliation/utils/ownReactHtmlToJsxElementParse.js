import HtmlToJsxElementParser from 'html-react-parser';
import { renderInstanceDom } from './renderInstanceDom';
import { getEssentialJsxElement } from './getEssentialJsxElement';

export const ownReactHtmlToJsxElementParse = (instance) => {
    if (instance && instance.dom && instance.dom.nodeValue) {
        return {
            type: 'TEXT ELEMENT',
            props: {
                nodeValue: instance.dom.nodeValue,
            },
        };
    }

    const html = renderInstanceDom(instance);
    const jsxElement = HtmlToJsxElementParser(html.outerHTML);
    return getEssentialJsxElement(jsxElement);
};