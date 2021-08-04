const body = [WORK, CARRY, MOVE, ATTACK, TOUGH, TOUGH];

export function spawnSoldier(spawn: StructureSpawn): void {
  const name = `soldier${Game.time}${Math.trunc(Math.random() * 10)}`;
  spawn.spawnCreep(body, name, {
    memory: { role: "soldier", room: "", working: false, lockTask: false, target: null }
  });
}
