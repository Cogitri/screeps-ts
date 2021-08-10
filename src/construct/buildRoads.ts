import { mapToObject } from "utils/mapHelper";

/**
 * Finds the shortest path from spawn to controller and places construction sites along path.
 * @param spawn {@link https://docs.screeps.com/api/#StructureSpawn|StructureSpawn} - Spawn of the room.
 */
export function buildRoadToController(spawn: StructureSpawn): void {
  const room = spawn.room;
  const constructionSites = spawn.room.find(FIND_MY_CONSTRUCTION_SITES);
  // checks in memory if road already has been created
  if (!Memory.pathToController) {
    const controller = room.controller;
    if (controller) {
      // finding the shortes path between spawn and controller
      const path = room.findPath(spawn.pos, controller.pos);
      // pop the last element of the array because its the controller position
      path.pop();
      // checks if there are enought contsruction sites for the path
      if (MAX_CONSTRUCTION_SITES - constructionSites.length >= path.length) {
        // looping trough each step and place a new road on its position
        path.forEach(step => {
          const posX = step.x;
          const posY = step.y;
          if (!checkForStructure(posX, posY, spawn.room)) {
            spawn.room.createConstructionSite(posX, posY, STRUCTURE_ROAD);
          }
        });
        // store in memory that the road has been created
        Memory.pathToController = true;
      }
    }
  }
}

/**
 * Finds the shortest path from spawn to source and places construction sites along path.
 * @param spawn {@link https://docs.screeps.com/api/#StructureSpawn|StructureSpawn} - Spawn of the room.
 */
export function buildRoadToSource(spawn: StructureSpawn): void {
  const sources = spawn.room.find(FIND_SOURCES);
  // looping through each source to find the path between source and spawn
  sources.forEach(source => {
    const map = new Map(Object.entries(Memory.pathToSources));
    if (!map.has(source.id.toString()) || !map.get(source.id)) {
      const path = spawn.room.findPath(spawn.pos, source.pos);
      // pop the last element of the array because its the controller position
      path.pop();
      const constructionSites = spawn.room.find(FIND_MY_CONSTRUCTION_SITES);
      if (MAX_CONSTRUCTION_SITES - constructionSites.length >= path.length) {
        path.forEach(step => {
          const posX = step.x;
          const posY = step.y;
          if (!checkForStructure(posX, posY, spawn.room)) {
            spawn.room.createConstructionSite(posX, posY, STRUCTURE_ROAD);
            map.set(source.id.toString(), true);

            Memory.pathToSources = mapToObject(map);
          }
        });
      }
    }
  });
}
/**
 * Construct Roads at all available positions around the given spawn
 * @param spawn the spawn that the roads should be constructed around
 */
export function buildRoadAroundSpawn(spawn: StructureSpawn): void {
  const constructionSites = spawn.room.find(FIND_MY_CONSTRUCTION_SITES);
  if (MAX_CONSTRUCTION_SITES - constructionSites.length >= 8) {
    const spawnX = spawn.pos.x;
    const spawnY = spawn.pos.y;
    const xArray: number[] = [-1, -1, -1, 0, 0, 1, 1, 1];
    const yArray: number[] = [-1, 0, 1, -1, 1, -1, 0, 1];

    xArray.forEach((v, i) => {
      const posX = spawnX + xArray[i];
      const posY = spawnY + yArray[i];
      if (!checkForStructure(posX, posY, spawn.room)) {
        spawn.room.createConstructionSite(posX, posY, STRUCTURE_ROAD);
      }
    });
  }
}

/**
 * A Function that checks if the given position is occupied by a Structure
 * @param x x-position of the position that should be checked
 * @param y y-position of the position that should be checked
 * @param room the room that contains the position
 * @returns true if there is Structure at the given position
 */
function checkForStructure(x: number, y: number, room: Room): boolean {
  const look = room.lookAt(x, y);
  let isBlocked = false;
  look.forEach(obj => {
    if (
      obj.type === LOOK_STRUCTURES ||
      (obj.type === LOOK_TERRAIN && obj.terrain === "wall") ||
      obj.type === LOOK_CONSTRUCTION_SITES
    ) {
      isBlocked = true;
    }
  });
  return isBlocked;
}
