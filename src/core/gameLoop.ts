import creepSpawn from "./creepSpawn";

export default function (): void {
  // Iterate over all owned spawns
  for (const spawn in Game.spawns) {
    // Check if creep is already spawning (avoids bug)
    if (!Game.spawns[spawn].spawning) {
      creepSpawn(Game.spawns[spawn]);
    }
  }

  for (const name in Game.creeps) {
    const creep = Game.creeps[name];
    if (!creep.memory.working) {
      creep.say("Hello World, i am " + creep.name);
    }
  }
}
