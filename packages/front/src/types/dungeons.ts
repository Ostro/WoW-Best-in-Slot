export enum Dungeon {
  NW = 'NW',
  SOA = 'SOA',
  DOS = 'DOS',
  MISTS = 'MISTS',
  HOA = 'HOA',
  SD = 'SD',
  PF = 'PF',
  TOP = 'TOP'
}

export const dungeonList = [
  {
    name: 'Necrotic Wake',
    value: 'NW',
  },
  {
    name: 'Spires of Ascension',
    value: 'SOA',
  },
  {
    name: 'De Other Side',
    value: 'DOS',
  },
  {
    name: 'Mists of Tirna Scithe',
    value: 'MISTS',
  },
  {
    name: 'Halls of Atonement',
    value: 'HOA',
  },
  {
    name: 'Sanguine Depths',
    value: 'SD',
  },
  {
    name: 'Plaguefall',
    value: 'PF',
  },
  {
    name: 'Theater of Pain',
    value: 'HOA',
  },
];

export function getDungeonName(value: string): string {
  const dungeon = dungeonList.find((dng) => dng.value === value);
  return dungeon?.name ?? value;
}
