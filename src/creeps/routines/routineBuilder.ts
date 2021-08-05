import routineFarm from "./routineFarm";
import routineTransporter from "./routineTransporter";

export default function (creep: Creep): void {
  const damagedStructure = creep.room.find(FIND_STRUCTURES, {
    filter: s =>
      (s.structureType === STRUCTURE_WALL && s.hits < 0.1 * s.hitsMax) ||
      (s.structureType !== STRUCTURE_WALL && s.hits < 0.69 * s.hitsMax)
  });

  const targets = creep.room.find(FIND_CONSTRUCTION_SITES);

  if (!creep.memory.working) {
    if (checkCreepCapacity(creep)) {
      routineFarm(creep);
    } else if (checkDamagedStructure(damagedStructure[0])) {
      repair(creep, damagedStructure[0]);
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
function repair(creep: Creep, damagedStructure: AnyStructure): void {
  const pathColor = "#ffff33";

  if (creep.repair(damagedStructure) === ERR_NOT_IN_RANGE) {
    creep.memory.lockTask = true;
    creep.say("🛠️ repair");
    creep.moveTo(damagedStructure, { visualizePathStyle: { stroke: pathColor } });
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
