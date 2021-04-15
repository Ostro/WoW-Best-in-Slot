import { Dungeon } from './dungeons';

export enum Slot {
  TwoHandedWeapon = 'THW',
  OneHandedWeapon = 'OHW',
  OffHand = 'OH',
  Head = 'HEAD',
  Neck = 'NECK',
  Shoulder = 'SHOULDER',
  Cloak = 'CLOAK',
  Torse = 'TORSO',
  Bracers = 'BRACERS',
  Glovers = 'GLOVES',
  Belt = 'BELT',
  Legs = 'LEGS',
  Boots = 'BOOTS',
  Ring = 'RING',
  Trinket = 'TRINKET'
}

export const gearSlots = [
  {
    name: 'Two Handed Weapon',
    value: 'THW',
  },
  {
    name: 'One Handed Weapon',
    value: 'OHW',
  },
  {
    name: 'Off-Hand',
    value: 'OH',
  },
  {
    name: 'Helm',
    value: 'HEAD',
  },
  {
    name: 'Necklace',
    value: 'NECK',
  },
  {
    name: 'Shoulders',
    value: 'SHOULDER',
  },
  {
    name: 'Cloak',
    value: 'CLOAK',
  },
  {
    name: 'Torso',
    value: 'TORSO',
  },
  {
    name: 'Bracers',
    value: 'BRACERS',
  },
  {
    name: 'Gloves',
    value: 'GLOVES',
  },
  {
    name: 'Belt',
    value: 'BELT',
  },
  {
    name: 'Legs',
    value: 'LEGS',
  },
  {
    name: 'Boots',
    value: 'BOOTS',
  },
  {
    name: 'Ring',
    value: 'RING',
  },
  {
    name: 'Trinket',
    value: 'TRINKETS',
  },
];

export interface Gear {
  id: number;
  name: string;
  slot: Slot;
  dungeon: Dungeon;
}

export function getSlotName(value: string): string {
  const slot = gearSlots.find((slt) => slt.value === value);
  return slot?.name ?? value;
}
