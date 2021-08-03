import { type } from "os";
import creepSpawn from "./creepSpawn";
import creepWork from "./creepWork";
import { basicHarvest } from "./basicHarvest";

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
    basicHarvest.run(creep);
    if (!creep.memory.working) {
      creep.say(`Hello world, I am ${creep.name}`);
    }

    creepWork(creep);
  }
}
