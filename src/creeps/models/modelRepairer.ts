import { CreepRoles } from "utils/globalConsts";
import spawnUtil from "utils/spawnUtil";

const body = [WORK, MOVE, MOVE, CARRY, CARRY];

export function spawnRepairer(spawn: StructureSpawn): void {
  spawnUtil(CreepRoles.ROLE_REPAIRER, body, spawn);
}
