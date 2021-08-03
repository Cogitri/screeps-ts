import routineHarvester from "creeps/routines/routineHarvester";

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

    default:
      break;
  }
}
