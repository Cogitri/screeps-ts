import { checkHarvesterWork } from "./harvester";
import creepSpawn from "./creepSpawn";

export default function (): void {
  // Iterate over all owned spawns
  for (const spawn in Game.spawns) {
    // Check if creep is already spawning (avoids bug)
    if (!Game.spawns[spawn].spawning) {
      creepSpawn(Game.spawns[spawn]);
    }
  }

  for (const creepName in Game.creeps) {
    const creep = Game.creeps[creepName];

    if (creep.memory.role === "harvester") {
      checkHarvesterWork(creep);
    }
  }
}
