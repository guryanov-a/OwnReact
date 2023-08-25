import updateDomProperties from './updateDomProperties.js';
import createPublicInstance from './createPublicInstance.js';
import OwnReactComponent from '../OwnReact.js';

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
    const { type = 'null', props = {} } = element;
    const isDomElement = typeof type === 'string';
    
    if (isDomElement) {
        // create DOM element
        const isTextElement = type === 'TEXT ELEMENT';
        const domElement = isTextElement ? document.createTextNode(element.props.nodeValue) : document.createElement(type);

        const dom = updateDomProperties(domElement, [], props);

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
    } 

    const isClassElement = type.prototype instanceof OwnReactComponent;
    if (isClassElement) {
        // create instance of a component
        const instance = {};
        const publicInstance = createPublicInstance(element, instance);
        const childElement = publicInstance.render();
        const childInstance = instantiate(childElement);
        const dom = childInstance.dom;

        Object.assign(instance, {
            dom,
            element,
            childInstance,
            publicInstance,
        });
        return instance;
    } 

    const isFunctionElement = typeof type === 'function';
    if (isFunctionElement) {
        const { type: functionComponent } = element;
        // create instance of a function component
        const childElement = functionComponent(props);
        const childInstance = instantiate(childElement);
        const dom = childInstance.dom;

        const instance = {
            dom,
            element,
            childInstance,
        };
        return instance;
    }

    throw new Error(`Invalid type: "${type}".`);
}