import { reconcile } from "./reconcile";

export const updateInstance = (container, element) => {
  const newInstance = reconcile(container, null, element);
  return newInstance;
};
