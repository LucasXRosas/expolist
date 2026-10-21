import { Motorcycle, MotorcycleSection } from '../types/motorcycle';

export function groupMotorcyclesByCategory(
  motorcycles: Motorcycle[]
): MotorcycleSection[] {
  const grouped = motorcycles.reduce<Record<string, Motorcycle[]>>((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  return Object.keys(grouped)
    .sort((a, b) => a.localeCompare(b))
    .map((category) => ({
      title: category,
      data: grouped[category],
      total: grouped[category].length,
    }));
}