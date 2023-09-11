import { reconcile } from "./reconciliation/reconcile";

export const renderDom = (Component, container) => {
    const component = new Component();
    const element = component.render();
    return reconcile(container, null, element);
}