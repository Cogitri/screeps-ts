import { CreepRoles } from "utils/globalConsts";
import spawnUtil from "utils/spawnUtil";

export function spawnUpgrader(spawn: StructureSpawn): number {
  return spawnUtil(CreepRoles.ROLE_UPGRADER, spawn);
}
