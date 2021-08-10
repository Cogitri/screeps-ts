import { CreepRoles } from "utils/globalConsts";
import spawnUtil from "utils/spawnUtil";

/**
 * Spawns a creep of the builder role with configured default body parts.
 * @param spawn {@link https://docs.screeps.com/api/#StructureSpawn|StructureSpawn} - The Spawn structure.
 * @returns {number} The return code of the spawning procedure
 */
export function spawnBuilder(spawn: StructureSpawn): void {
  spawnUtil(CreepRoles.ROLE_BUILDER, spawn);
}
