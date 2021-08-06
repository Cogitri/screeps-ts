import routineFarm from "./routineFarm";
import routineUpgrade from "./routineUpgrade";

const pathColor = "#ffaa00";
export default function (creep: Creep): void {
  if (checkCreepCapacity(creep)) {
    routineFarm(creep);
  }

  if (checkSpawnCapacity(creep)) {
    routineUpgrade(creep);
  } else {
    // the creep looks for the nearest container.
    // the container the creep hopefully can use.
    const container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
      filter: structure => {
        return (
          structure.structureType === STRUCTURE_CONTAINER &&
          structure.store.getFreeCapacity(RESOURCE_ENERGY) >= creep.store.getUsedCapacity()
        );
      }
    });
    // if the creep cant use the container, the creep will use this target.
    const target = creep.room.find(FIND_STRUCTURES, {
      filter: structure => {
        return (
          (structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_SPAWN) &&
          structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
        );
      }
    });
    // check if there are any containers
    if (container !== undefined && container != null) {
      // check if the container is closer than the spwan based on the cost.
      if (PathFinder.search(creep.pos, container.pos).cost < PathFinder.search(creep.pos, target[0].pos).cost) {
        moveCreep(creep, container);
      } else {
        if (target.length > 0) {
          moveCreep(creep, target[0]);
        }
      }
      // if there are no containers the creep will go to the spawn.
    } else {
      if (target.length > 0) {
        moveCreep(creep, target[0]);
      }
    }
  }
}

function moveCreep(creep: Creep, goal: AnyStructure) {
  if (creep.transfer(goal, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
    if (!creep.memory.announceTask) {
      creep.say("⛴︎ deliver");
      creep.memory.announceTask = true;
    }
    creep.moveTo(goal, { visualizePathStyle: { stroke: pathColor } });
  }
}

// Checks if the creep capacity is full or empty
// Releases the locked task when capacity is empty
function checkCreepCapacity(creep: Creep): boolean {
  if (creep.store.getFreeCapacity() === 0 && !creep.memory.isWorking) {
    creep.memory.isWorking = true;
    creep.memory.isWorking = false;
    return false;
  }

  if (creep.store[RESOURCE_ENERGY] === 0 && creep.memory.isWorking) {
    creep.memory.isWorking = false;
    creep.memory.isWorking = false;
    return true;
  }

  return true;
}

// Checks spawn capacity to determine if harvester should upgrade controller
function checkSpawnCapacity(creep: Creep): boolean {
  if (creep.room.energyAvailable === creep.room.energyCapacityAvailable) {
    return false;
  }
  return false;
}
