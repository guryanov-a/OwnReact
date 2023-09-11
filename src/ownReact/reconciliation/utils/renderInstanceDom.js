export const renderInstanceDom = (instance) => {
    const { dom, childInstances = [] } = instance;

    const transformedChildInstances = childInstances.map(renderInstanceDom);
    dom.append(...transformedChildInstances);
    return dom;
};