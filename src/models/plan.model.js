let nextPlanId = 4;

const memoryPlans = [
  {
    id: 1,
    name: "Gratuito",
    price: 0,
    maxLinks: 10,
    maxClicks: 1000,
  },
  {
    id: 2,
    name: "Pro",
    price: 29.9,
    maxLinks: 100,
    maxClicks: 50000,
  },
  {
    id: 3,
    name: "Business",
    price: 99.9,
    maxLinks: 1000,
    maxClicks: 500000,
  },
];

function normalizePlan(data, id = nextPlanId++) {
  return {
    id,
    name: data.name,
    price: Number(data.price),
    maxLinks: Number(data.maxLinks),
    maxClicks: Number(data.maxClicks),
  };
}

export function getAll() {
  return memoryPlans;
}

export function getById(id) {
  return memoryPlans.find((plan) => plan.id === id) || null;
}

export function create(data) {
  const plan = normalizePlan(data);
  memoryPlans.push(plan);

  return plan;
}

export function update(id, data) {
  const planIndex = memoryPlans.findIndex((plan) => plan.id === id);

  if (planIndex === -1) {
    return null;
  }

  memoryPlans[planIndex] = {
    ...memoryPlans[planIndex],
    ...normalizePlan(data, id),
  };

  return memoryPlans[planIndex];
}

export function remove(id) {
  const planIndex = memoryPlans.findIndex((plan) => plan.id === id);

  if (planIndex === -1) {
    return false;
  }

  memoryPlans.splice(planIndex, 1);
  return true;
}
