import createInstance from './createInstance';
import removeInstance from './removeInstance';
import replaceInstance from './replaceInstance';
import updateInstance from './updateInstance';

/**
 * reconcile VDOM states
 * @param {HTMLElement} container
 * @param {Object} prevInstance
 * @param {Object} element
 * @returns {Object} nextInstance
 * @example
 * const prevInstance = rootInstance;
 * const nextInstance = reconcile(container, prevInstance, element);
 * rootInstance = nextInstance;
 * 
 * @see https://reactjs.org/docs/reconciliation.html
 * @see https://reactjs.org/docs/rendering-elements.html
 * @see https://reactjs.org/docs/rendering-elements.html#updating-the-rendered-element
 * @see https://reactjs.org/docs/rendering-elements.html#react-only-updates-whats-necessary
 * 
 * @todo
 * - [ ] test
 */
export function reconcile(parentDom, prevInstance, element) {
    // choosing what to do with the instance
    if (prevInstance === null) {
        // initial render
        return createInstance(parentDom, element);
    } else if (element === null) {
        // clean up after removing
        return removeInstance(prevInstance);
    } else if (prevInstance.element.type === element.type || typeof element.type === 'string') {
        // update instance in case of minor changes or if the element for the update is simple
        return updateInstance(prevInstance, element);
    } else {
        // recreating subtree
        return replaceInstance(prevInstance, element);
    }
}