import { reconcile } from "./reconciliation/reconcile";

export const updateComponent = internalInstance => {
  const parentDom = internalInstance.dom.parentNode;
  const { element } = internalInstance;
  return reconcile(parentDom, internalInstance, element);
};
