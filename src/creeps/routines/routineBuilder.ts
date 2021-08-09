import { movePath } from "./../../utils/vizPath";
import routineFarm from "./routineFarm";

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

  const target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);

  if (checkCreepCapacity(creep)) {
    routineFarm(creep);
  }

  if (creep.memory.isWorking && target) {
    buildByPriority(creep);
  } else if (creep.memory.isWorking && damagedStructure[0]) {
    repair(creep, damagedStructure[0]);
  }
}

// Function to start building
function build(creep: Creep, target: ConstructionSite): void {
  const pathColor = "#ffff33";
  if (creep.build(target) === ERR_NOT_IN_RANGE) {
    if (!creep.memory.announcedTask) {
      creep.say("⚒️ build");
      creep.memory.announcedTask = true;
    }
    movePath(creep, target, pathColor);
  }
}

// Function to start repairing
function repair(creep: Creep, damagedStructure: AnyStructure): void {
  const pathColor = "#ffff33";
  if (creep.repair(damagedStructure) === ERR_NOT_IN_RANGE) {
    if (!creep.memory.announcedTask) {
      creep.say("🛠️ repair");
      creep.memory.announcedTask = true;
    }
    movePath(creep, damagedStructure, pathColor);
  }
}

// Checks if the creep capacity is full or empty
// Releases the locked task when capacity is empty
function checkCreepCapacity(creep: Creep): boolean {
  if (creep.store.getFreeCapacity() === 0 && !creep.memory.isWorking) {
    creep.memory.isWorking = true;
    creep.memory.announcedTask = false;
    return false;
  }

  if (creep.store[RESOURCE_ENERGY] === 0 && creep.memory.isWorking) {
    creep.memory.isWorking = false;
    creep.memory.announcedTask = false;
    return true;
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
