import { removeDoubleFlags } from "./buildRoads";

/**
 * Places a construction site for a rampart on spawn.
 * @param spawn {@link https://docs.screeps.com/api/#StructureSpawn|StructureSpawn} - Spawn of the room.
 */
export default function (spawn: StructureSpawn): void {
  const controllerLvl = spawn.room.controller?.level;
  if (controllerLvl && controllerLvl >= 2) {
    const room = spawn.room;
    const look = room.lookAt(spawn.pos);
    let checkSpawn = true;
    look.forEach(lookObject => {
      if (
        lookObject.constructionSite?.structureType === STRUCTURE_RAMPART ||
        lookObject[LOOK_STRUCTURES]?.structureType === STRUCTURE_RAMPART
      ) {
        checkSpawn = false;
      }
    });
    if (checkSpawn) {
      const constructionSites = spawn.room.find(FIND_MY_CONSTRUCTION_SITES);
      if (MAX_CONSTRUCTION_SITES - constructionSites.length === 0) {
        let flagAmount = 0;
        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        for (let i = 0; i < look.length; i++) {
          if (look[i].type === LOOK_FLAGS) {
            flagAmount++;
          }
        }
        Memory.flagCount.rampartFlag++;
        if (flagAmount === 0) {
          spawn.room.createFlag(spawn.pos, `rampart ${Memory.flagCount.rampartFlag}`);
        }
        removeDoubleFlags(flagAmount, look);
      } else {
        room.createConstructionSite(spawn.pos, STRUCTURE_RAMPART);
      }
    }
  }
}
