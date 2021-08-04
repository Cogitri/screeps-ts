const body = [WORK, MOVE, MOVE, CARRY, CARRY];

export function spawnTransporter(spawn: StructureSpawn): void {
  const name = `transporter${Game.time}${Math.trunc(Math.random() * 10)}`;
  spawn.spawnCreep(body, name, { memory: { role: "transporter", room: "", working: false, lockTask: false } });
}
