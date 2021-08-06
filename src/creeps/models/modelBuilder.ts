import { CreepTypes } from "utils/globalConsts";
import spawnUtil from "utils/spawnUtil";

const body = [WORK, MOVE, MOVE, CARRY, CARRY];

export function spawnBuilder(spawn: StructureSpawn): void {
  spawnUtil(CreepTypes.ROLE_BUILDER, body, spawn);
}
