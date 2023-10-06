import { updateComponent } from "./updateComponent";

export class InvalidChildError extends Error {}

export class OwnReactComponent {
  constructor(props) {
    this.props = props || {};
    this.state = {};
  }

  setState(stateChangeInfo) {
    if (typeof stateChangeInfo === "function") {
      const changeState = stateChangeInfo;
      this.state = {
        ...this.state,
        ...changeState(this.state)
      };
    } else {
      const newState = stateChangeInfo;
      this.state = {
        ...this.state,
        ...newState
      };
    }

    updateComponent(this.__internalInstance);
  }

  static createElement(type, props, ...inputChildren) {
    const isChildrenArray = Array.isArray(inputChildren[0]);
    const children = isChildrenArray ? inputChildren[0] : inputChildren;
    const childrenElements = children.reduce((prevValue, currValue) => {
      if (typeof currValue === "object") {
        return [...prevValue, currValue];
      }

      if (typeof currValue === "string") {
        return [
          ...prevValue,
          {
            type: "TEXT ELEMENT",
            props: {
              nodeValue: currValue
            }
          }
        ];
      }

      console.error(new InvalidChildError(`Invalid child: ${currValue}`));
      return prevValue;
    }, []);

    return {
      type,
      props: {
        ...props,
        children: childrenElements
      }
    };
  }
}

OwnReactComponent.__internalInstance = null;
