import { db } from "../firebase";

export const addItem = item => {
  console.log("Item received is", item);
  db.ref("packages").set({
    name: item
  });
};
