import * as medicineModel from "../models/medicine.model.js";

function toJsonSafe(value) {
  return JSON.parse(
    JSON.stringify(value, (_, currentValue) => {
      if (typeof currentValue === "bigint") {
        return currentValue.toString();
      }

      return currentValue;
    })
  );
}

function sendError(res, error) {
  const isMissingDatabase = error.message.includes("DATABASE_URL");

  res.status(isMissingDatabase ? 503 : 500).json({
    error: error.message,
  });
}

export async function getAll(req, res) {
  try {
    const medicines = await medicineModel.getAll();
    res.json(toJsonSafe(medicines));
  } catch (error) {
    sendError(res, error);
  }
}

export async function getById(req, res) {
  try {
    const medicine = await medicineModel.getById(BigInt(req.params.id));

    if (!medicine) {
      return res.status(404).json({
        error: "Remedio nao encontrado",
      });
    }

    res.json(toJsonSafe(medicine));
  } catch (error) {
    sendError(res, error);
  }
}

export async function getByCode(req, res) {
  try {
    const medicine = await medicineModel.getByCode(req.params.codigo);

    if (!medicine) {
      return res.status(404).json({
        error: "Remedio nao encontrado",
      });
    }

    res.json(toJsonSafe(medicine));
  } catch (error) {
    sendError(res, error);
  }
}

export async function search(req, res) {
  try {
    const medicines = await medicineModel.search(req.params.termo);

    res.json(toJsonSafe(medicines));
  } catch (error) {
    sendError(res, error);
  }
}

export async function mostSearched(req, res) {
  try {
    const medicines = await medicineModel.mostSearched();

    res.json(toJsonSafe(medicines));
  } catch (error) {
    sendError(res, error);
  }
}

export async function create(req, res) {
  try {
    const medicine = await medicineModel.create(req.body);

    res.status(201).json(toJsonSafe(medicine));
  } catch (error) {
    sendError(res, error);
  }
}

export async function update(req, res) {
  try {
    const medicine = await medicineModel.update(BigInt(req.params.id), req.body);

    res.json(toJsonSafe(medicine));
  } catch (error) {
    sendError(res, error);
  }
}

export async function remove(req, res) {
  try {
    await medicineModel.remove(BigInt(req.params.id));

    res.json({
      message: "Remedio removido com sucesso",
    });
  } catch (error) {
    sendError(res, error);
  }
}
