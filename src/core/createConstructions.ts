import { buildRoadToController, buildRoadToSource } from "construct/buildRoads";
import createRampart from "construct/createRampart";

export default function (spawn: StructureSpawn): void {
  buildRoadToController(spawn);
  buildRoadToSource(spawn);
  createRampart(spawn);
}
