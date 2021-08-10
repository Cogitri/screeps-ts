import { CreepRoles } from "utils/globalConsts";
import routineBuilder from "creeps/routines/routineBuilder";
import routineHarvester from "creeps/routines/routineHarvester";
import routineRepairer from "creeps/routines/routineRepairer";
import routineSoldier from "creeps/routines/routineSoldier";
import routineTransporter from "creeps/routines/routineTransporter";
import routineUpgrader from "creeps/routines/routineUpgrader";

/**
 * Takes a given creep's role and assigns it a routine.
 * @param creep {@link https://docs.screeps.com/api/#Creep|Creep} - The creep.
 */
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
    case CreepRoles.ROLE_REPAIRER:
      routineRepairer(creep);
      break;
    default:
      break;
  }
}
