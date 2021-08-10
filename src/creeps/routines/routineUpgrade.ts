import { PathColors, WorkEmoji } from "utils/globalConsts";
import { movePath } from "./../../utils/vizPath";

/**
 * Upgrades the room controller by transfering energy to it.
 * @param creep {@link https://docs.screeps.com/api/#Creep|Creep} - The creep.
 */
export default function (creep: Creep): void {
  const controller = creep.room.controller;

  if (!controller) {
    return;
  }

  if (creep.upgradeController(controller) === ERR_NOT_IN_RANGE) {
    if (!creep.memory.announcedTask) {
      creep.say(WorkEmoji.EMOJI_UPGRADE);
      creep.memory.announcedTask = true;
    }
    movePath(creep, controller, PathColors.PATHCOLOR_UPGRADE);
    creep.memory.target = controller;
  }
}
