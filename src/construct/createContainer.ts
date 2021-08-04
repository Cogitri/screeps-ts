/* eslint-disable @typescript-eslint/no-for-in-array */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
export default function (creep: Creep): void {
  // Container placement here
  const energySources = creep.room.find(FIND_SOURCES_ACTIVE);
  // eslint-disable-next-line @typescript-eslint/no-for-in-array
  for (const i in energySources) {
    const position = energySources[i].pos;
    const xSource: number = position.x;
    const ySource: number = position.y;
    const terrain = new Room.Terrain(creep.room.name);
    const xArray: number[] = [-1, -1, -1, 0, 0, 1, 1, 1];
    const yArray: number[] = [-1, 0, 1, -1, 1, -1, 0, 1];
    const xPositionsAvailable: number[] = [];
    const yPositionsAvailable: number[] = [];
    // checks if the spaces right next to the source are plain/empty
    for (let l = 0; l < 8; l++) {
      const xCheck = xSource + xArray[l];
      const yCheck = ySource + yArray[l];
      if (terrain.get(xCheck, yCheck) === 0) {
        xPositionsAvailable.push(xCheck);
        yPositionsAvailable.push(yCheck);
      }
    }
    const xBuildPlaceAvailable: number[] = [];
    const yBuildPlaceAvailable: number[] = [];
    for (const k in xPositionsAvailable) {
      // checks for all available positions if there's room to place a container
      switch (xPositionsAvailable[k] - xSource) {
        case -1:
          switch (yPositionsAvailable[k] - ySource) {
            case -1:
              if (terrain.get(xPositionsAvailable[k] - 1, yPositionsAvailable[k] - 1) === 0) {
                xBuildPlaceAvailable.push(xPositionsAvailable[k] - 1);
                yBuildPlaceAvailable.push(yPositionsAvailable[k] - 1);
              }
              break;
            case 1:
              if (terrain.get(xPositionsAvailable[k] - 1, yPositionsAvailable[k] - 1) === 0) {
                xBuildPlaceAvailable.push(xPositionsAvailable[k] - 1);
                yBuildPlaceAvailable.push(yPositionsAvailable[k] + 1);
              }
              break;
            default:
              if (terrain.get(xPositionsAvailable[k] - 1, yPositionsAvailable[k] - 1) === 0) {
                xBuildPlaceAvailable.push(xPositionsAvailable[k] - 1);
                yBuildPlaceAvailable.push(yPositionsAvailable[k]);
              }
              break;
          }
          break;
        case 1:
          switch (yPositionsAvailable[k] - ySource) {
            case -1:
              if (terrain.get(xPositionsAvailable[k] - 1, yPositionsAvailable[k] - 1) === 0) {
                xBuildPlaceAvailable.push(xPositionsAvailable[k] + 1);
                yBuildPlaceAvailable.push(yPositionsAvailable[k] - 1);
              }
              break;
            case 1:
              if (terrain.get(xPositionsAvailable[k] - 1, yPositionsAvailable[k] - 1) === 0) {
                xBuildPlaceAvailable.push(xPositionsAvailable[k] + 1);
                yBuildPlaceAvailable.push(yPositionsAvailable[k] + 1);
              }
              break;
            default:
              if (terrain.get(xPositionsAvailable[k] - 1, yPositionsAvailable[k] - 1) === 0) {
                xBuildPlaceAvailable.push(xPositionsAvailable[k] + 1);
                yBuildPlaceAvailable.push(yPositionsAvailable[k]);
              }
              break;
          }
          break;
        default:
          switch (yPositionsAvailable[k] - ySource) {
            case -1:
              if (terrain.get(xPositionsAvailable[k] - 1, yPositionsAvailable[k] - 1) === 0) {
                xBuildPlaceAvailable.push(xPositionsAvailable[k]);
                yBuildPlaceAvailable.push(yPositionsAvailable[k] - 1);
              }
              break;
            case 1:
              if (terrain.get(xPositionsAvailable[k] - 1, yPositionsAvailable[k] - 1) === 0) {
                xBuildPlaceAvailable.push(xPositionsAvailable[k]);
                yBuildPlaceAvailable.push(yPositionsAvailable[k] + 1);
              }
              break;
            default:
              // Not possible/ position of the energy source
              break;
          }
          break;
      }
    }
    // Building the containers. for now only one is built per energy source.
    if (xBuildPlaceAvailable.length > 0) {
      Game.rooms.sim.createConstructionSite(xBuildPlaceAvailable[0], yBuildPlaceAvailable[0], STRUCTURE_CONTAINER);
    }
  }
}
