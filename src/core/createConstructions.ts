import { buildRoadToController, buildRoadToSource } from "construct/buildRoads";
import createRampart from "construct/createRampart";

export default function (spawn: StructureSpawn): void {
  buildRoadToSource(spawn);
  buildRoadToController(spawn);
  createRampart(spawn);
}
