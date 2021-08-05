import buildStreet from "./buildStreet";
import createRampart from "construct/createRampart";
import creepSpawn from "./creepSpawn";
import creepWork from "./creepWork";
import pickupenergy from "./pickupenergy";
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

    const spawningProcess = Game.spawns[spawn].spawning;
    if (spawningProcess != null) {
      const spawningCreep = Game.creeps[spawningProcess.name];
      Game.spawns[spawn].room.visual.text(
        "🛠️" + spawningCreep.memory.role,
        Game.spawns[spawn].pos.x + 1,
        Game.spawns[spawn].pos.y,
        { align: "left", opacity: 0.8 }
      );
    }
  }

  for (const creepName in Game.creeps) {
    const creep = Game.creeps[creepName];
    if (!creep.memory.working) {
      // pickupEnergy routine started with this function. place wherever it's needed.
      pickupenergy(creep);
    }

    routineHarvester(creep);
    creepWork(creep);
  }
}
