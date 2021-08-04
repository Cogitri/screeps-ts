const body = [WORK, MOVE, WORK, CARRY];

export function spawnHarvester(spawn: StructureSpawn): void {
  const name = `harvester${Game.time}${Math.trunc(Math.random() * 10)}`;
  spawn.spawnCreep(body, name, {
    memory: { role: "harvester", room: "", working: false, lockTask: false, target: null }
  });
}
