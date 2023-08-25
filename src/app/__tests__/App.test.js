import App from "../../../samples/SampleApp";
import OwnReactComponent from "../../ownReact/OwnReactComponent";

test("jsx works", () => {
  expect(App).toEqual(["h1", { prop1: "prop value" }, "Hello, World!"]);
});
