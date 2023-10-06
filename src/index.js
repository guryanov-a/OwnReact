import { OwnReactComponent } from "./ownReact/OwnReactComponent";
import { App } from "./app/App";
import { renderDom } from "./ownReact/renderDom";

const root = document.getElementById("root");

// eslint-disable-next-line react/no-deprecated
renderDom(<App />, root);

