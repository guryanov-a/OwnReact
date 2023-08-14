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
        return createInstance(parentDom, element);
    } else if (element === null) {
        return removeInstance(prevInstance);
    } else if (prevInstance.element.type === element.type || typeof element.type === 'string') {
        return updateInstance(prevInstance, element);
    } else {
        return replaceInstance(prevInstance, element);
    }
}