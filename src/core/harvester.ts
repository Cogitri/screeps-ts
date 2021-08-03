const body = [WORK, MOVE, CARRY, CARRY];
let harvesterNumber = 0;

export function spawnHarvester(spawn: StructureSpawn): void {
  const name = `harvester${harvesterNumber}`;
  harvesterNumber++;
  spawn.spawnCreep(body, name, { memory: { role: "harvester", room: "", working: false } });
}

export function checkHarvesterWork(creep: Creep): void {
  if (!creep.memory.working) {
    if (creep.store[RESOURCE_ENERGY] < creep.store.getCapacity()) {
      const closestSource = creep.pos.findClosestByPath(FIND_SOURCES);
      if (closestSource != null) {
        const closestSourcePos = closestSource.pos;
        // eslint-disable-next-line eqeqeq
        if (creep.pos.getRangeTo(closestSource) == 0) {
          creep.harvest(closestSource);
        } else {
          creep.moveTo(closestSourcePos);
        }
      }
    } else {
      creep.moveTo(0, 0);
    }
  }
}
