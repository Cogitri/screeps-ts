import { AmountPerRoles, CreepRoles } from "utils/globalConsts";
import { spawnBuilder } from ".././creeps/models/modelBuilder";
import { spawnHarvester } from ".././creeps/models/modelHarvester";
import { spawnSoldier } from ".././creeps/models/modelSoldier";
import { spawnTransporter } from ".././creeps/models/modelTransporter";

export default function (spawn: StructureSpawn): void {
  const harvester = _.filter(Game.creeps, creep => creep.memory.role === CreepRoles.ROLE_HARVESTER);
  const builders = _.filter(Game.creeps, creep => creep.memory.role === CreepRoles.ROLE_BUILDER);
  const transporters = _.filter(Game.creeps, creep => creep.memory.role === CreepRoles.ROLE_TRANSPORTER);
  const soldiers = _.filter(Game.creeps, creep => creep.memory.role === CreepRoles.ROLE_SOLDIER);

  // check number of creeps
  if (harvester.length < AmountPerRoles.AMOUNT_HARVESTER) {
    spawnHarvester(spawn);
  } else if (builders.length < AmountPerRoles.AMOUNT_BUILDER) {
    spawnBuilder(spawn);
  } else if (transporters.length < AmountPerRoles.AMOUNT_TRANSPORTER) {
    spawnTransporter(spawn);
  } else if (soldiers.length < AmountPerRoles.AMOUNT_SOLDIER) {
    spawnSoldier(spawn);
  }
}
