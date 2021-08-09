import { movePath } from "utils/vizPath";
// eslint-disable-next-line sort-imports
import checkCreepCapacity from "./checkCreepCapacity";
import routineFarm from "./routineFarm";
import routineTransporter from "./routineTransporter";

export default function (creep: Creep): void {
  // check for all damaged structures
  const damagedStructures = creep.room.find(FIND_STRUCTURES, {
    filter: s =>
      (s.structureType === STRUCTURE_WALL && s.hits < 0.1 * s.hitsMax) ||
      (s.structureType !== STRUCTURE_WALL && s.hits < 0.69 * s.hitsMax)
  });

  // check for all construction sites
  const targets = creep.room.find(FIND_CONSTRUCTION_SITES);

  if (!creep.memory.working) {
    if (checkCreepCapacity(creep)) {
      routineFarm(creep);
    } else if (checkDamagedStructure(damagedStructures[0])) {
      repair(creep);
    } else if (checkConstructionSite(targets[0])) {
      build(creep, targets[0]);
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
    creep.moveTo(target, { visualizePathStyle: { stroke: pathColor } });
  }
}

// Function to start repairing
function repair(creep: Creep): void {
  // check for closes damaged structure
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
  const pathColor = "#ffff33";
  if (damagedStructure) {
    if (creep.repair(damagedStructure) === ERR_NOT_IN_RANGE) {
      creep.memory.lockTask = true;
      creep.say("🛠️ repair");
      movePath(creep, damagedStructure, pathColor);
    }
  }
}

// Checks if the constructionsite target is not NULL
function checkConstructionSite(target: ConstructionSite): boolean {
  if (!target) {
    return false;
  }

  return true;
}

// Checks if the damagedStructure is not NULL
function checkDamagedStructure(damagedStructure: AnyStructure): boolean {
  if (!damagedStructure) {
    return false;
  }

  return true;
}
