import { CreepRoles } from "utils/globalConsts";
import spawnUtil from "utils/spawnUtil";

export function spawnRepairer(spawn: StructureSpawn): number {
  return spawnUtil(CreepRoles.ROLE_REPAIRER, spawn);
}
