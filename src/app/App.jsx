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

const updateAlphabetState = state => {
  const newAlphabet = [...state.alphabet];
  const randomLength = Math.floor(Math.random() * newAlphabet.length);

  for (let i = 0; i < randomLength; i += 1) {
    const randomIndex1 = Math.floor(Math.random() * newAlphabet.length);
    const randomIndex2 = Math.floor(Math.random() * newAlphabet.length);

    const temp = newAlphabet[randomIndex1];
    newAlphabet[randomIndex1] = newAlphabet[randomIndex2];
    newAlphabet[randomIndex2] = temp;
  }

  return {
    alphabet: newAlphabet
  };
};

/**
 * List with random numbers
 */
export class App extends OwnReactComponent {
  constructor(props) {
    super(props);

    this.state = {
      alphabet
    };

    this.handleClick = this.handleClick.bind(this);
  }

  // randomly changes position of random number of letters in the alphabet
  handleClick() {
    this.setState(updateAlphabetState);
  }

  render() {
    // creating list items
    const listItems = this.state.alphabet.map(letter => {
      return <ListItem key={letter}>{letter}</ListItem>;
    });

    return (
      <div>
        <button onClick={this.handleClick}>Update</button>
        <List>{listItems}</List>
      </div>
    );
  }
}
