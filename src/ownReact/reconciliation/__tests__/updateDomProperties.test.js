import { updateDomProperties } from "../updateDomProperties";

describe("updateDomProperties", () => {
  it("should update dom properties", () => {
    expect.hasAssertions();
    const element = {
      props: {
        className: "foo",
        style: {
          color: "red"
        }
      }
    };
    const instance = {
      className: "",
      style: {},
      element
    };

    const nextInstance = updateDomProperties(
      instance.dom,
      instance.element.props,
      element.props
    );

    expect(nextInstance.className).toBe("foo");
    expect(nextInstance.style.color).toBe("red");
  });
});
