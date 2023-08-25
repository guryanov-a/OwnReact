import updateDomProperties from './updateDomProperties.js';
import createPublicInstance from './createPublicInstance.js';
import OwnReactComponent from '../OwnReactComponent.js';

/**
 * Instantiate a component
 * @param {Function} type
 * @param {Object} props
 * @returns {Object} instance
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
    if (!element || !element.type) {
        console.error(`Invalid input: ${element}`);
        return;
    }

    const { type, props = {} } = element;
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

    const isClassElement = !!type.isOwnReactComponent;
    if (isClassElement) {
        // create instance of a component
        const instance = {};
        const publicInstance = createPublicInstance(element, instance);
        const childElement = publicInstance.render();
        const childInstance = instantiate(childElement);
        const dom = childInstance.dom;

        return {
            ...instance,
            dom,
            element,
            childInstance,
            publicInstance,
        };
    } 

    const isFunctionElement = typeof type === 'function';
    if (isFunctionElement) {
        const { type: FunctionComponent } = element;
        const childElement = FunctionComponent(props);
        const childInstance = instantiate(childElement);
        const dom = childInstance.dom;

        return {
            dom,
            element,
            childInstance,
        };
    }

    console.error(`Invalid type: "${type} or extends for class component is not used".`);
}