import { CreepRoles } from "utils/globalConsts";
import spawnUtil from "utils/spawnUtil";

const body = [WORK, MOVE, MOVE, CARRY, CARRY];

export function spawnRepairer(spawn: StructureSpawn): number {
  return spawnUtil(CreepRoles.ROLE_REPAIRER, body, spawn);
}
