import * as FavoriteModel from "../models/favorite.model.js";

export async function create(req, res) {
  const favorite =
    await FavoriteModel.create(req.body);

  res.status(201).json(favorite);
}

export async function getAll(req, res) {
  const favorites =
    await FavoriteModel.getAll();

  res.json(favorites);
}

export async function remove(req, res) {
  await FavoriteModel.remove(req.params.id);

  res.status(204).send();
}