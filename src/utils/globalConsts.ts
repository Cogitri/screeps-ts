export enum CreepRoles {
  ROLE_HARVESTER = "harvester",
  ROLE_BUILDER = "builder",
  ROLE_TRANSPORTER = "transporter",
  ROLE_SOLDIER = "soldier",
  ROLE_UPGRADER = "upgrader"
}

export default {
  /** Minimum Tower Capacity */
  TARGET_TOWER_CAPACITY: 300,
  DEFAULT_CREEP_COUNT: new Map<string, number>([
    [CreepRoles.ROLE_HARVESTER, 3],
    [CreepRoles.ROLE_BUILDER, 3],
    [CreepRoles.ROLE_SOLDIER, 1],
    [CreepRoles.ROLE_TRANSPORTER, 3],
    [CreepRoles.ROLE_UPGRADER, 2]
  ])
};

export enum PathColors {
  PATHCOLOR_BUILDER = "#ffff33", // yellow
  PATHCOLOR_ENERGIZE_TOWER = "#ff5533", // neon orange
  PATHCOLOR_FARM = "#ffc400", // light orange
  PATHCOLOR_HARVESTER = "#ffc400", // light orange
  PATHCOLOR_PICKUPENERGY = "#00ff9d", // mint green
  PATHCOLOR_REPAIR = "#ffff33", // yellow
  PATHCOLOR_SOLDIER = "#ff3333", // red
  PATHCOLOR_TRANSPORT = "#33d6ff", // light blue
  PATHCOLOR_UPGRADE = "#00e600", // light green
  PATHCOLOR_WITHDRAW = "#ff3080" // pink
}
