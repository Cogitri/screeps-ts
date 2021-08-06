import { CreepRoles, defaultCreepCount } from "utils/globalConsts";
import { spawnBuilder } from ".././creeps/models/modelBuilder";
import { spawnHarvester } from ".././creeps/models/modelHarvester";
import { spawnSoldier } from ".././creeps/models/modelSoldier";
import { spawnTransporter } from ".././creeps/models/modelTransporter";

export default function (spawn: StructureSpawn): void {
  const builders = _.filter(Game.creeps, creep => creep.memory.role === CreepRoles.ROLE_BUILDER);
  // check number of creeps
  if (builders.length < 3) {
    spawnBuilder(spawn);
  }
  const harvesters = _.filter(Game.creeps, creep => creep.memory.role === CreepRoles.ROLE_HARVESTER);
  // check number of creeps
  if (harvesters.length < 3) {
    spawnHarvester(spawn);
  }
  const soldiers = _.filter(Game.creeps, creep => creep.memory.role === CreepRoles.ROLE_SOLDIER);
  // check number of creeps
  if (soldiers.length < 1) {
    spawnSoldier(spawn);
  }
  const transporters = _.filter(Game.creeps, creep => creep.memory.role === CreepRoles.ROLE_TRANSPORTER);
  // check number of creeps
  if (transporters.length < 1) {
    spawnTransporter(spawn);
  }
}
