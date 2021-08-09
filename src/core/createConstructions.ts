import { buildRoadAroundSpawn, buildRoadToController, buildRoadToSource } from "construct/buildRoads";

import createContainer from "construct/createContainer";
import createRampart from "construct/createRampart";

export default function (spawn: StructureSpawn): void {
  buildRoadToController(spawn);
  buildRoadToSource(spawn);
  buildRoadAroundSpawn(spawn);
  createRampart(spawn);
  createContainer(spawn);
}
