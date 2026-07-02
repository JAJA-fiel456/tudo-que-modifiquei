import * as planModel from "../models/plan.model.js";

function validatePlan(data) {
  const price = Number(data.price);
  const maxLinks = Number(data.maxLinks);
  const maxClicks = Number(data.maxClicks);

  if (!data.name || !data.name.trim()) {
    return "Informe o nome do plano.";
  }

  if (!Number.isFinite(price) || price < 0) {
    return "Informe um preco valido.";
  }

  if (!Number.isInteger(maxLinks) || maxLinks < 1) {
    return "Informe um limite de links valido.";
  }

  if (!Number.isInteger(maxClicks) || maxClicks < 1) {
    return "Informe um limite de cliques valido.";
  }

  return null;
}

export function getAll(req, res) {
  res.json(planModel.getAll());
}

export function getById(req, res) {
  const plan = planModel.getById(Number(req.params.id));

  if (!plan) {
    return res.status(404).json({ error: "Plano nao encontrado." });
  }

  res.json(plan);
}

export function create(req, res) {
  const validationError = validatePlan(req.body);

  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  const plan = planModel.create(req.body);
  res.status(201).json(plan);
}

export function update(req, res) {
  const validationError = validatePlan(req.body);

  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  const plan = planModel.update(Number(req.params.id), req.body);

  if (!plan) {
    return res.status(404).json({ error: "Plano nao encontrado." });
  }

  res.json(plan);
}

export function remove(req, res) {
  const deleted = planModel.remove(Number(req.params.id));

  if (!deleted) {
    return res.status(404).json({ error: "Plano nao encontrado." });
  }

  res.status(204).send();
}
