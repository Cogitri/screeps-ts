import { CreepTypes } from "utils/globalConsts";
import routineBuilder from "creeps/routines/routineBuilder";
import routineHarvester from "creeps/routines/routineHarvester";
import routineSoldier from "creeps/routines/routineSoldier";
import routineTransporter from "creeps/routines/routineTransporter";

export default function (creep: Creep): void {
  switch (creep.memory.role) {
    case CreepTypes.ROLE_HARVESTER:
      routineHarvester(creep);
      break;
    case CreepTypes.ROLE_BUILDER:
      routineBuilder(creep);
      break;
    case CreepTypes.ROLE_SOLDIER:
      routineSoldier(creep);
      break;
    case CreepTypes.ROLE_TRANSPORTER:
      routineTransporter(creep);
      break;
    default:
      break;
  }
}
