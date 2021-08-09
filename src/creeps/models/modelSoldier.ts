import { CreepRoles } from "utils/globalConsts";
import spawnUtil from "utils/spawnUtil";

const body = [WORK, CARRY, MOVE, ATTACK, TOUGH, TOUGH];

export function spawnSoldier(spawn: StructureSpawn): number {
  return spawnUtil(CreepRoles.ROLE_SOLDIER, body, spawn);
}
