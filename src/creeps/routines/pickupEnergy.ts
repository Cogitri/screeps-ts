import { CreepRoles, PathColors } from "utils/globalConsts";
import { movePath } from "utils/viz/vizPath";

/**
 * Checks if there are energy ressources from ruins and tombstones. If available picks up these ressources.
 * @param {@link https://docs.screeps.com/api/#Creep|Creep} - The creep that should pickup energy from ruins and tombstones.
 * @returns boolean Returns true, if droppedEnergy, ruins or tombstones are found. Returns false if nothing is found.
 */
export default function (creep: Creep): boolean {
  const droppedEnergy = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
    filter: r => r.resourceType === RESOURCE_ENERGY // TODO Mabye nur hingehen wenn man auch da ist bevor der scheiß weg ist
  });
  const ruin = creep.pos.findClosestByPath(FIND_RUINS, {
    filter: r => r.store[RESOURCE_ENERGY] > 0
  });
  const tombstone = creep.pos.findClosestByPath(FIND_TOMBSTONES, {
    filter: t => t.store[RESOURCE_ENERGY] > 0
  });

  if (droppedEnergy) {
    // the harvester is the one dropping it so the creep would just be in a loop of dropping and picking up
    if (creep.memory.role !== CreepRoles.ROLE_HARVESTER) {
      movePath(creep, droppedEnergy, PathColors.PATHCOLOR_PICKUPENERGY);
      creep.pickup(droppedEnergy);
    }
    return true;
  } else if (tombstone) {
    if (creep.withdraw(tombstone, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
      movePath(creep, tombstone, PathColors.PATHCOLOR_PICKUPENERGY);
    }
    return true;
  } else if (ruin) {
    if (creep.withdraw(ruin, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
      movePath(creep, ruin, PathColors.PATHCOLOR_PICKUPENERGY);
    }
    return true;
  }
  return false;
}
