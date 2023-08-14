/**
 * Create instance of a component
 * @param {Object} element
 * @returns {Object} instance
 * @example
 * const instance = createInstance(element);
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
 */
export default function createPublicInstance(element, internalInstance) {
    const { type: Type, props } = element;
    const publicInstance = new Type(props);
    publicInstance.__internalInstance = internalInstance;
    return publicInstance;
}