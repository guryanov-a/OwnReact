import { createInstance } from './createInstance';
import { removeInstance } from './removeInstance';
import { replaceInstance } from './replaceInstance';
import { updateInstance } from './updateInstance';
import { updateComponentInstance } from './updateComponentInstance';
import { OwnReactComponent } from '../OwnReactComponent';

export class UnexpectedError extends Error {}
export class WrongInputError extends Error {}
export class WrongDataError extends Error {}

/**
 * reconcile VDOM states
 * @param {HTMLElement} container
 * @param {Object} currentInstance
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
export function reconcile(container, currentInstance, element) {
    if (currentInstance === undefined || element === undefined) {
        console.error(new WrongInputError('prev instance or curr element is undefined. This should not happen.'));
        return currentInstance;
    }

    // choosing what to do with the instance
    if (currentInstance === null) {
        // initial render
        return createInstance(container, element);
    }
    
    if (element === null) {
        // clean up after removing
        return removeInstance(container, currentInstance);
    }
    
    if (!(currentInstance.element && currentInstance.element.type) || !element.type) {
        console.error(new WrongDataError('prev or curr element type is undefined. This should not happen.'));
        return currentInstance;
    }

    if (currentInstance.element.type === element.type && OwnReactComponent.isPrototypeOf(element.type)) {
        // update component instance 
        return updateComponentInstance(currentInstance, element);
    }
    
    if (typeof element.type === 'string') {
        // update instance in case if the element for the update is simple
        return updateInstance(currentInstance, element);
    }

    if (currentInstance.element.type !== element.type) {
        // replace instance in case of major changes
        return replaceInstance(container, currentInstance, element);
    }

    // default
    console.error(new UnexpectedError('No condition for reconciliation is met. This should not happen.'));
    return currentInstance;
}