import reconcile from './reconcile.js';

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
export default function updateInstance(instance, element) {
    updateDomProperties(instance.dom, instance.element.props, element.props);
    instance.childInstances = reconcileChildren(instance, element);
    instance.element = element;
    return instance;
}