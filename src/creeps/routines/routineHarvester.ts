import routineFarm from "./routineFarm";
import routineUpgrade from "./routineUpgrade";

export default function (creep: Creep): void {
  if (!creep.memory.working) {
    if (checkCreepCapacity(creep)) {
      routineFarm(creep);
    } else {
      if (checkSpawnCapacity(creep)) {
        routineUpgrade(creep);
      } else {
        const target = creep.room.find(FIND_STRUCTURES, {
          filter: structure => structure.structureType === STRUCTURE_SPAWN
        });

        if (target.length > 0) {
          if (creep.transfer(target[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.memory.lockTask = false;
            creep.say("⛴︎ deliver");
            creep.moveTo(target[0]);
          }
        }
      }
    }
  }
}

function checkCreepCapacity(creep: Creep): boolean {
  if (creep.store.getFreeCapacity() > 0 && !creep.memory.lockTask) {
    return true;
  }
  return false;
}

function checkSpawnCapacity(creep: Creep): boolean {
  if (creep.room.energyAvailable === creep.room.energyCapacityAvailable) {
    return true;
  }
  return false;
}
