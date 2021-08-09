export enum CreepRoles {
  ROLE_HARVESTER = "harvester",
  ROLE_BUILDER = "builder",
  ROLE_TRANSPORTER = "transporter",
  ROLE_SOLDIER = "soldier"
}

/** Amount of Creeps we want to spawn of each Role */
export enum AmountPerRoles {
  AMOUNT_HARVESTER = 3, // TODO Only spawn as many harvesters, as spots at a source.
  AMOUNT_BUILDER = 3,
  AMOUNT_TRANSPORTER = 1,
  AMOUNT_SOLDIER = 1
}

export default {
  /** Minimum Tower Capacity */
  TARGET_TOWER_CAPACITY: 300
};
