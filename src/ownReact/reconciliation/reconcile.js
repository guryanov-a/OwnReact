import createInstance from './createInstance';
import removeInstance from './removeInstance';
import { replaceInstance } from './replaceInstance';
import updateInstance from './updateInstance';
import OwnReactComponent from '../OwnReactComponent';

/**
 * reconcile VDOM states
 * @param {HTMLElement} container
 * @param {Object} prevInstance
 * @param {Object} element
 * @returns {Object} nextInstance
 * @example
 * const prevInstance = rootInstance;
 * const nextInstance = reconcile(container, prevInstance, element);
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
    if (prevInstance === undefined || element === undefined) {
        throw Error('prev instance or curr element is undefined. This should not happen.');
    }

    // choosing what to do with the instance
    if (prevInstance === null) {
        // initial render
        return createInstance(parentDom, element);
    }
    
    if (element === null) {
        // clean up after removing
        return removeInstance(prevInstance);
    }
    
    if (prevInstance.element === undefined || prevInstance.element.type === undefined || element.type === undefined) {
        throw Error('prev or curr element type is undefined. This should not happen.');
    }

    if (prevInstance.element.type === element.type) {
        // update instance in case of minor changes
        return updateInstance(prevInstance, element);
    } else if (typeof element.type === 'string') {
        // update instance in case if the element for the update is simple
        return updateInstance(prevInstance, element);
    }

    if (prevInstance.element.type !== element.type && OwnReactComponent.isPrototypeOf(element.type)) {
        // replace instance in case of major changes
        return replaceInstance(prevInstance, element);
    }

    // default
    throw Error('Something went wrong. This should not happen.');
}