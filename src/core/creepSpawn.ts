import globalConsts, { CreepRoles } from "utils/globalConsts";
import { Logger } from "utils/logger";
import { spawnBuilder } from ".././creeps/models/modelBuilder";
import { spawnHarvester } from ".././creeps/models/modelHarvester";
import { spawnSoldier } from ".././creeps/models/modelSoldier";
import { spawnTransporter } from ".././creeps/models/modelTransporter";

export default function (spawn: StructureSpawn): void {
  let creepCount = new Map(Object.entries(Memory.creepCount));
  if (!creepCount.size) {
    creepCount = globalConsts.DEFAULT_CREEP_COUNT;
  }

  const builders = Object.values(
    Object.fromEntries(Object.entries(Game.creeps).filter(([, creep]) => creep.memory.role === CreepRoles.ROLE_BUILDER))
  );
  // check number of creeps
  const builderCount = creepCount.get(CreepRoles.ROLE_BUILDER);
  if (builderCount) {
    if (builders.length < builderCount) {
      Logger.info("Spawning a Builder");
      spawnBuilder(spawn);
    }
  }

  const harvesters = Object.values(
    Object.fromEntries(
      Object.entries(Game.creeps).filter(([, creep]) => creep.memory.role === CreepRoles.ROLE_HARVESTER)
    )
  );
  // check number of creeps
  const harvesterCount = creepCount.get(CreepRoles.ROLE_HARVESTER);
  if (harvesterCount) {
    if (harvesters.length < harvesterCount) {
      Logger.info("Spawning a Harvester");
      spawnHarvester(spawn);
    }
  }
  const soldiers = Object.values(
    Object.fromEntries(Object.entries(Game.creeps).filter(([, creep]) => creep.memory.role === CreepRoles.ROLE_SOLDIER))
  );
  // check number of creeps
  const soldierCount = creepCount.get(CreepRoles.ROLE_SOLDIER);
  if (soldierCount) {
    if (soldiers.length < soldierCount) {
      Logger.info("Spawning a Soldier");
      spawnSoldier(spawn);
    }
  }
  const transporters = Object.values(
    Object.fromEntries(
      Object.entries(Game.creeps).filter(([, creep]) => creep.memory.role === CreepRoles.ROLE_TRANSPORTER)
    )
  );
  // check number of creeps
  const transporterCount = creepCount.get(CreepRoles.ROLE_TRANSPORTER);
  if (transporterCount) {
    if (transporters.length < transporterCount) {
      Logger.info("Spawning a Transporter");
      spawnTransporter(spawn);
    }
  }
}
