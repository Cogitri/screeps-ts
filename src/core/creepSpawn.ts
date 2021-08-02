export default function (spawn: StructureSpawn): void {
  // Spawn a creep if there is none
  if (!spawn.room.find(FIND_MY_CREEPS).length) {
    const creepBasicBody = [MOVE];
    // TODO: Assing unique name (Issue 5)
    spawn.spawnCreep(creepBasicBody, `Creep1`);
    return;
  }
}
