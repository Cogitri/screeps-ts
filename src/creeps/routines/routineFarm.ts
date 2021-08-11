import { PathColors, WorkEmoji } from "utils/globalConsts";
import findBestEnergySourcePos, { freeSourcePos } from "core/energySource";
import { Logger } from "utils/logger";
import { movePath } from "utils/viz/vizPath";

export default function (creep: Creep): void {
  Logger.debug(`es geht um ${creep.name}++++++++++++++++++`);

  const sourceAndPos = getFreeSourcePos(creep);
  if (sourceAndPos) {
    const source = sourceAndPos.source;
    const pos = sourceAndPos.pos;

    if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
      movePath(creep, pos, PathColors.PATHCOLOR_HARVESTER);
      creep.say(WorkEmoji.EMOJI_HARVEST);
      if (creep.moveTo(pos) === ERR_INVALID_TARGET) {
        freeSourcePos(creep);
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
