import { PathColors, Routines, WorkEmoji } from "utils/globalConsts";
import { Logger } from "utils/logger";
import { movePath } from "utils/viz/vizPath";

/**
 * Upgrades the room controller by transfering energy to it.
 * @param creep {@link https://docs.screeps.com/api/#Creep|Creep} - The creep.
 */
export default function (creep: Creep): void {
  if (creep.memory.currentTask !== Routines.UPGRADE) {
    Logger.info(` ${creep.name} switched to upgrade routine`);
    creep.say(WorkEmoji.EMOJI_UPGRADE);
    creep.memory.currentTask = Routines.UPGRADE;
  }

  const controller = creep.room.controller;
  if (controller) {
    if (creep.upgradeController(controller) === ERR_NOT_IN_RANGE) {
      movePath(creep, controller, PathColors.PATHCOLOR_UPGRADE);
      creep.memory.target = controller;
    }
  }
}
