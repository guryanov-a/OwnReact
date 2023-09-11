import App from "../SampleApp";

test("jsx works", () => {
  expect(App).toEqual({ 
    props: { 
      children: [
        { props: { 
          nodeValue: 'Hello, World!'
        }, type: 'TEXT ELEMENT'
      }], 
      prop1: "prop value"
    }, 
    type: "h1"
  });
});
