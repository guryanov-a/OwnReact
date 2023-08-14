let count = 0

let rootInstance = null;

export default class OwnReact {
  /**
   * React.createElement
   */
  static createElement() {}

  static render(element, container) {
    const prevInstance = rootInstance;
    const nextInstance = reconcile(container, prevInstance, element);
    rootInstance = nextInstance;
  }
}
