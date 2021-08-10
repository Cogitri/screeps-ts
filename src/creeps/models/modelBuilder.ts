import { CreepRoles } from "utils/globalConsts";
import spawnUtil from "utils/spawnUtil";

export function spawnBuilder(spawn: StructureSpawn): void {
  spawnUtil(CreepRoles.ROLE_BUILDER, spawn);
}
