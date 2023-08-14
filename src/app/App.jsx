/**
 * List item (which is wrapper for <li>)
 * @param {string} props.children - content of list item
 * @returns {JSX.Element}
 */
const ListItem = (props) => {
    return (
        <li>{props.children}</li>
    );
};

/**
 * List (which is wrapper for <ul>)
 * @param props.children - list items
 * @returns {JSX.Element}
 */
const List = (props) => {
    return (
        <ul>
            {props.children}
        </ul>
    );
}

/**
 * List with random numbers
 */
const App = () => {
    // creating list items
    const listItems = alphabet.map((letter) => {
        return <ListItem key={letter}>{letter}</ListItem>
    });

    return (
        <List>
            {listItems}
        </List>
      );
};

export default App;