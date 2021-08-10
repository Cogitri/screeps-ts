import { Logger } from "utils/logger";
import { PathColors } from "utils/globalConsts";
import { movePath } from "./../../utils/vizPath";
// eslint-disable-next-line sort-imports
import checkCreepCapacity from "./checkCreepCapacity";
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

  const target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);

  if (checkCreepCapacity(creep)) {
    routineTransporter(creep);
    if (creep.memory.currentTask !== "farm") {
      Logger.info(`${creep.name} switched to farm routine`);
      creep.memory.currentTask = "farm";
    }
  }

  if (creep.memory.isWorking && target) {
    buildByPriority(creep);
  } else if (creep.memory.isWorking && damagedStructures[0]) {
    repair(creep, damagedStructures[0]);
    if (creep.memory.currentTask !== "repair") {
      Logger.info(`${creep.name} switched to repair routine`);
      creep.memory.currentTask = "repair";
    }
  }
}

// Function to start building
function build(creep: Creep, target: ConstructionSite): void {
  if (creep.build(target) === ERR_NOT_IN_RANGE) {
    if (!creep.memory.announcedTask) {
      creep.say("⚒️ build");
      creep.memory.announcedTask = true;
    }
    movePath(creep, target, PathColors.PATHCOLOR_BUILDER);
  }
}

// Function to start repairing
function repair(creep: Creep, damagedStructure: AnyStructure): void {
  if (creep.repair(damagedStructure) === ERR_NOT_IN_RANGE) {
    if (!creep.memory.announcedTask) {
      creep.say("🛠️ repair");
      creep.memory.announcedTask = true;
    }
    movePath(creep, damagedStructure, PathColors.PATHCOLOR_REPAIR);
  }
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
