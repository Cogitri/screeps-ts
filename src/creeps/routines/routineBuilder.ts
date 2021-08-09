import { Logger } from "utils/logger";
import { PathColors } from "utils/globalConsts";
import { movePath } from "./../../utils/vizPath";
import routineFarm from "./routineFarm";
import routineTransporter from "./routineTransporter";

export default function (creep: Creep): void {
  // check for damaged structures
  const damagedStructures = creep.room.find(FIND_STRUCTURES, {
    filter: s =>
      (s.structureType === STRUCTURE_WALL && s.hits < 0.001 * s.hitsMax) ||
      (s.structureType === STRUCTURE_RAMPART && s.hits < 0.01 * s.hitsMax) ||
      (s.structureType === STRUCTURE_ROAD && s.hits < 0.25 * s.hitsMax) ||
      (s.structureType !== STRUCTURE_RAMPART &&
        s.structureType !== STRUCTURE_WALL &&
        s.structureType !== STRUCTURE_ROAD &&
        s.hits < 0.69 * s.hitsMax)
  });

  const targets = creep.room.find(FIND_CONSTRUCTION_SITES);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (!creep.memory.working) {
    if (checkCreepCapacity(creep)) {
      routineFarm(creep);
      if (creep.memory.currentTask !== "farm") {
        Logger.info(`${creep.name} switched to farm routine`);
        creep.memory.currentTask = "farm";
      }
    } else if (damagedStructures.length !== 0) {
      repair(creep);
      if (creep.memory.currentTask !== "repair") {
        Logger.info(`${creep.name} switched to repair routine`);
        creep.memory.currentTask = "repair";
      }
    } else if (targets.length !== 0) {
      buildByPriority(creep);
    } else {
      routineTransporter(creep);
    }
  }
}

// Function to start building
function build(creep: Creep, target: ConstructionSite): void {
  if (creep.build(target) === ERR_NOT_IN_RANGE) {
    creep.memory.lockTask = true;
    creep.say("⚒️ build");
    movePath(creep, target, PathColors.PATHCOLOR_BUILDER);
  }
}

// Function to start repairing
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
      creep.memory.lockTask = true;
      creep.say("🛠️ repair");
      movePath(creep, damagedStructure, PathColors.PATHCOLOR_REPAIR);
    }
  }
}

// Checks if the creep capacity is full or empty
// Releases the locked task when capacity is empty
function checkCreepCapacity(creep: Creep): boolean {
  if (creep.store.getFreeCapacity() > 0 && !creep.memory.lockTask) {
    return true;
  }

  if (creep.store[RESOURCE_ENERGY] === 0 && creep.memory.lockTask) {
    creep.memory.lockTask = false;
    return true;
  }
  return false;
}

/**
 * Builds the constructionsites by order of priority:
 * first buildings, then roads, then ramparts and then walls
 *
 * @param creep
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
