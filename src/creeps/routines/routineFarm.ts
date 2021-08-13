import { PathColors, Routines, WorkEmoji } from "utils/globalConsts";
import findBestEnergySourcePos, { unblockSourcePos } from "core/energySource";

import { Logger } from "utils/logger";
import { movePath } from "utils/viz/vizPath";

/**
 * Defines creep behaviour to find and farm ressources.
 * @param creep {@link https://docs.screeps.com/api/#Creep|Creep} - The creep.
 */
export default function (creep: Creep): void {
  if (creep.memory.currentTask !== Routines.FARMER) {
    Logger.info(`${creep.name} switched to farm routine`);
    creep.say(WorkEmoji.EMOJI_HARVEST);
    creep.memory.currentTask = Routines.FARMER;
  }
  Logger.debug(`es geht um ${creep.name}++++++++++++++++++`);

  const sourceAndPos = getFreeSourcePos(creep);
  if (sourceAndPos) {
    const source = sourceAndPos.source;
    const pos = sourceAndPos.pos;

    if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
      // imporant to rebuild the object here. for some reason the object "pos" is broken and cant be used in a "moveTo()" function.
      const newPos = new RoomPosition(pos.x, pos.y, pos.roomName);
      movePath(creep, newPos, PathColors.PATHCOLOR_HARVESTER);
      if (creep.moveTo(newPos) === ERR_INVALID_TARGET) {
        unblockSourcePos(creep);
        creep.memory.target = undefined;
        creep.memory.targetRoomPosition = undefined;
        creep.memory.designatedEnergySourcePosition = undefined;
      }
    }
  } else {
    // there are no energy sources left
    Logger.warn("no energy Sources left - you may want to conquer a new room.");
  }
}

function getFreeSourcePos(creep: Creep): { source: Source; pos: RoomPosition } | null {
  const target = creep.memory.target as Source;
  if (target) {
    const source = Game.getObjectById(target.id);
    if (source instanceof Source && creep.memory.designatedEnergySourcePosition) {
      return {
        source,
        pos: creep.memory.designatedEnergySourcePosition
      };
    } else {
      // creep target is not a source.
      return findBestEnergySourcePos(creep);
    }
  } else {
    // no target yet.
    return findBestEnergySourcePos(creep);
  }
}
