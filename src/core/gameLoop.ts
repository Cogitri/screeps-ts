import creepSpawn from "./creepSpawn";
import creepWork from "./creepWork";
import buildStreet from "./buildStreet";

export default function (): void {
  // Iterate over all owned spawns
  buildStreet();
  for (const spawn in Game.spawns) {
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
