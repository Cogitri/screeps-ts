import { CreepRoles } from "utils/globalConsts";
import routineBuilder from "creeps/routines/routineBuilder";
import routineHarvester from "creeps/routines/routineHarvester";
import routineSoldier from "creeps/routines/routineSoldier";
import routineTransporter from "creeps/routines/routineTransporter";
import routineUpgrader from "creeps/routines/routineUpgrader";

export default function (creep: Creep): void {
  switch (creep.memory.role) {
    case CreepRoles.ROLE_HARVESTER:
      routineHarvester(creep);
      break;
    case CreepRoles.ROLE_BUILDER:
      routineBuilder(creep);
      break;
    case CreepRoles.ROLE_SOLDIER:
      routineSoldier(creep);
      break;
    case CreepRoles.ROLE_TRANSPORTER:
      routineTransporter(creep);
      break;
    case CreepRoles.ROLE_UPGRADER:
      routineUpgrader(creep);
      break;
    default:
      break;
  }
}
