import reconcile from './reconciliation/reconcile';

let rootInstance = null;

export default class OwnReactComponent {
  constructor(props) {
    this.props = props || {};
    this.state = this.state || {};
  }

  isOwnReactComponent() { return true; }

  static createElement(name, attrs, ...childs) {
    return [name, attrs, ...childs];
  }

  static render(element, container) {
    const prevInstance = rootInstance;
    const nextInstance = reconcile(container, prevInstance, element);
    rootInstance = nextInstance;
  }
}
