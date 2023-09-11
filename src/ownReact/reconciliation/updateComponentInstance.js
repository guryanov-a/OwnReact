import { reconcile } from './reconcile';

export const updateComponentInstance = (currentInstance, element) => {
    const { publicInstance } = currentInstance;
    const { props } = element;

    publicInstance.props = props;
    const childElement = publicInstance.render();
    const nextInstance = reconcile(currentInstance.dom, currentInstance, childElement);
    publicInstance.__internalInstance = nextInstance;

    return nextInstance;
};