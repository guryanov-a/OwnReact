export const getEssentialJsxElement = (jsxElement) => {
    const { type, props = {} } = jsxElement;
    const { children: childrenWithHtml = [] } = props;

    const children = childrenWithHtml && childrenWithHtml.filter((child) => typeof child !== 'string') || childrenWithHtml;
    const transformedChildren = children && children.map(getEssentialJsxElement) || childrenWithHtml;

    return {
        type,
        props: {
            ...props,
            children: transformedChildren,
        },
    };
};