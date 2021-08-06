import { CreepRoles } from "utils/globalConsts";
import spawnUtil from "utils/spawnUtil";

const body = [WORK, MOVE, MOVE, CARRY, CARRY];

export function spawnBuilder(spawn: StructureSpawn): void {
  spawnUtil(CreepRoles.ROLE_BUILDER, body, spawn);
}
