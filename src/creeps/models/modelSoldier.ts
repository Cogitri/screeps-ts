import { CreepRoles } from "utils/globalConsts";
import spawnUtil from "utils/spawnUtil";

const body = [WORK, CARRY, MOVE, ATTACK, TOUGH, TOUGH];

export function spawnSoldier(spawn: StructureSpawn): void {
  spawnUtil(CreepRoles.ROLE_SOLDIER, body, spawn);
}
