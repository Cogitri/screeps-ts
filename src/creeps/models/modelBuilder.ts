const body = [WORK, MOVE, MOVE, CARRY, CARRY];

export function spawnBuilder(spawn: StructureSpawn): void {
  const name = `harvester${Game.time}${Math.trunc(Math.random() * 10)}`;
  spawn.spawnCreep(body, name, { memory: { role: "builder", room: "", working: false } });
}
