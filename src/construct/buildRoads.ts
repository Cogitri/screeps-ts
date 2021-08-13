import { mapToObject } from "utils/mapHelper";

/**
 * Finds the shortest path from spawn to controller and places construction sites along path.
 * @param spawn {@link https://docs.screeps.com/api/#StructureSpawn|StructureSpawn} - Spawn of the room.
 */
export function buildRoadToController(spawn: StructureSpawn): void {
  const room = spawn.room;
  // checks in memory if road already has been created
  const controller = room.controller;
  if (controller) {
    // finding the shortes path between spawn and controller
    const path = room.findPath(spawn.pos, controller.pos);
    // pop the last element of the array because its the controller position
    path.pop();
    const constructionSites = spawn.room.find(FIND_MY_CONSTRUCTION_SITES);
    // looping trough each step and place a new road on its position
    path.forEach(step => {
      const posX = step.x;
      const posY = step.y;
      if (!checkForStructure(posX, posY, spawn.room)) {
        // checks if there are enought contsruction sites for the path
        if (MAX_CONSTRUCTION_SITES - constructionSites.length === 0) {
          placeFlag(spawn, posX, posY);
        } else {
          spawn.room.createConstructionSite(posX, posY, STRUCTURE_ROAD);
        }
      }
    });
    // store in memory that the road has been created
    Memory.pathToController = true;
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
      path.forEach(step => {
        const posX = step.x;
        const posY = step.y;
        if (!checkForStructure(posX, posY, spawn.room)) {
          if (MAX_CONSTRUCTION_SITES - constructionSites.length === 0) {
            placeFlag(spawn, posX, posY);
          } else {
            spawn.room.createConstructionSite(posX, posY, STRUCTURE_ROAD);
            map.set(source.id.toString(), true);

            Memory.pathToSources = mapToObject(map);
          }
        }
      });
    }
  });
}
/**
 * Construct Roads at all available positions around the given spawn
 * @param spawn the spawn that the roads should be constructed around
 */
export function buildRoadAroundSpawn(spawn: StructureSpawn): void {
  const constructionSites = spawn.room.find(FIND_MY_CONSTRUCTION_SITES);
  const spawnX = spawn.pos.x;
  const spawnY = spawn.pos.y;
  const xArray: number[] = [-1, -1, -1, 0, 0, 1, 1, 1];
  const yArray: number[] = [-1, 0, 1, -1, 1, -1, 0, 1];

  xArray.forEach((v, i) => {
    const posX = spawnX + xArray[i];
    const posY = spawnY + yArray[i];
    if (!checkForStructure(posX, posY, spawn.room)) {
      if (MAX_CONSTRUCTION_SITES - constructionSites.length === 0) {
        placeFlag(spawn, posX, posY);
      } else {
        spawn.room.createConstructionSite(posX, posY, STRUCTURE_ROAD);
      }
    }
  });
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
/**
 * check if the flag can be placed, then places the flag and checks, if there are more then one flag
 * @param spawn  the spawn that the flags for the roads should be placed around
 * @param posX x-position of the position that the flag should be placed
 * @param posY y-position of the position that the flag should be placed
 */
function placeFlag(spawn: StructureSpawn, posX: number, posY: number) {
  // checkPos contains all object at a specific position
  const checkPos = spawn.room.lookAt(posX, posY);
  let flagAmount = 0;
  // check, if there is already a flag there
  // eslint-disable-next-line @typescript-eslint/prefer-for-of
  for (let i = 0; i < checkPos.length; i++) {
    if (checkPos[i].type === LOOK_FLAGS) {
      flagAmount++;
    }
  }
  if (flagAmount === 0) {
    const flagMap = new Map(Object.entries(Memory.flagCount));
    // give all flags a number
    let countFlag = flagMap.get("roadFlag");
    if (!countFlag || countFlag === 0) {
      countFlag = 1;
    }
    flagMap.set("roadFlag", countFlag++);
    Memory.flagCount.roadflag++;
    // spawn the flag
    spawn.room.createFlag(posX, posY, `road ${Memory.flagCount.roadflag}`);
  }
  // remove doubled flags
  removeDoubleFlags(flagAmount, checkPos);
}
/**
 * checks, if there are more then one flag at a position and removes all but one
 * @param flagAmount amount of flags at the position
 * @param checkPos the position to be checked
 */
export function removeDoubleFlags(flagAmount: number, checkPos: LookAtResult<LookConstant>[]): void {
  if (flagAmount > 1) {
    for (let k = checkPos.length - 1; k > 0; k--) {
      if (checkPos[k].type === LOOK_FLAGS) {
        const flagToRemove = checkPos[k].flag?.name;
        if (flagToRemove !== undefined) {
          Game.flags[flagToRemove].remove();
          flagAmount -= 1;
          if (flagAmount === 0) {
            break;
          }
        }
      }
    }
  }
}

/**
 * when a Construction site can be placed again, the first flag by number will be converted into a construction site
 * @param spawn the spawn of the room where the flags should be replaced by construction sites
 */
export function placeConstructionForFlag(spawn: StructureSpawn): void {
  for (let i = 0; spawn.room.find(FIND_FLAGS).length > i; i++) {
    const constructionSites = spawn.room.find(FIND_MY_CONSTRUCTION_SITES);
    if (MAX_CONSTRUCTION_SITES - constructionSites.length > 0) {
      const theFlag = `road ${i}`;
      if (Game.flags[theFlag] !== undefined) {
        const posFlag = Game.flags[theFlag].pos;
        spawn.room.createConstructionSite(posFlag, STRUCTURE_ROAD);
        Game.flags[theFlag].remove();
      }
    }
  }
}
