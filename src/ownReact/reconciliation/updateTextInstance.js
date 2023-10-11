export const updateTextInstance = (instance, element) => {
  const isTheSameTextElement =
    instance.element.type === "TEXT ELEMENT" &&
    instance.element.props.nodeValue === element.props.nodeValue;

  if (!isTheSameTextElement) {
    instance.dom.nodeValue = element.props.nodeValue;
  }

  instance.element = element;
  return instance;
};
