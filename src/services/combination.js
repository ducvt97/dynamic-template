import JSONData from '@/data/combinations.json'

const combinations = JSONData.combinations

export function getAllCombinations() {
  return combinations.map((combination) => combination.combination)
}

export function getCombinationById(id) {
  return combinations.find((combination) => combination.combination.slug === id)
}

export function getMoreRelatedCombinations() {
  const index = Math.floor(Math.random() * combinations.length)
  return combinations[index].relatedCombinations
}
