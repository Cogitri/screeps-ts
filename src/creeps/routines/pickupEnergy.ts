import { PathColors } from "utils/globalConsts";
import { movePath } from "utils/vizPath";

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

  const lootRuin = creep.withdraw(ruin[0], RESOURCE_ENERGY);
  if (ruin.length) {
    creep.say(lootRuin.toString());
  }
  if (lootRuin === ERR_NOT_IN_RANGE) {
    movePath(creep, ruin[0], PathColors.PATHCOLOR_PICKUPENERGY);
  }

  if (tombstones.length) {
    movePath(creep, tombstones[0], PathColors.PATHCOLOR_PICKUPENERGY);
    const lootTombstone = creep.withdraw(tombstones[0], RESOURCE_ENERGY);
    creep.say(lootTombstone.toString());
  }
}
