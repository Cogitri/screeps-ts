// in a 3 by 3 area around the source are possible harvest positions.
const numberOfPossibleHarvestPositionsInARow = 3;

/**
 * returns a free position from where a creep can harvest energy
 * returns null if there are no positions.
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

function isViableHarvestPosition(pos: RoomPosition): boolean {
  const look = pos.look();
  for (const lookObject of look) {
    // when there are creeps, sources, walls or structures at this position it is not viable#
    if (
      lookObject[LOOK_CREEPS] !== undefined ||
      lookObject[LOOK_STRUCTURES] !== undefined ||
      lookObject[LOOK_SOURCES] !== undefined ||
      lookObject[LOOK_TERRAIN] === "wall"
    ) {
      console.log("first false return");
      return false;
    }
  }
  // there is no Object which would make this pos invlid -> must be valid
  console.log("true return");
  return true;
}
