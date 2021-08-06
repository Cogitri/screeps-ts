import { PathColors } from "utils/globalConsts";
import { Logger } from "utils/logger";
import { movePath } from "./../../utils/vizPath";
import routineFarm from "./routineFarm";
import routineTransporter from "./routineTransporter";

export default function (creep: Creep): void {
  const damagedStructure = creep.room.find(FIND_STRUCTURES, {
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
      if (creep.memory.currentTask !== "Farm") {
        Logger.info(`Switched to Farm Routine`);
        creep.memory.currentTask = "Farm";
      }
    } else if (checkDamagedStructure(damagedStructure[0])) {
      repair(creep, damagedStructure[0]);
      if (creep.memory.currentTask !== "Repair") {
        Logger.info(`Switched to Repair Routine`);
        creep.memory.currentTask = "Repair";
      }
    } else if (checkConstructionSite(targets[0])) {
      buildByPriority(creep);
    } else {
      routineTransporter(creep);
      if (creep.memory.currentTask !== "Transport") {
        Logger.info(`Switched to Transporter Routine`);
        creep.memory.currentTask = "Transport";
      }
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
function repair(creep: Creep, damagedStructure: AnyStructure): void {
  if (creep.repair(damagedStructure) === ERR_NOT_IN_RANGE) {
    creep.memory.lockTask = true;
    creep.say("🛠️ repair");
    movePath(creep, damagedStructure, PathColors.PATHCOLOR_REPAIR);
  }
}

// Checks if the constructionsite target is not NULL
function checkConstructionSite(target: ConstructionSite): boolean {
  if (!target) {
    return false;
  }

  return true;
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

// Checks if the damagedStructure is not NULL
function checkDamagedStructure(damagedStructure: AnyStructure): boolean {
  if (!damagedStructure) {
    return false;
  }

  return true;
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
