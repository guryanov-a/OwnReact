import instantiate from './instanciate';

/**
 * Creates instance of a DOM element
 * @param {HTMLElement} container
 * @param {Object} element
 * @returns {Object} instance
 * 
 * @todo
 * - [ ] test
 * 
 * @example
 * const instance = createInstance(container, element);
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
export default function createInstance(container, element) {
    const { type, props } = element;
    const instance = instantiate(type, props);
    container.appendChild(instance.dom);
    return instance;
}
