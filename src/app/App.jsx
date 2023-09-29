import { OwnReactComponent } from "../ownReact/OwnReactComponent";

/**
 * List item (which is wrapper for <li>)
 * @param {string} props.children - content of list item
 * @returns {JSX.Element}
 */
class ListItem extends OwnReactComponent {
    render() {
        return (
            <li>{this.props.children}</li>
        );
    }
}

/**
 * List (which is wrapper for <ul>)
 * @param props.children - list items
 * @returns {JSX.Element}
 */
class List extends OwnReactComponent {
    render() {
        return (
            <ul>
                {this.props.children}
            </ul>
        );
    }
}

const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
"N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

let timer;

/**
 * List with random numbers
 */
class App extends OwnReactComponent {
    constructor(props) {
        super(props);

        this.state = {
            alphabet,
        };
    }

    updateAlphabet() {
        const alphabet = this.state.alphabet;
        const index = Math.floor(Math.random() * alphabet.length);
        const letter = alphabet[index];

        alphabet[index] = letter.toLowerCase();

        this.setState({
            alphabet,
        });
    }

    componentDidMount() {
        console.log("App component did mount");
        timer = setInterval(() => {
            this.updateAlphabet();
        }, 5000);

        this.setState({
            alphabet: alphabet
        });
    }

    componentWillUnmount() {
        clearInterval(timer);
    }

    render() {
        // creating list items
        const listItems = this.state.alphabet.map((letter) => {
            return <ListItem>{letter}</ListItem>
        });

        return (
            <List>
                {listItems}
            </List>
        );
    }
}

export default App;