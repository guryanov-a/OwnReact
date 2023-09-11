import { updateDomProperties } from './updateDomProperties.js';
import { reconcileChildren } from './reconcileChildren.js';

/**
 * Updates instance
 * @param {Object} instance
 * @param {Object} element
 * @returns {Object} instance
 * @example
 * const nextInstance = updateInstance(instance, element);
 * 
 * @todo
 * - [ ] test
 * 
 * @see https://reactjs.org/docs/reconciliation.html#updating-the-rendered-element
 * @see https://reactjs.org/docs/react-component.html#componentdidupdate
 * @see https://reactjs.org/docs/react-component.html#getsnapshotbeforeupdate
 * @see https://reactjs.org/docs/react-component.html#render
 * @see https://reactjs.org/docs/react-component.html#componentwillunmount
 * @see https://reactjs.org/docs/react-component.html#render
 * @see https://reactjs.org/docs/react-component.html#componentdidmount
 * @see https://reactjs.org/docs/react-component.html#constructor
 * @see https://reactjs.org/docs/reconciliation.html#keys
 * @see https://reactjs.org/docs/reconciliation.html#recursing-on-children
 */
export function updateInstance(instance, element) {
    const updatedInstance = updateDomProperties(instance, element);
    updatedInstance.childInstances = reconcileChildren(instance, element);
    updatedInstance.element = element;
    return updatedInstance;
}