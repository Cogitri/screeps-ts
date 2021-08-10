import { PathColors, Routines, WorkEmoji } from "utils/globalConsts";
import { Logger } from "utils/logger";
import checkCreepCapacity from "./checkCreepCapacity";
import { movePath } from "utils/viz/vizPath";
import routineTransporter from "./routineTransporter";

/**
 * Basic routine for Builder role.
 *
 * Repairs structures below a certain threshold.
 *
 * Builds structures on construction sites by priority.
 * @param creep {@link https://docs.screeps.com/api/#Creep|Creep} - The creep.
 */
export default function (creep: Creep): void {
  const target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);

  if (checkCreepCapacity(creep)) {
    routineTransporter(creep);
    if (creep.memory.currentTask !== Routines.Farmer) {
      Logger.info(`${creep.name} switched to farm routine`);
      creep.memory.currentTask = Routines.Farmer;
    }
  }

  if (creep.memory.isWorking && target) {
    buildByPriority(creep);
    if (creep.memory.currentTask !== Routines.Build) {
      Logger.info(`${creep.name} switched to build routine`);
      creep.memory.currentTask = Routines.Build;
    }
  } else if (creep.memory.isWorking) {
    repair(creep);
    if (creep.memory.currentTask !== Routines.Repair) {
      Logger.info(`${creep.name} switched to repair routine`);
      creep.memory.currentTask = Routines.Repair;
    }
  }
}

/**
 * Build on construction site.
 * @param creep {@link https://docs.screeps.com/api/#Creep|Creep} - The creep.
 * @param target {@link https://docs.screeps.com/api/#ConstructionSite|ConstructionSite} - unfinished construction site.
 */
function build(creep: Creep, target: ConstructionSite): void {
  if (creep.build(target) === ERR_NOT_IN_RANGE) {
    if (!creep.memory.announcedTask) {
      creep.say(WorkEmoji.EMOJI_BUILD);
      creep.memory.announcedTask = true;
    }
    movePath(creep, target, PathColors.PATHCOLOR_BUILDER);
  }
}

/**
 * Start repairing if structure is below certain thresold.
 * @param creep {@link https://docs.screeps.com/api/#Creep|Creep} - The creep.
 * @param damagedStructure AnyStructure - Structure to be repaired.
 */
function repair(creep: Creep): void {
  // check for closest damaged structure
  const damagedStructure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
    filter: s =>
      (s.structureType === STRUCTURE_WALL && s.hits < 0.001 * s.hitsMax) ||
      (s.structureType === STRUCTURE_RAMPART && s.hits < 0.01 * s.hitsMax) ||
      (s.structureType === STRUCTURE_ROAD && s.hits < 0.25 * s.hitsMax) ||
      (s.structureType !== STRUCTURE_RAMPART &&
        s.structureType !== STRUCTURE_WALL &&
        s.structureType !== STRUCTURE_ROAD &&
        s.hits < 0.69 * s.hitsMax)
  });
  if (damagedStructure) {
    if (creep.repair(damagedStructure) === ERR_NOT_IN_RANGE) {
      creep.memory.isWorking = true;
      creep.say(`${WorkEmoji.EMOJI_REPAIR} repair`);
      movePath(creep, damagedStructure, PathColors.PATHCOLOR_REPAIRER);
    }
  }
}

/**
 * Builds the constructionsites by order of priority:
 * first buildings, then roads, then ramparts and then walls
 * @param creep {@link https://docs.screeps.com/api/#Creep|Creep} - The creep.
 */
function buildByPriority(creep: Creep): void {
  // check for different constructions
  const wall = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES, {
    filter: s => s.structureType === STRUCTURE_WALL
  });
  const rampart = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES, {
    filter: s => s.structureType === STRUCTURE_RAMPART
  });
  const road = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES, {
    filter: s => s.structureType === STRUCTURE_ROAD
  });
  const building = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES, {
    filter: s =>
      s.structureType !== STRUCTURE_RAMPART && s.structureType !== STRUCTURE_ROAD && s.structureType !== STRUCTURE_WALL
  });

  if (building) {
    build(creep, building);
  } else if (road) {
    build(creep, road);
  } else if (rampart) {
    build(creep, rampart);
  } else if (wall) {
    build(creep, wall);
  }
}
