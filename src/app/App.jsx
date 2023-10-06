import { OwnReactComponent } from "../ownReact/OwnReactComponent";
import { List } from "./List";
import { ListItem } from "./ListItem";

export const alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z"
];

let timer;

/**
 * List with random numbers
 */
export class App extends OwnReactComponent {
  constructor(props) {
    super(props);

    this.state = {
      alphabet
    };
  }

  // randomly changes position of all letters in alphabet
  updateAlphabet() {
    this.setState(state => {
      const newAlphabet = [...state.alphabet];

      for (let i = 0; i < newAlphabet.length; i += 1) {
        const randomIndex = Math.floor(Math.random() * newAlphabet.length);
        const temp = newAlphabet[i];
        newAlphabet[i] = newAlphabet[randomIndex];
        newAlphabet[randomIndex] = temp;
      }

      return {
        alphabet: newAlphabet
      };
    });
  }

  componentDidMount() {
    timer = setInterval(() => {
      this.updateAlphabet();
    }, 5000);

    this.setState({
      alphabet
    });
  }

  componentWillUnmount() {
    clearInterval(timer);
  }

  render() {
    // creating list items
    const listItems = this.state.alphabet.map(letter => {
      return <ListItem key={letter}>{letter}</ListItem>;
    });

    return <List>{listItems}</List>;
  }
}
