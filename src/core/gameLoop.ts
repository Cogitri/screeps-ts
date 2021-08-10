import { help, printAuthors } from "utils/commands";
import { Logger } from "utils/logger";
import createConstructions from "./createConstructions";
import creepSpawn from "./creepSpawn";
import creepWork from "./creepWork";
import globalConsts from "utils/globalConsts";
import { mapToObject } from "utils/mapHelper";
import pickupEnergy from "../creeps/routines/pickupEnergy";
import routineTower from "../creeps/routines/routineTower";
import { visualizeControllerProgress } from "../utils/viz/vizControllerLvl";
import { visualizeDashboards } from "utils/viz/vizDashboards";
import { visualizeSpawnerProgress } from "../utils/viz/vizSpawner";

/**
 * Custom Game Loop. Runs every other gametick. Assigns all implemented behaviour.
 */
export default function (): void {
  // Refresh variables in memory
  refreshMemory();

  // Iterate over all owned spawns
  for (const spawn in Game.spawns) {
    createConstructions(Game.spawns[spawn]);
    // Check if creep is already spawning (avoids bug)
    if (!Game.spawns[spawn].spawning) {
      creepSpawn(Game.spawns[spawn]);
    }
    visualizeSpawnerProgress(spawn);
    visualizeDashboards(spawn);

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
      visualizeControllerProgress(Game.spawns.Spawn1.room);
    }
    if (!creep.memory.isWorking) {
      // pickupEnergy routine started with this function. place wherever it's needed.
      pickupEnergy(creep);
    }
    creepWork(creep);
  }
}

/**
 * Refreshes game memory.
 */
function refreshMemory(): void {
  if (!Memory.logLevel) {
    Memory.logLevel = Logger.logLevel;
  } else {
    Logger.logLevel = Memory.logLevel;
  }
}

/**
 * Prints info to console on script deploy and initializes memory variables.
 *
 * Needs to be called outside of any Game Loop to be executed only when new code is uploaded.
 * {@link https://wiki.screepspl.us/index.php/Global_reset}
 */
export function init(): void {
  Logger.info(printAuthors());
  Logger.info(help());
  Memory.pathToSources = {};
  Memory.creepCount = mapToObject(globalConsts.DEFAULT_CREEP_COUNT);
  Memory.roleBodyParts = mapToObject(globalConsts.DEFAULT_BODYPARTS);
}
