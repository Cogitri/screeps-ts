export default function (spawn: StructureSpawn): void {
  // Spawn a creep if there is none
  if (!spawn.room.find(FIND_MY_CREEPS).length) {
    const creepBasicBody = [MOVE];
    // TODO: Assing unique name (Issue 5)
    spawn.spawnCreep([MOVE], `Creep1`, { memory: { role: "creep", working: false, room: spawn.room.name } });
    return;
  }
}
