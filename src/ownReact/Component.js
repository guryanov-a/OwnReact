import updateInstance from "./reconcile/updateInstance";

/**
 * Component class that resembles React.Component
 */
export default class Component {
    constructor(props) {
        this.props = props;
        this.state = {};
    }

    setState(partialState) {
        this.state = {
            ...this.state,
            ...partialState
        };
        
        updateInstance(this.__internalInstance);
    }
}