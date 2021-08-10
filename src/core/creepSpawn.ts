import globalConsts, { CreepRoles } from "utils/globalConsts";
import { Logger } from "utils/logger";
import { spawnBuilder } from ".././creeps/models/modelBuilder";
import { spawnHarvester } from ".././creeps/models/modelHarvester";
import { spawnRepairer } from "creeps/models/modelRepairer";
import { spawnSoldier } from ".././creeps/models/modelSoldier";
import { spawnTransporter } from ".././creeps/models/modelTransporter";
import { spawnUpgrader } from "creeps/models/modelUpgrader";

export default function (spawn: StructureSpawn): void {
  let creepCount = new Map(Object.entries(Memory.creepCount));
  if (!creepCount.size) {
    creepCount = globalConsts.DEFAULT_CREEP_COUNT;
  }

  const builders = getCreepsPerRole(CreepRoles.ROLE_BUILDER);
  const builderCount = creepCount.get(CreepRoles.ROLE_BUILDER);

  const harvesters = getCreepsPerRole(CreepRoles.ROLE_HARVESTER);
  const harvesterCount = creepCount.get(CreepRoles.ROLE_HARVESTER);

  const soldiers = getCreepsPerRole(CreepRoles.ROLE_SOLDIER);
  const soldierCount = creepCount.get(CreepRoles.ROLE_SOLDIER);

  const transporters = getCreepsPerRole(CreepRoles.ROLE_TRANSPORTER);
  const transporterCount = creepCount.get(CreepRoles.ROLE_TRANSPORTER);

  const upgrader = getCreepsPerRole(CreepRoles.ROLE_UPGRADER);
  const upgradderCount = creepCount.get(CreepRoles.ROLE_UPGRADER);

  const repairer = getCreepsPerRole(CreepRoles.ROLE_REPAIRER);
  const repairerCount = creepCount.get(CreepRoles.ROLE_REPAIRER);

  if (harvesterCount && harvesters < harvesterCount) {
    Logger.info("Spawning a Harvester");
    spawnHarvester(spawn);
  } else if (transporterCount && transporters < transporterCount) {
    Logger.info("Spawning a Transporter");
    spawnTransporter(spawn);
  } else if (builderCount && builders < builderCount) {
    Logger.info("Spawning a Builder");
    spawnBuilder(spawn);
  } else if (soldierCount && soldiers < soldierCount) {
    Logger.info("Spawning a Soldier");
    spawnSoldier(spawn);
  } else if (upgradderCount && upgrader < upgradderCount) {
    Logger.info("Spawning a Upgrader");
    spawnUpgrader(spawn);
  } else if (repairerCount && repairer < repairerCount) {
    Logger.info("Spawning a Repairer");
    spawnRepairer(spawn);
  }
}

function getCreepsPerRole(role: string): number {
  const object: { [k: string]: [string, Creep] } = {};
  Object.entries(Object.entries(Game.creeps).filter(([, creep]) => creep.memory.role === role)).forEach(([k, v]) => {
    object[k] = v as [string, Creep];
  });
  return Object.values(object).length;
}
