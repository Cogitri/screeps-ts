import { spawnHarvester } from "../creeps/models/modelHarvester";
import creepWork from "./creepWork";
import creepSpawn from "./creepSpawn";
import { spawnBuilder } from "../creeps/models/modelBuilder";

export default function (): void {
  // Iterate over all owned spawns
  for (const spawn in Game.spawns) {
    // Check if creep is already spawning (avoids bug)
    if (!Game.spawns[spawn].spawning) {
      creepSpawn(Game.spawns[spawn]);
    }

    const builders = _.filter(Game.creeps, creep => creep.memory.role === "builder");
    // check number of creeps and check if creep is already spawning (avoids bug)
    if (builders.length < 3 && !Game.spawns[spawn].spawning) {
      spawnBuilder(Game.spawns[spawn]);
    }
    const harvesters = _.filter(Game.creeps, creep => creep.memory.role === "harvester");
    // check number of creeps and check if creep is already spawning (avoids bug)
    if (harvesters.length < 3 && !Game.spawns[spawn].spawning) {
      spawnHarvester(Game.spawns[spawn]);
    }
  }

  for (const creepName in Game.creeps) {
    const creep = Game.creeps[creepName];

    creepWork(creep);
  }
}
