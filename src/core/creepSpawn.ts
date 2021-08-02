export default function (spawn: StructureSpawn): void {
  // Spawn a creep if there is none
  if (!spawn.room.find(FIND_MY_CREEPS).length) {
    // TODO: Implement defined standard creep body (Issue 4)
    // TODO: Assing unique name (Issue 5)
    spawn.spawnCreep([MOVE], `Creep1`);
    return;
  }
}
