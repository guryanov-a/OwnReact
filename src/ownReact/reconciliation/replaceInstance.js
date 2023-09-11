import { createInstance } from './createInstance';

/**
 * Replaces a DOM node with a new instance.
 * @param {Object} prevInstance
 * @param {Object} element
 * @returns {Object} nextInstance
 * @example
 * const prevInstance = rootInstance;
 * const nextInstance = reconcile(container, prevInstance, element);
 * rootInstance = nextInstance;
 * 
 * @todo
 * - [ ] implement
 * - [ ] test
 * - [ ] document
 * - [ ] add to CHANGELOG.md
 * 
 * @see https://reactjs.org/docs/reconciliation.html#mounting-components
 * @see https://reactjs.org/docs/react-component.html#constructor
 * @see https://reactjs.org/docs/react-component.html#componentdidmount
 * @see https://reactjs.org/docs/react-component.html#render
 * @see https://reactjs.org/docs/react-component.html#updating-componentdidupdate
 * @see https://reactjs.org/docs/react-component.html#updating-getderivedstatefromprops
 * @see https://reactjs.org/docs/react-component.html#updating-shouldcomponentupdate
 * @see https://reactjs.org/docs/react-component.html#updating-render
 * @see https://reactjs.org/docs/react-component.html#updating-getsnapshotbeforeupdate
 */
export function replaceInstance(container, prevInstance, element) {
    const nextInstance = createInstance(element);
    container.replaceChild(nextInstance.dom, prevInstance.dom);
    return nextInstance;
}