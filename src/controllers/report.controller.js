import * as ReportModel from "../models/report.model.js";

export async function create(req, res) {
  const report =
    await ReportModel.create(req.body);

  res.status(201).json(report);
}

export async function getAll(req, res) {
  const reports =
    await ReportModel.getAll();

  res.json(reports);
}

export async function getById(req, res) {
  const report =
    await ReportModel.getById(req.params.id);

  res.json(report);
}

export async function remove(req, res) {
  await ReportModel.remove(req.params.id);

  res.status(204).send();
}