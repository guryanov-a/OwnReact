import { reconcile } from './reconciliation/reconcile';

let rootInstance = null;

export default class OwnReactComponent {
  constructor(props) {
      this.props = props || {};
      this.state = {};
  }

  static isOwnReactComponent() {}

  setState(partialState) {
      this.state = {
          ...this.state,
          ...partialState
      };
      
      updateInstance(this.__internalInstance);
  }

  static createElement(name, attrs, ...childs) {
    return [name, attrs, ...childs];
  }

  static render(element, container) {
    const prevInstance = rootInstance;
    const nextInstance = reconcile(container, prevInstance, element);
    rootInstance = nextInstance;
    return rootInstance;
  }
}
