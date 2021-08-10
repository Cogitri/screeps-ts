import { PathColors } from "utils/globalConsts";
import { movePath } from "utils/vizPath";
// eslint-disable-next-line sort-imports
import checkCreepCapacity from "./checkCreepCapacity";
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

  if (checkCreepCapacity(creep)) {
    routineTransporter(creep);
  }

  if (damagedStructures[0]) {
    repair(creep);
  } else if (targets[0]) {
    build(creep, targets[0]);
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

  if (damagedStructure) {
    if (creep.repair(damagedStructure) === ERR_NOT_IN_RANGE) {
      if (!creep.memory.announcedTask) {
        creep.say("🛠️ repair");
        creep.memory.announcedTask = true;
      }
      movePath(creep, damagedStructure, PathColors.PATHCOLOR_REPAIR);
    }
  }
}
