import { updateDomProperties } from "./updateDomProperties.js";
import { reconcileChildren } from "./reconcileChildren.js";

/**
 * Updates instance
 * @param {Object} instance
 * @param {Object} element
 * @returns {Object} instance
 * @example
 * const nextInstance = updateInstance(instance, element);
 */
export function updateInstance(instance, element) {
  const isTheSameTextElement =
    instance.element.type === "TEXT ELEMENT" &&
    element.type === "TEXT ELEMENT" &&
    instance.element.props.nodeValue === element.props.nodeValue;

  if (!isTheSameTextElement) {
    updateDomProperties(instance.dom, instance.element.props, element.props);
  }

  instance.childInstances = reconcileChildren(instance, element);
  instance.element = element;
  return instance;
}
