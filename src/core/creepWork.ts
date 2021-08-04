import routineHarvester from "creeps/routines/routineHarvester";
import routineSoldier from "creeps/routines/routineSoldier";

enum CreepTypes {
  ROLE_HARVESTER = "harvester",
  ROLE_BUILDER = "builder",
  ROLE_SOLDIER = "soldier"
}

export default function (creep: Creep): void {
  switch (creep.memory.role) {
    case CreepTypes.ROLE_HARVESTER:
      routineHarvester(creep);
      break;
    case CreepTypes.ROLE_SOLDIER:
      routineSoldier(creep);
      break;

    default:
      break;
  }
}
