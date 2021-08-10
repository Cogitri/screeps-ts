import { CreepRoles } from "utils/globalConsts";
import spawnUtil from "utils/spawnUtil";

export function spawnSoldier(spawn: StructureSpawn): void {
  spawnUtil(CreepRoles.ROLE_SOLDIER, spawn);
}
