export default function (spawn: StructureSpawn): void {
  // Spawn a creep if there is none
  let creepNumber = 0;
  if (!spawn.room.find(FIND_MY_CREEPS).length) {
    const creepBasicBody = [WORK, CARRY, MOVE];
    const creepName = `Creep${creepNumber}`;
    creepNumber++;

    spawn.spawnCreep(creepBasicBody, creepName, { memory: { role: "creep", room: "", working: true } });
    return;
  }
}
