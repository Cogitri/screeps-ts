/* eslint-disable @typescript-eslint/no-for-in-array */

import { Logger } from "utils/logger";

export default function (spawn: StructureSpawn): void {
  // Amount of Containers that should be built
  const amountContainer = 1; // CHANGE HERE

  const energySources = spawn.room.find(FIND_SOURCES_ACTIVE);
  for (const source of energySources) {
    const xSource: number = source.pos.x;
    const ySource: number = source.pos.y;

    // Checks if there are any Construction Sites for Containers or Containers already there
    const checkConstructions = source.pos.findInRange(FIND_MY_CONSTRUCTION_SITES, 2, {
      filter: n => n.structureType === STRUCTURE_CONTAINER
    });
    const checkContainer = source.pos.findInRange(FIND_STRUCTURES, 2, {
      filter: n => n.structureType === STRUCTURE_CONTAINER
    });

    // If the amount of Containers is too low, the process of placing them begins
    if (checkConstructions.length < amountContainer && checkContainer.length < amountContainer) {
      const terrain = new Room.Terrain(spawn.room.name);
      const xArray: number[] = [-1, -1, -1, 0, 0, 1, 1, 1];
      const yArray: number[] = [-1, 0, 1, -1, 1, -1, 0, 1];
      const xPositionsAvailable: number[] = [];
      const yPositionsAvailable: number[] = [];

      // checks if the spaces right next to the source are plain/empty
      for (let l = 0; l < 8; l++) {
        if (terrain.get(xSource - xArray[l], ySource - yArray[l]) !== TERRAIN_MASK_WALL) {
          xPositionsAvailable.push(xSource - xArray[l]);
          yPositionsAvailable.push(ySource - yArray[l]);
        }
      }
      const xBuildPlaceAvailable: number[] = [];
      const yBuildPlaceAvailable: number[] = [];

      // checks for all available positions if there's room to place a container
      for (const k in xPositionsAvailable) {
        // X-Axis
        switch (xPositionsAvailable[k] - xSource) {
          case -1:
            // Y-Axis
            switch (yPositionsAvailable[k] - ySource) {
              case -1:
                // Checks, if it is possible to build at the Position
                if (terrain.get(xPositionsAvailable[k] - 1, yPositionsAvailable[k] - 1) !== TERRAIN_MASK_WALL) {
                  xBuildPlaceAvailable.push(xPositionsAvailable[k] - 1);
                  yBuildPlaceAvailable.push(yPositionsAvailable[k] - 1);
                }
                break;
              case 1:
                if (terrain.get(xPositionsAvailable[k] - 1, yPositionsAvailable[k] + 1) !== TERRAIN_MASK_WALL) {
                  xBuildPlaceAvailable.push(xPositionsAvailable[k] - 1);
                  yBuildPlaceAvailable.push(yPositionsAvailable[k] + 1);
                }
                break;
              default:
                if (terrain.get(xPositionsAvailable[k] - 1, yPositionsAvailable[k]) !== TERRAIN_MASK_WALL) {
                  xBuildPlaceAvailable.push(xPositionsAvailable[k] - 1);
                  yBuildPlaceAvailable.push(yPositionsAvailable[k]);
                }
                break;
            }
            break;
          case 1:
            switch (yPositionsAvailable[k] - ySource) {
              case -1:
                if (terrain.get(xPositionsAvailable[k] + 1, yPositionsAvailable[k] - 1) !== TERRAIN_MASK_WALL) {
                  xBuildPlaceAvailable.push(xPositionsAvailable[k] + 1);
                  yBuildPlaceAvailable.push(yPositionsAvailable[k] - 1);
                }
                break;
              case 1:
                if (terrain.get(xPositionsAvailable[k] + 1, yPositionsAvailable[k] + 1) !== TERRAIN_MASK_WALL) {
                  xBuildPlaceAvailable.push(xPositionsAvailable[k] + 1);
                  yBuildPlaceAvailable.push(yPositionsAvailable[k] + 1);
                }
                break;
              default:
                if (terrain.get(xPositionsAvailable[k] + 1, yPositionsAvailable[k]) !== TERRAIN_MASK_WALL) {
                  xBuildPlaceAvailable.push(xPositionsAvailable[k] + 1);
                  yBuildPlaceAvailable.push(yPositionsAvailable[k]);
                }
                break;
            }
            break;
          default:
            switch (yPositionsAvailable[k] - ySource) {
              case -1:
                if (terrain.get(xPositionsAvailable[k], yPositionsAvailable[k] - 1) !== TERRAIN_MASK_WALL) {
                  xBuildPlaceAvailable.push(xPositionsAvailable[k]);
                  yBuildPlaceAvailable.push(yPositionsAvailable[k] - 1);
                }
                break;
              case 1:
                if (terrain.get(xPositionsAvailable[k], yPositionsAvailable[k] + 1) !== TERRAIN_MASK_WALL) {
                  xBuildPlaceAvailable.push(xPositionsAvailable[k]);
                  yBuildPlaceAvailable.push(yPositionsAvailable[k] + 1);
                }
                break;
              default:
                // Not possible, because it's position of the energy source
                break;
            }
            break;
        }
      }
      // Building the containers. for now only one is built per energy source.
      if (xBuildPlaceAvailable.length >= amountContainer) {
        if (
          terrain.get(xBuildPlaceAvailable[amountContainer - 1], yBuildPlaceAvailable[amountContainer - 1]) !==
          TERRAIN_MASK_WALL
        ) {
          spawn.room.createConstructionSite(
            xBuildPlaceAvailable[amountContainer - 1],
            yBuildPlaceAvailable[amountContainer - 1],
            STRUCTURE_CONTAINER
          );
          Logger.info(
            `Placed a Container Construction site at:  ${xBuildPlaceAvailable[amountContainer - 1]}, ${
              yBuildPlaceAvailable[amountContainer - 1]
            }`
          );
        }
      }
    }
  }
}
