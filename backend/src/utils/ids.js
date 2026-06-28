import mongoose from "mongoose";

export function cleanObjectIds(payload, fields) {
  const next = { ...payload };

  fields.forEach((field) => {
    if (Array.isArray(next[field])) {
      next[field] = next[field].filter((value) => mongoose.isValidObjectId(value));
      return;
    }

    if (next[field] === "" || next[field] === null || next[field] === undefined) {
      delete next[field];
      return;
    }

    if (!mongoose.isValidObjectId(next[field])) {
      delete next[field];
    }
  });

  return next;
}
