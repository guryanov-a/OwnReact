import instantiate from './instantiate';

/**
 * Creates instance of a DOM element
 * @param {HTMLElement} container
 * @param {Object} element
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
export function createInstance(container, element) {
    const instance = instantiate(element);
    container.appendChild(instance.dom);
    
    return instance;
}
