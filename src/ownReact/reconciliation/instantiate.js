import updateDomProperties from './updateDomProperties.js';
import createPublicInstance from './createPublicInstance.js';

/**
 * Instantiate a component
 * @param {Function} type
 * @param {Object} props
 * @returns {Object} instance
 * 
 * @todo
 * - [ ] test
 * 
 * @see https://reactjs.org/docs/reconciliation.html#mounting-components
 * @see https://reactjs.org/docs/react-component.html#constructor
 * @see https://reactjs.org/docs/react-component.html#componentdidmount
 * @see https://reactjs.org/docs/react-component.html#render
 * @see https://reactjs.org/docs/react-component.html#getsnapshotbeforeupdate
 * @see https://reactjs.org/docs/react-component.html#componentdidupdate
 * @see https://reactjs.org/docs/react-component.html#componentwillunmount
 * @see https://reactjs.org/docs/react-component.html#render
 */
export default function instantiate(element) {
    const { type, props } = element;
    const isDomElement = typeof type === 'string';
    const isClassElement = !!type.prototype;
    const isFunctionElement = typeof type === 'function';
    
    if (isDomElement) {
        // create DOM element
        const isTextElement = type === 'TEXT ELEMENT';
        const dom = isTextElement ? document.createTextNode('') : document.createElement(type);

        updateDomProperties(dom, [], props);

        const children = props.children || [];
        const childInstances = children.map(instantiate);
        const childDoms = childInstances.map(childInstance => childInstance.dom);
        childDoms.forEach(childDom => dom.appendChild(childDom));

        const instance = {
            dom,
            element,
            childInstances,
        };
        return instance;
    } else if (isClassElement) {
        // create instance of a component
        const instance = {};
        const publicInstance = createPublicInstance(element, instance);
        const childElement = publicInstance.render();
        const childInstance = instantiate(childElement.type, childElement.props);
        const dom = childInstance.dom;

        Object.assign(instance, {
            dom,
            element,
            childInstance,
            publicInstance,
        });

        return instance;
    } else if (isFunctionElement) {
        // create instance of a function component
        const childElement = type(props);
        const childInstance = instantiate(childElement.type, childElement.props);
        const dom = childInstance.dom;

        const instance = {
            dom,
            element,
            childInstance,
        };
        return instance;
    } else {
        throw new Error(`Invalid type: "${type}".`);
    }
}