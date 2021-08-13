import {
  buildRoadAroundSpawn,
  buildRoadToController,
  buildRoadToSource,
  placeConstructionForFlag
} from "construct/buildRoads";
import createContainer from "construct/createContainer";
import createRampart from "construct/createRampart";

/**
 * Calls construct algorithms.
 * @param spawn {@link https://docs.screeps.com/api/#StructureSpawn|StructureSpawn} - Spawn of the room.
 */
export default function (spawn: StructureSpawn): void {
  createContainer(spawn);
  createRampart(spawn);
  placeConstructionForFlag(spawn);
  buildRoadToSource(spawn);
  buildRoadToController(spawn);
  buildRoadAroundSpawn(spawn);
}
