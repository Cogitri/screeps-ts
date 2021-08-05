/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-for-in-array */
export default function (spawn: StructureSpawn): void {
  // Container placement here
  // Amount of Containers that should be built
  const c = 0; // CHANGE HERE

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
    if (checkConstructions.length <= c && checkContainer.length <= c) {
      const terrain = new Room.Terrain(spawn.room.name);
      const xArray: number[] = [-1, -1, -1, 0, 0, 1, 1, 1];
      const yArray: number[] = [-1, 0, 1, -1, 1, -1, 0, 1];
      const xPositionsAvailable: number[] = [];
      const yPositionsAvailable: number[] = [];

      // checks if the spaces right next to the source are plain/empty
      for (let l = 0; l < 8; l++) {
        if (terrain.get(xSource - xArray[l], ySource - yArray[l]) !== 1) {
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
                if (terrain.get(xPositionsAvailable[k] - 1, yPositionsAvailable[k] - 1) !== 1) {
                  xBuildPlaceAvailable.push(xPositionsAvailable[k] - 1);
                  yBuildPlaceAvailable.push(yPositionsAvailable[k] - 1);
                }
                break;
              case 1:
                if (terrain.get(xPositionsAvailable[k] - 1, yPositionsAvailable[k] - 1) !== 1) {
                  xBuildPlaceAvailable.push(xPositionsAvailable[k] - 1);
                  yBuildPlaceAvailable.push(yPositionsAvailable[k] + 1);
                }
                break;
              default:
                if (terrain.get(xPositionsAvailable[k] - 1, yPositionsAvailable[k] - 1) !== 1) {
                  xBuildPlaceAvailable.push(xPositionsAvailable[k] - 1);
                  yBuildPlaceAvailable.push(yPositionsAvailable[k]);
                }
                break;
            }
            break;
          case 1:
            switch (yPositionsAvailable[k] - ySource) {
              case -1:
                if (terrain.get(xPositionsAvailable[k] - 1, yPositionsAvailable[k] - 1) !== 1) {
                  xBuildPlaceAvailable.push(xPositionsAvailable[k] + 1);
                  yBuildPlaceAvailable.push(yPositionsAvailable[k] - 1);
                }
                break;
              case 1:
                if (terrain.get(xPositionsAvailable[k] - 1, yPositionsAvailable[k] - 1) !== 1) {
                  xBuildPlaceAvailable.push(xPositionsAvailable[k] + 1);
                  yBuildPlaceAvailable.push(yPositionsAvailable[k] + 1);
                }
                break;
              default:
                if (terrain.get(xPositionsAvailable[k] - 1, yPositionsAvailable[k] - 1) !== 1) {
                  xBuildPlaceAvailable.push(xPositionsAvailable[k] + 1);
                  yBuildPlaceAvailable.push(yPositionsAvailable[k]);
                }
                break;
            }
            break;
          default:
            switch (yPositionsAvailable[k] - ySource) {
              case -1:
                if (terrain.get(xPositionsAvailable[k] - 1, yPositionsAvailable[k] - 1) !== 1) {
                  xBuildPlaceAvailable.push(xPositionsAvailable[k]);
                  yBuildPlaceAvailable.push(yPositionsAvailable[k] - 1);
                }
                break;
              case 1:
                if (terrain.get(xPositionsAvailable[k] - 1, yPositionsAvailable[k] - 1) !== 1) {
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

      if (xBuildPlaceAvailable.length > c) {
        if (terrain.get(xBuildPlaceAvailable[c], yBuildPlaceAvailable[c]) !== 1) {
          spawn.room.createConstructionSite(xBuildPlaceAvailable[c], yBuildPlaceAvailable[c], STRUCTURE_CONTAINER);
          console.log(
            "Placed a Container Construction site at: ",
            xPositionsAvailable[c],
            ", ",
            yPositionsAvailable[c]
          );
        }
      }
    }
  }
}
