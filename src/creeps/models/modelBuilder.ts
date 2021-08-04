const body = [WORK, MOVE, MOVE, CARRY, CARRY];

export function spawnBuilder(spawn: StructureSpawn): void {
  const name = `builder${Game.time}${Math.trunc(Math.random() * 10)}`;
  spawn.spawnCreep(body, name, { memory: { role: "builder", room: "", working: false, lockTask: false } });
  if (spawn.spawning) {
    console.log("TEST");
    var spawningCreep = Game.creeps[spawn.spawning.name];
    spawn.room.visual.text("🛠️" + spawningCreep.memory.role, spawn.pos.x + 1, spawn.pos.y, {
      align: "left",
      opacity: 0.8
    });
  }
}
