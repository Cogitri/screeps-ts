export enum CreepRoles {
  ROLE_BUILDER = "builder",
  ROLE_HARVESTER = "harvester",
  ROLE_REPAIRER = "repairer",
  ROLE_SOLDIER = "soldier",
  ROLE_TRANSPORTER = "transporter",
  ROLE_UPGRADER = "upgrader"
}

export enum Routines {
  NONE = "none",
  FARMER = "farm",
  REPAIR = "repair",
  UPGRADE = "upgrade",
  ATTACK = "attack",
  WITHDRAW = "withdraw",
  ENERGIZE = "energize",
  TRANSPORT = "transport",
  BUILD = "build"
}

export default {
  /** Minimum Tower Capacity */
  TARGET_TOWER_CAPACITY: 300,
  /** The maximum Percetage of the total Energy that should be used to spawn a single creep */
  MAX_ENERGY_PERCENTAGE_TO_SPAWN: 0.6,
  DEFAULT_CREEP_COUNT: new Map<string, number>([
    [CreepRoles.ROLE_BUILDER, 2],
    [CreepRoles.ROLE_HARVESTER, 3],
    [CreepRoles.ROLE_REPAIRER, 1],
    [CreepRoles.ROLE_SOLDIER, 1],
    [CreepRoles.ROLE_TRANSPORTER, 3],
    [CreepRoles.ROLE_UPGRADER, 2]
  ]),
  DEFAULT_BODYPARTS: new Map<string, BodyPartConstant[]>([
    [CreepRoles.ROLE_BUILDER, [WORK, MOVE, MOVE, CARRY, CARRY]],
    [CreepRoles.ROLE_HARVESTER, [WORK, MOVE, WORK, CARRY]],
    [CreepRoles.ROLE_REPAIRER, [WORK, MOVE, MOVE, CARRY, CARRY]],
    [CreepRoles.ROLE_TRANSPORTER, [WORK, MOVE, MOVE, CARRY, CARRY]],
    [CreepRoles.ROLE_SOLDIER, [WORK, CARRY, MOVE, ATTACK, TOUGH, TOUGH]],
    [CreepRoles.ROLE_UPGRADER, [WORK, MOVE, MOVE, CARRY, CARRY]]
  ])
};

export enum WorkEmoji {
  EMOJI_ATTACK = "⚔️",
  EMOJI_BUILD = "⚒️",
  EMOJI_DELIVER = "✈️",
  EMOJI_HARVEST = "⛏️",
  EMOJI_REPAIR = "🛠️",
  EMOJI_UPGRADE = "⚡",
  EMOJI_WITHDRAW = "📤"
}

export enum WorkAction {
  ACTION_ATTACK = "Attack",
  ACTION_BUILD = "Build",
  ACTION_DELIVER = "Deliver",
  ACTION_HARVEST = "Harvest",
  ACTION_REPAIR = "Repair",
  ACTION_UPGRADE = "Upgrade",
  ACTION_WITHDRAW = "Withdraw"
}

export enum PathColors {
  PATHCOLOR_BUILDER = "#ffff33", // yellow -> 255, 255, 51
  PATHCOLOR_ENERGIZE_TOWER = "#ff5533", // neon orange
  PATHCOLOR_FARM = "#ffc400", // light orange
  PATHCOLOR_HARVESTER = "#ffc400", // light orange -> 255, 196, 0
  PATHCOLOR_PICKUPENERGY = "#00ff9d", // mint green
  PATHCOLOR_REPAIRER = "#ffff33", // yellow -> 255, 255, 51
  PATHCOLOR_SOLDIER = "#ff0000", // red -> 255, 0, 0
  PATHCOLOR_TRANSPORTER = "#33d6ff", // light blue -> 51, 214, 255
  PATHCOLOR_UPGRADE = "#00e600", // light green -> 0, 230, 0
  PATHCOLOR_WITHDRAW = "#ff3080", // pink
  PATHCOLOR_PATH = "#1300FF" // dark blue ->19, 0, 255
}
