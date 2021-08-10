import { CreepRoles } from "utils/globalConsts";
import spawnUtil from "utils/spawnUtil";

export function spawnHarvester(spawn: StructureSpawn): void {
  spawnUtil(CreepRoles.ROLE_HARVESTER, spawn);
}
