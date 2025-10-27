"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemsListGet = itemsListGet;
function itemsListGet(req, res) {
  res.render("index", {
    title: "Items list",
  });
}
