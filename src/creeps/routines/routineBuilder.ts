import routineBuild from "./routineBuild";
import routineFarm from "./routineFarm";
import routineRepair from "./routineRepair";

export default function (creep: Creep): void {
  const damagedStructure = creep.room.find(FIND_STRUCTURES, {
    filter: s =>
      (s.structureType === STRUCTURE_WALL && s.hits < 0.1 * s.hitsMax) ||
      (s.structureType !== STRUCTURE_WALL && s.hits < 0.69 * s.hitsMax)
  });

  if (!creep.memory.working) {
    if (checkCreepCapacity(creep)) {
      routineFarm(creep);
    } else if (checkDamagedStructure(damagedStructure[0])) {
      routineRepair(creep, damagedStructure[0]);
    } else {
      routineBuild(creep);
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

// Checks if the damagedStructure is NULL
function checkDamagedStructure(damagedStructure: AnyStructure): boolean {
  if (!damagedStructure) {
    return false;
  }

  return true;
}
