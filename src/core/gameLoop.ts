import { checkHarvesterWork, spawnHarvester } from "./harvester";
import creepSpawn from "./creepSpawn";
import { spawnBuilder } from "./builder";

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

    for (const creep in Game.creeps) {
      console.log(`Hier meldet sich ${Game.creeps[creep].name}`);
    }
  }

  for (const creepName in Game.creeps) {
    const creep = Game.creeps[creepName];

    if (creep.memory.role === "harvester") {
      checkHarvesterWork(creep);
    }

    if (!creep.memory.working) {
      creep.say(`Hello world, I am ${creep.name}`);
    }

    if (Game.time % creep.memory.counter === 10) {
      creep.memory.working = true;
    }
  }
}
