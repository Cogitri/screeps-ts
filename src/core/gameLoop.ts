import buildStreet from "./buildStreet";
import createRampart from "construct/createRampart";
import creepSpawn from "./creepSpawn";
import creepWork from "./creepWork";
import routineHarvester from "creeps/routines/routineHarvester";

export default function (): void {
  // Iterate over all owned spawns
  for (const spawn in Game.spawns) {
    buildStreet(Game.spawns[spawn]);
    createRampart(Game.spawns[spawn]);
    // Check if creep is already spawning (avoids bug)
    if (!Game.spawns[spawn].spawning) {
      creepSpawn(Game.spawns[spawn]);
    }
  }

  for (const name in Game.creeps) {
    const creep = Game.creeps[name];
    if (!creep.memory.working) {
      creep.say(`Hello world, I am ${creep.name}`);
    }

    routineHarvester(creep);
    creepWork(creep);
  }
}
