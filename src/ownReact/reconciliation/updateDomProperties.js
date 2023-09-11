export function updateDomProperties(instance, element) {
    const { props } = element;
    const { children: _, ...domProps } = props;
    
    Object.keys(domProps).forEach((propName) => {
        const propValue = props[propName];
        instance[propName] = propValue;
    });

    return instance;
}