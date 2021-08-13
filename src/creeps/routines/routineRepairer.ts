import { PathColors, Routines, WorkEmoji } from "utils/globalConsts";
import { Logger } from "utils/logger";
import { movePath } from "utils/viz/vizPath";
import pickupEnergy from "./pickupEnergy";
import routineTransporter from "./routineTransporter";
import routineWithdraw from "./routineWithdraw";
import shouldCreepRefill from "./shouldCreepRefill";

/**
 * Finds damaged structure with hitpoints below certain thresold. If none found starts building on construction sites.
 * @param creep {@link https://docs.screeps.com/api/#Creep|Creep} - The creep.
 */
export default function (creep: Creep): void {
  if (shouldCreepRefill(creep)) {
    if (!pickupEnergy(creep)) {
      routineWithdraw(creep);
    }
  } else {
    // check for all damaged structures
    const damagedStructure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
      filter: s =>
        (s.structureType === STRUCTURE_WALL && s.hits < 0.001 * s.hitsMax) ||
        (s.structureType === STRUCTURE_RAMPART && s.hits < 0.01 * s.hitsMax) ||
        (s.structureType === STRUCTURE_ROAD && s.hits < 0.25 * s.hitsMax) ||
        (s.structureType !== STRUCTURE_RAMPART &&
          s.structureType !== STRUCTURE_WALL &&
          s.structureType !== STRUCTURE_ROAD &&
          s.hits < 0.69 * s.hitsMax)
    });

    // check for all construction sites
    const target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
    if (damagedStructure) {
      repair(creep, damagedStructure);
    } else if (target) {
      build(creep, target);
    } else {
      routineTransporter(creep);
    }
  }
}

// Function to start building
function build(creep: Creep, target: ConstructionSite): void {
  if (creep.memory.currentTask !== Routines.BUILD) {
    Logger.info(`${creep.name} switched to build routine`);
    creep.say(WorkEmoji.EMOJI_BUILD);
    creep.memory.currentTask = Routines.BUILD;
  }

  if (creep.build(target) === ERR_NOT_IN_RANGE) {
    movePath(creep, target, PathColors.PATHCOLOR_BUILDER);
  }
}

// Function to start repairing
function repair(creep: Creep, target: AnyStructure): void {
  if (creep.memory.currentTask !== Routines.REPAIR) {
    Logger.info(`${creep.name} switched to repair routine`);
    creep.say(WorkEmoji.EMOJI_REPAIR);
    creep.memory.currentTask = Routines.REPAIR;
  }

  if (target) {
    if (creep.repair(target) === ERR_NOT_IN_RANGE) {
      movePath(creep, target, PathColors.PATHCOLOR_REPAIRER);
    }
  }
}
