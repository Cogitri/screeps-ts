const body = [WORK, MOVE, MOVE, CARRY, CARRY];
let builderNumber = 0;

export function spwanBuilder(spawn: StructureSpawn): void {
  const name = `builder${builderNumber}`;
  builderNumber++;
  spawn.spawnCreep(body, name, { memory: { role: "builder", room: "", working: false, counter: 34 } });
}
