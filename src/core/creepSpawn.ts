<<<<<<< HEAD
import globalConsts, { CreepRoles } from "utils/globalConsts";

import { Logger } from "utils/logger";
=======
import { spawnUpgrader } from "creeps/models/modelUpgrader";
import { CreepRoles } from "utils/globalConsts";
>>>>>>> 8d563b7 (#83 moved checkCreepCapacity in its own routine, added Upgraderrole, wrote test for modelUpgrader and partial tests for routineUpgrader)
import { spawnBuilder } from ".././creeps/models/modelBuilder";
import { spawnHarvester } from ".././creeps/models/modelHarvester";
import { spawnSoldier } from ".././creeps/models/modelSoldier";
import { spawnTransporter } from ".././creeps/models/modelTransporter";

export default function (spawn: StructureSpawn): void {
  let creepCount = new Map(Object.entries(Memory.creepCount));
  if (!creepCount.size) {
    creepCount = globalConsts.DEFAULT_CREEP_COUNT;
  }

  let object: { [k: string]: [string, Creep] } = {};
  Object.entries(
    Object.entries(Game.creeps).filter(([, creep]) => creep.memory.role === CreepRoles.ROLE_BUILDER)
  ).forEach(([k, v]) => {
    object[k] = v as [string, Creep];
  });
  const builders = Object.values(object);
  // check number of creeps
  const builderCount = creepCount.get(CreepRoles.ROLE_BUILDER);
  if (builderCount) {
    if (builders.length < builderCount) {
      Logger.info("Spawning a Builder");
      spawnBuilder(spawn);
    }
  }

  object = {};
  Object.entries(
    Object.entries(Game.creeps).filter(([, creep]) => creep.memory.role === CreepRoles.ROLE_HARVESTER)
  ).forEach(([k, v]) => {
    object[k] = v as [string, Creep];
  });
  const harvesters = Object.values(object);
  // check number of creeps
  const harvesterCount = creepCount.get(CreepRoles.ROLE_HARVESTER);
  if (harvesterCount) {
    if (harvesters.length < harvesterCount) {
      Logger.info("Spawning a Harvester");
      spawnHarvester(spawn);
    }
  }

  object = {};
  Object.entries(
    Object.entries(Game.creeps).filter(([, creep]) => creep.memory.role === CreepRoles.ROLE_SOLDIER)
  ).forEach(([k, v]) => {
    object[k] = v as [string, Creep];
  });
  const soldiers = Object.values(object);
  // check number of creeps
  const soldierCount = creepCount.get(CreepRoles.ROLE_SOLDIER);
  if (soldierCount) {
    if (soldiers.length < soldierCount) {
      Logger.info("Spawning a Soldier");
      spawnSoldier(spawn);
    }
  }
  object = {};
  Object.entries(
    Object.entries(Game.creeps).filter(([, creep]) => creep.memory.role === CreepRoles.ROLE_TRANSPORTER)
  ).forEach(([k, v]) => {
    object[k] = v as [string, Creep];
  });
  const transporters = Object.values(object);
  // check number of creeps
  const transporterCount = creepCount.get(CreepRoles.ROLE_TRANSPORTER);
  if (transporterCount) {
    if (transporters.length < transporterCount) {
      Logger.info("Spawning a Transporter");
      spawnTransporter(spawn);
    }
  }
  const upgraders = _.filter(Game.creeps, creep => creep.memory.role === CreepRoles.ROLE_UPGRADER);
  // check number of creeps
  if (upgraders.length < 1) {
    spawnUpgrader(spawn);
  }
}
