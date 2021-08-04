import routineFarm from "./routineFarm";
import routineUpgrade from "./routineUpgrade";

export default function (creep: Creep): void {
  const pathColor = "#ffaa00";

  if (!creep.memory.working) {
    if (checkSpawnCapacity(creep)) {
      routineUpgrade(creep);
    } else {
      if (checkCreepCapacity(creep)) {
        routineFarm(creep);
      } else {
        // the creep looks for the nearest container.
        // the container the creep uses.
        const container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
          filter: structure => {
            return (
              structure.structureType === STRUCTURE_CONTAINER &&
              structure.store.getFreeCapacity(RESOURCE_ENERGY) >= creep.store.getUsedCapacity()
            );
          }
        });
        // check if there are any containers
        if (container !== undefined && container != null) {
          if (creep.transfer(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.memory.lockTask = false;
            creep.memory.target = container;
            creep.say("⛴︎ deliver");
            creep.moveTo(container, { visualizePathStyle: { stroke: pathColor } });
          }
          // if there are no containers the creep will go to the spawn.
        } else {
          const target = creep.room.find(FIND_STRUCTURES, {
            filter: structure => {
              return (
                (structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_SPAWN) &&
                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
              );
            }
          });

          if (target.length > 0) {
            if (creep.transfer(target[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
              creep.memory.lockTask = false;
              creep.say("⛴︎ deliver");
              creep.moveTo(target[0], { visualizePathStyle: { stroke: pathColor } });
            }
          }
        }
      }
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

// Checks spawn capacity to determine if harvester should upgrade controller
function checkSpawnCapacity(creep: Creep): boolean {
  if (creep.room.energyAvailable === creep.room.energyCapacityAvailable) {
    return true;
  }
  return false;
}
