import buildStreet from "./buildStreet";
import createRampart from "construct/createRampart";
import creepSpawn from "./creepSpawn";
import creepWork from "./creepWork";
import pickupenergy from "./pickupenergy";
import routineTower from "./routineTower";

export default function (): void {
  // Iterate over all owned spawns
  for (const spawn in Game.spawns) {
    buildStreet(Game.spawns[spawn]);
    createRampart(Game.spawns[spawn]);
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
    if (!creep.memory.working) {
      // pickupEnergy routine started with this function. place wherever it's needed.
      pickupenergy(creep);
    }
    creepWork(creep);
  }
}
