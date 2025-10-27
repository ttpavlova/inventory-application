function itemsListGet(req, res) {
  res.render("index", {
    title: "Items list",
  });
}

export { itemsListGet };
