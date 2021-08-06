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
    build(creep, target);
  }

  if (creep.memory.isWorking && damagedStructure[0]) {
    repair(creep, damagedStructure[0]);
  }
}

// Function to start building
function build(creep: Creep, target: ConstructionSite): void {
  const pathColor = "#ffff33";
  if (creep.build(target) === ERR_NOT_IN_RANGE) {
    if (!creep.memory.announceTask) {
      creep.say("⚒️ build");
      creep.memory.announceTask = true;
    }
    creep.moveTo(target, { visualizePathStyle: { stroke: pathColor } });
  }
}

// Function to start repairing
function repair(creep: Creep, damagedStructure: AnyStructure): void {
  const pathColor = "#ffff33";
  if (creep.repair(damagedStructure) === ERR_NOT_IN_RANGE) {
    if (!creep.memory.announceTask) {
      creep.say("🛠️ repair");
      creep.memory.announceTask = true;
    }
    creep.moveTo(damagedStructure, { visualizePathStyle: { stroke: pathColor } });
  }
}

// Checks if the creep capacity is full or empty
// Releases the locked task when capacity is empty
function checkCreepCapacity(creep: Creep): boolean {
  if (creep.store.getFreeCapacity() === 0 && !creep.memory.isWorking) {
    creep.memory.isWorking = true;
    creep.memory.announceTask = false;
    return false;
  }

  if (creep.store[RESOURCE_ENERGY] === 0 && creep.memory.isWorking) {
    creep.memory.isWorking = false;
    creep.memory.announceTask = false;
    return true;
  }
  return true;
}
