import creepWork from "./creepWork";
import buildStreet from "./buildStreet";
import creepSpawn from "./creepSpawn";

export default function (): void {
  // Iterate over all owned spawns
  for (const spawn in Game.spawns) {
    buildStreet(Game.spawns[spawn]);
    // Check if creep is already spawning (avoids bug)
    if (!Game.spawns[spawn].spawning) {
      creepSpawn(Game.spawns[spawn]);
    }
  }

  for (const creepName in Game.creeps) {
    const creep = Game.creeps[creepName];

    creepWork(creep);
  }
}
