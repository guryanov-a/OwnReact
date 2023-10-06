import { reconcile } from "./reconciliation/reconcile";

export const renderDom = (element, container) => {
  return reconcile(container, null, element);
};
