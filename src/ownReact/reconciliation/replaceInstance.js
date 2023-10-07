import { reconcile } from "./reconcile";

export const replaceInstance = (container, element) => {
  const newInstance = reconcile(container, null, element);
  return newInstance;
};
