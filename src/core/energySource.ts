import { Logger } from "utils/logger";
import { mapToObject } from "utils/mapHelper";

// in a 3 by 3 area around the source are possible harvest positions.
const numberOfPossibleHarvestPositionsInARow = 3;

function stringify(pos: RoomPosition): string {
  return `X${String(pos.x)} + Y${String(pos.y)}`;
}

/**
 * should always be called when a creep doesnt need its given Position at an EnergySource anymore.
 * @param creep
 */
export function unblockSourcePos(creep: Creep): void {
  const pos = creep.memory.designatedEnergySourcePosition as RoomPosition;
  creep.memory.designatedEnergySourcePosition = undefined;
  const blockedMap = new Map(Object.entries(Memory.blockedSourcePositions));
  blockedMap.set(stringify(pos), null);
  Memory.blockedSourcePositions = mapToObject(blockedMap);
}

/**
 * Returns a free position from where a creep can harvest energy.
 *
 * Returns null if there are no positions.
 * @param source {@link https://docs.screeps.com/api/#Source|Source}
 * @returns {@link https://docs.screeps.com/api/#RoomPosition|RoomPosition} - free position where a creep can harvest from source.
 * finds the closest EnergySource with a free place to harvest it from.
 * @param creep the creep which wants to find the best EnergySource.
 * @returns the best EnergySource or null if there are no free Sources left.
 */
export default function findBestEnergySourcePos(creep: Creep): { source: Source; pos: RoomPosition } | null {
  const blockedSourcePos = new Map(Object.entries(Memory.blockedSourcePositions));
  const roomSources = creep.room.find(FIND_SOURCES);
  const numberOfSources = roomSources.length;
  // check if creep already targets an energy Source

  const blockedSources: Source[] = [];
  for (let i = 0; i < numberOfSources; i++) {
    const source = creep.pos.findClosestByPath(FIND_SOURCES, {
      filter(testSource) {
        return !blockedSources.includes(testSource);
      }
    });
    if (source) {
      const possibleSourcePos = getFreeSourcePos(source, creep);
      if (possibleSourcePos != null) {
        const creepAtPos = blockedSourcePos.get(stringify(possibleSourcePos));
        // check if another creep has "booked" the position.
        if (creepAtPos) {
          // check if the creep is someone else.
          if (creepAtPos.id === creep.id) {
            creep.memory.targetRoomPosition = possibleSourcePos;
            creep.memory.target = source;
            creep.memory.designatedEnergySourcePosition = possibleSourcePos;
            return { source, pos: possibleSourcePos };
          } else {
            // position is blocked by antother creap.
          }
          // the destination is free to go.
        } else {
          blockedSourcePos.set(stringify(possibleSourcePos), creep);
          Memory.blockedSourcePositions = mapToObject(blockedSourcePos);
          creep.memory.targetRoomPosition = possibleSourcePos;
          creep.memory.target = source;
          creep.memory.designatedEnergySourcePosition = possibleSourcePos;
          return { source, pos: possibleSourcePos };
        }
      }
      blockedSources.push(source);
    }
  }
  Logger.error("No Energy Sources left.");
  return null;
}
/**
 * returns a free position from where a creep can harvest energy
 * returns null if there are no positions.s
 */
function getFreeSourcePos(source: Source, creep: Creep): RoomPosition | null {
  const sourceCoordinates = { x: source.pos.x, y: source.pos.y };
  const startCoordinates = { x: sourceCoordinates.x - 1, y: sourceCoordinates.y - 1 };
  for (let m = 0; m < numberOfPossibleHarvestPositionsInARow; m++) {
    for (let n = 0; n < numberOfPossibleHarvestPositionsInARow; n++) {
      const pos = new RoomPosition(startCoordinates.x + m, startCoordinates.y + n, source.room.name);
      if (isViableHarvestPosition(pos, creep)) {
        return pos;
      }
    }
  }
  return null;
}

/**
 * Determines viabality of certain position in room. Position is viable if not blocked by walls/creeps/structures.
 * @param pos {@link https://docs.screeps.com/api/#RoomPosition|RoomPosition} - Position to be checked.
 * @returns boolean -
 */
function isViableHarvestPosition(pos: RoomPosition, creep: Creep): boolean {
  const look = pos.look();
  for (const lookObject of look) {
    // when there are other creeps, sources, walls or structures (excluded rampart and road) at the given position it is not viable
    if (
      // this expression is true when there are other creeps at the given position
      (lookObject[LOOK_CREEPS] !== undefined && lookObject[LOOK_CREEPS] !== creep) ||
      // this expression is true when there is a structure which is not a road or rampart at the given position
      (lookObject[LOOK_STRUCTURES] !== undefined &&
        lookObject[LOOK_STRUCTURES]?.structureType !== STRUCTURE_RAMPART &&
        lookObject[LOOK_STRUCTURES]?.structureType !== STRUCTURE_ROAD) ||
      lookObject[LOOK_SOURCES] !== undefined ||
      lookObject[LOOK_TERRAIN] === "wall"
    ) {
      return false;
    }
  }
  // there is no Object which would make this pos invalid -> must be valid
  return true;
}
