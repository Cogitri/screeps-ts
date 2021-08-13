/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import globalConsts, { CreepRoles } from "utils/globalConsts";

import { Logger } from "utils/logger";
import { mapToObject } from "utils/mapHelper";
import spawnUtil from "utils/spawnUtil";

/**
 * Checks if configured amount of specific role is alive and spawns them if less creeps of that role are available.
 * @param spawn {@link https://docs.screeps.com/api/#StructureSpawn|StructureSpawn} - Spawn of the room.
 */
let creepsInSpawnQueue: Map<string, number>;
export default function (spawn: StructureSpawn): void {
  creepsInSpawnQueue = new Map(Object.entries(Memory.creepsInSpawnQueue));
  let creepCount = new Map(Object.entries(Memory.creepCount));
  if (!creepCount.size) {
    creepCount = globalConsts.DEFAULT_CREEP_COUNT;
  }
  // initiates map
  for (const role of Object.values(CreepRoles)) {
    if (creepsInSpawnQueue.get(role) === undefined) {
      creepsInSpawnQueue.set(role.toString(), 0);
    }
  }
  const builders = getCreepsPerRole(CreepRoles.ROLE_BUILDER);
  const builderCount = creepCount.get(CreepRoles.ROLE_BUILDER);
  const builderInSpawnQueue = creepsInSpawnQueue.get(CreepRoles.ROLE_BUILDER) as number;

  const harvesters = getCreepsPerRole(CreepRoles.ROLE_HARVESTER);
  const harvesterCount = creepCount.get(CreepRoles.ROLE_HARVESTER);
  const harvesterInSpawnQueue = creepsInSpawnQueue.get(CreepRoles.ROLE_HARVESTER) as number;

  const soldiers = getCreepsPerRole(CreepRoles.ROLE_SOLDIER);
  const soldierCount = creepCount.get(CreepRoles.ROLE_SOLDIER);
  const soldierInSpawnQueue = creepsInSpawnQueue.get(CreepRoles.ROLE_SOLDIER) as number;

  const transporters = getCreepsPerRole(CreepRoles.ROLE_TRANSPORTER);
  const transporterCount = creepCount.get(CreepRoles.ROLE_TRANSPORTER);
  const transporterInSpawnQueue = creepsInSpawnQueue.get(CreepRoles.ROLE_TRANSPORTER) as number;

  const upgrader = getCreepsPerRole(CreepRoles.ROLE_UPGRADER);
  const upgradderCount = creepCount.get(CreepRoles.ROLE_UPGRADER);
  const upgraderInSpawnQueue = creepsInSpawnQueue.get(CreepRoles.ROLE_UPGRADER) as number;

  const repairer = getCreepsPerRole(CreepRoles.ROLE_REPAIRER);
  const repairerCount = creepCount.get(CreepRoles.ROLE_REPAIRER);
  const repairerInSpawnQueue = creepsInSpawnQueue.get(CreepRoles.ROLE_REPAIRER) as number;

  // inits queue
  if (!Memory.spawnQueue) {
    const init: CreepRoles[] = [];
    Memory.spawnQueue = init;
  }
  const queue = Memory.spawnQueue;

  // logic on how the queue gets filled.
  // notice: the first two cases are different from the others.
  if (harvesters < 1) {
    // this cases puts a harvester on front of the queue and deletes a harverster from the queue if there is one.
    if (queue.lastIndexOf(CreepRoles.ROLE_HARVESTER) !== -1) {
      queue.splice(queue.lastIndexOf(CreepRoles.ROLE_HARVESTER), 1);
    } else {
      incrementNumberOfCreepInSpawnQueue(CreepRoles.ROLE_HARVESTER);
    }
    queue.splice(0, 0, CreepRoles.ROLE_HARVESTER);
  } else if (transporters < 1) {
    // this cases puts a transporter on front of the queue and deletes a transporter from from the queue if there is one.
    if (queue.lastIndexOf(CreepRoles.ROLE_TRANSPORTER) !== -1) {
      queue.splice(queue.lastIndexOf(CreepRoles.ROLE_TRANSPORTER), 1);
    } else {
      incrementNumberOfCreepInSpawnQueue(CreepRoles.ROLE_TRANSPORTER);
    }
    queue.splice(0, 0, CreepRoles.ROLE_TRANSPORTER);
  } else if (harvesterCount && harvesters + harvesterInSpawnQueue < harvesterCount) {
    incrementNumberOfCreepInSpawnQueue(CreepRoles.ROLE_HARVESTER);
    queue.push(CreepRoles.ROLE_HARVESTER);
  } else if (transporterCount && transporters + transporterInSpawnQueue < transporterCount) {
    incrementNumberOfCreepInSpawnQueue(CreepRoles.ROLE_TRANSPORTER);
    queue.push(CreepRoles.ROLE_TRANSPORTER);
  } else if (builderCount && builders + builderInSpawnQueue < builderCount) {
    incrementNumberOfCreepInSpawnQueue(CreepRoles.ROLE_BUILDER);
    queue.push(CreepRoles.ROLE_BUILDER);
  } else if (soldierCount && soldiers + soldierInSpawnQueue < soldierCount) {
    incrementNumberOfCreepInSpawnQueue(CreepRoles.ROLE_SOLDIER);
    queue.push(CreepRoles.ROLE_SOLDIER);
  } else if (upgradderCount && upgrader + upgraderInSpawnQueue < upgradderCount) {
    incrementNumberOfCreepInSpawnQueue(CreepRoles.ROLE_UPGRADER);
    queue.push(CreepRoles.ROLE_UPGRADER);
  } else if (repairerCount && repairer + repairerInSpawnQueue < repairerCount) {
    incrementNumberOfCreepInSpawnQueue(CreepRoles.ROLE_REPAIRER);
    queue.push(CreepRoles.ROLE_REPAIRER);
  }

  function spawnCreepAndUpdateQueue(role: CreepRoles): void {
    if (spawnUtil(role, spawn) === OK) {
      decrementNumberOfCreepInSpawnQueue(queue[0]);
      queue.shift();
      Logger.info(`Spawning a(n) ${role}`);
    }
  }

  // switch through first element of the queue.
  switch (queue[0]) {
    case CreepRoles.ROLE_HARVESTER: {
      spawnCreepAndUpdateQueue(CreepRoles.ROLE_HARVESTER);
      break;
    }
    case CreepRoles.ROLE_TRANSPORTER: {
      spawnCreepAndUpdateQueue(CreepRoles.ROLE_TRANSPORTER);
      break;
    }
    case CreepRoles.ROLE_BUILDER: {
      spawnCreepAndUpdateQueue(CreepRoles.ROLE_BUILDER);
      break;
    }
    case CreepRoles.ROLE_SOLDIER: {
      spawnCreepAndUpdateQueue(CreepRoles.ROLE_SOLDIER);
      break;
    }
    case CreepRoles.ROLE_UPGRADER: {
      spawnCreepAndUpdateQueue(CreepRoles.ROLE_UPGRADER);
      break;
    }
    case CreepRoles.ROLE_REPAIRER: {
      spawnCreepAndUpdateQueue(CreepRoles.ROLE_REPAIRER);
      break;
    }
  }
  Memory.creepsInSpawnQueue = mapToObject(creepsInSpawnQueue);
  Memory.spawnQueue = queue;
}

function getCreepsPerRole(role: string): number {
  const object: { [k: string]: [string, Creep] } = {};
  Object.entries(Object.entries(Game.creeps).filter(([, creep]) => creep.memory.role === role)).forEach(([k, v]) => {
    object[k] = v as [string, Creep];
  });
  return Object.values(object).length;
}
function incrementNumberOfCreepInSpawnQueue(role: CreepRoles): void {
  Logger.debug(`a new ${role} got pushed to queue.`);
  let old = creepsInSpawnQueue.get(role);
  if (old !== undefined) {
    creepsInSpawnQueue.set(role, ++old);
  }
  Logger.debug(`Die Rolle ${role} ist ${creepsInSpawnQueue.get(role) as number} mal in der queue.`);
}
function decrementNumberOfCreepInSpawnQueue(role: CreepRoles): void {
  let old = creepsInSpawnQueue.get(role);
  if (old !== undefined) {
    creepsInSpawnQueue.set(role, --old);
  }
}
