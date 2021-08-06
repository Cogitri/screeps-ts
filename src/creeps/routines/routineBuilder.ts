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

  if (!creep.memory.working) {
    if (checkCreepCapacity(creep)) {
      routineFarm(creep);
    } else if (checkDamagedStructure(damagedStructure[0])) {
      repair(creep, damagedStructure[0]);
    } else if (checkConstructionSite(targets[0])) {
      buildByPriority(creep);
    } else {
      routineTransporter(creep);
    }
  }
}

// Function to start building
function build(creep: Creep, target: ConstructionSite): void {
  const pathColor = "#ffff33";
  if (creep.build(target) === ERR_NOT_IN_RANGE) {
    creep.memory.lockTask = true;
    creep.say("⚒️ build");
    movePath(creep, target, pathColor);
  }
}

// Function to start repairing
function repair(creep: Creep, damagedStructure: AnyStructure): void {
  const pathColor = "#ffff33";
  if (creep.repair(damagedStructure) === ERR_NOT_IN_RANGE) {
    creep.memory.lockTask = true;
    creep.say("🛠️ repair");
    movePath(creep, damagedStructure, pathColor);
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
  const walls = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES, {
    filter: s => s.structureType === STRUCTURE_WALL
  });
  const ramparts = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES, {
    filter: s => s.structureType === STRUCTURE_RAMPART
  });
  const roads = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES, {
    filter: s => s.structureType === STRUCTURE_ROAD
  });
  const buildings = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES, {
    filter: s =>
      s.structureType !== STRUCTURE_RAMPART && s.structureType !== STRUCTURE_ROAD && s.structureType !== STRUCTURE_WALL
  });

  if (buildings) {
    build(creep, buildings);
  } else if (roads) {
    build(creep, roads);
  } else if (ramparts) {
    build(creep, ramparts);
  } else if (walls) {
    build(creep, walls);
  }
}
