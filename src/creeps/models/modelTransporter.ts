import { CreepRoles } from "utils/globalConsts";
import spawnUtil from "utils/spawnUtil";

export function spawnTransporter(spawn: StructureSpawn): void {
  spawnUtil(CreepRoles.ROLE_TRANSPORTER, spawn);
}
