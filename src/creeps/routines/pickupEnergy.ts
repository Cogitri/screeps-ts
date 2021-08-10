import { PathColors } from "utils/globalConsts";
import { movePath } from "utils/vizPath";

/**
 * Checks if there are energy ressources from ruins and tombstones. If available picks up these ressources.
 * @param {@link https://docs.screeps.com/api/#Creep|Creep} - The creep that should pickup energy from ruins and tombstones.
 */
export default function (creep: Creep): void {
  const droppedEnergy = creep.room.find(FIND_DROPPED_RESOURCES, {
    filter: r => r.resourceType === RESOURCE_ENERGY
  });
  const ruin = creep.room.find(FIND_RUINS);
  const tombstones = creep.room.find(FIND_TOMBSTONES);

  if (droppedEnergy.length) {
    // the harvester is the one dropping it so the creep would just be in a loop of dropping and picking up
    if (creep.memory.role !== "harvester") {
      movePath(creep, droppedEnergy[0], PathColors.PATHCOLOR_PICKUPENERGY);
      creep.pickup(droppedEnergy[0]);
    }
  }

  if (ruin.length) {
    if (creep.withdraw(ruin[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
      movePath(creep, ruin[0], PathColors.PATHCOLOR_PICKUPENERGY);
    }
  }

  if (tombstones.length) {
    movePath(creep, tombstones[0], PathColors.PATHCOLOR_PICKUPENERGY);
    creep.withdraw(tombstones[0], RESOURCE_ENERGY);
  }
}
