import globalConsts, { CreepRoles, Routines } from "./globalConsts";
import { mapToObject } from "./mapHelper";
/**
 * Spawns a creep of certain role with that roles defined bodyparts.
 * @param role Describes what role the spawned creep will have.
 * @param spawn {@link https://docs.screeps.com/api/#StructureSpawn|StructureSpawn}
 * @returns {@link https://docs.screeps.com/api/#StructureSpawn.spawnCreep|spawnCreep()} call for spawn.
 */
export default function (role: CreepRoles, spawn: StructureSpawn): number {
  const body = generateBody(role, spawn);
  const name = `${role}${Game.time}${Math.trunc(Math.random() * 100)}`;
  return spawn.spawnCreep(body, name, {
    memory: {
      role,
      room: spawn.room.name,
      isWorking: false,
      target: null,
      currentTask: Routines.NONE
    }
  });
}

/**
 * Gets the Bodyparts from a given role from the Memory and checks if the body can be upgraded depending on the rooms available energy Capacity
 * @param role the role that should be spawned
 * @param spawn the spawn on that the creep should spawn
 * @returns BodyPartConst[]
 */
function generateBody(role: string, spawn: StructureSpawn): BodyPartConstant[] {
  let body: BodyPartConstant[] = globalConsts.DEFAULT_BODYPARTS.get(role) as BodyPartConstant[];
  const map = new Map(Object.entries(Memory.roleBodyParts));
  if (map.size !== undefined && map.size && map.has(role)) {
    body = map.get(role) as BodyPartConstant[];
  }

  let currentCost = 0;
  let moveParts = 0;
  const otherParts: BodyPartConstant[] = [];

  body.forEach(part => {
    currentCost += BODYPART_COST[part];
    if (part === MOVE) {
      moveParts++;
    } else {
      otherParts.push(part);
    }
  });
  let otherPartCount = otherParts.length;
  const availableEnergy = globalConsts.MAX_ENERGY_PERCENTAGE_TO_SPAWN * spawn.room.energyCapacityAvailable;
  while (availableEnergy >= currentCost) {
    const randomBodypart = otherParts[Math.floor(Math.random() * otherParts.length)];
    if (moveParts <= otherPartCount && BODYPART_COST[MOVE] + currentCost <= availableEnergy) {
      body.push(MOVE);
      currentCost += BODYPART_COST[MOVE];
      moveParts++;
    } else if (BODYPART_COST[randomBodypart] + currentCost <= availableEnergy) {
      body.push(randomBodypart);
      currentCost += BODYPART_COST[randomBodypart];
      otherPartCount++;
    } else {
      break;
    }
  }

  map.set(role, body);
  Memory.roleBodyParts = mapToObject(map);
  return body;
}
