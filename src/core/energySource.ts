// in a 3 by 3 area around the source are possible harvest positions.
const numberOfPossibleHarvestPositionsInARow = 3;

/**
 * Returns a free position from where a creep can harvest energy.
 *
 * Returns null if there are no positions.
 * @param source {@link https://docs.screeps.com/api/#Source|Source}
 * @returns {@link https://docs.screeps.com/api/#RoomPosition|RoomPosition} - free position where a creep can harvest from source.
 */
export default function getFreeSourcePos(source: Source): RoomPosition | null {
  const sourceCoordinates = { x: source.pos.x, y: source.pos.y };
  const startCoordinates = { x: sourceCoordinates.x - 1, y: sourceCoordinates.y - 1 };

  for (let m = 0; m < numberOfPossibleHarvestPositionsInARow; m++) {
    for (let n = 0; n < numberOfPossibleHarvestPositionsInARow; n++) {
      const pos = new RoomPosition(startCoordinates.x + m, startCoordinates.y + n, source.room.name);
      if (isViableHarvestPosition(pos)) {
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
function isViableHarvestPosition(pos: RoomPosition): boolean {
  const look = pos.look();
  for (const lookObject of look) {
    // when there are creeps, sources, walls or structures (excluded rampart and road) at this position it is not viable#
    if (
      lookObject[LOOK_CREEPS] !== undefined ||
      // this expression means should be true when there is a structure which is not a road or rampart
      (lookObject[LOOK_STRUCTURES]?.structureType !== "rampart" &&
        lookObject[LOOK_STRUCTURES]?.structureType !== "road" &&
        lookObject[LOOK_STRUCTURES] !== undefined) ||
      lookObject[LOOK_SOURCES] !== undefined ||
      lookObject[LOOK_TERRAIN] === "wall"
    ) {
      return false;
    }
  }
  // there is no Object which would make this pos invalid -> must be valid
  return true;
}
