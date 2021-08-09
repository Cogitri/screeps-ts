export enum CreepRoles {
  ROLE_HARVESTER = "harvester",
  ROLE_BUILDER = "builder",
  ROLE_TRANSPORTER = "transporter",
  ROLE_SOLDIER = "soldier",
  ROLE_UPGRADER = "upgrader",
  ROLE_REPAIRER = "repairer"
}

export enum Routines {
  None,
  Farmer,
  Repair,
  Upgrade,
  Attack,
  Withdraw,
  Energize,
  Transport,
  Build
}

export default {
  /** Minimum Tower Capacity */
  TARGET_TOWER_CAPACITY: 300,
  DEFAULT_CREEP_COUNT: new Map<string, number>([
    [CreepRoles.ROLE_HARVESTER, 3],
    [CreepRoles.ROLE_BUILDER, 3],
    [CreepRoles.ROLE_SOLDIER, 1],
    [CreepRoles.ROLE_TRANSPORTER, 3],
    [CreepRoles.ROLE_UPGRADER, 2],
    [CreepRoles.ROLE_REPAIRER, 1]
  ]),
  DEFAULT_BODYPARTS: new Map<string, BodyPartConstant[]>([
    [CreepRoles.ROLE_HARVESTER, [WORK, MOVE, WORK, CARRY]],
    [CreepRoles.ROLE_BUILDER, [WORK, MOVE, MOVE, CARRY, CARRY]],
    [CreepRoles.ROLE_TRANSPORTER, [WORK, MOVE, MOVE, CARRY, CARRY]],
    [CreepRoles.ROLE_SOLDIER, [WORK, CARRY, MOVE, ATTACK, TOUGH, TOUGH]],
    [CreepRoles.ROLE_UPGRADER, [WORK, MOVE, MOVE, CARRY, CARRY]],
    [CreepRoles.ROLE_REPAIRER, [WORK, MOVE, MOVE, CARRY, CARRY]]
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
