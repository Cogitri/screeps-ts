import { Logger } from "utils/logger";
import createConstructions from "./createConstructions";
import creepSpawn from "./creepSpawn";
import creepWork from "./creepWork";
import pickupenergy from "./pickupenergy";
import routineTower from "./routineTower";
import { visualizeControllerProgress } from "../utils/vizControllerLvl";

export default function (): void {
  // Refresh variables in memory
  refreshMemory();
  console.log(`log level - ${Logger.logLevel}`);

  // Iterate over all owned spawns
  for (const spawn in Game.spawns) {
    createConstructions(Game.spawns[spawn]);
    // Check if creep is already spawning (avoids bug)
    if (!Game.spawns[spawn].spawning) {
      creepSpawn(Game.spawns[spawn]);
    }
    const tower = Game.spawns[spawn].room.find(FIND_STRUCTURES, {
      filter: s => s.structureType === STRUCTURE_TOWER
    });
    tower.forEach(t => {
      return routineTower(t as StructureTower);
    });
  }

  for (const creepName in Game.creeps) {
    const creep = Game.creeps[creepName];
    if (Game.spawns.Spawn1.room.controller !== undefined) {
      visualizeControllerProgress(Game.spawns.Spawn1.room.controller);
    }
    if (!creep.memory.working) {
      // pickupEnergy routine started with this function. place wherever it's needed.
      pickupenergy(creep);
    }
    creepWork(creep);
  }
}

function refreshMemory(): void {
  if (!Memory.logLevel) {
    Memory.logLevel = Logger.logLevel;
  } else {
    Logger.logLevel = Memory.logLevel;
  }
}
