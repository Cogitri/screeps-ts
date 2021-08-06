import { CreepTypes } from "utils/globalConsts";
import spawnUtil from "utils/spawnUtil";

const body = [WORK, MOVE, MOVE, CARRY, CARRY];

export function spawnTransporter(spawn: StructureSpawn): void {
  spawnUtil(CreepTypes.ROLE_TRANSPORTER, body, spawn);
}
