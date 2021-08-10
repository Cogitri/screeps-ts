import { CreepRoles } from "utils/globalConsts";
import spawnUtil from "utils/spawnUtil";

const body = [WORK, MOVE, WORK, CARRY];

export function spawnHarvester(spawn: StructureSpawn): number {
  return spawnUtil(CreepRoles.ROLE_HARVESTER, body, spawn);
}
