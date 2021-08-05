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
      if (100 - constructionSites.length >= path.length) {
        // looping trough each step and place a new road on its position
        path.forEach(step => {
          const posX = step.x;
          const posY = step.y;
          room.createConstructionSite(posX, posY, STRUCTURE_ROAD);
        });
        // store in memory that the road has been created
        Memory.pathToController = true;
      }
    }
  }
}

export function buildRoadToSource(spawn: StructureSpawn): void {
  const sources = spawn.room.find(FIND_SOURCES);
  // looping through each source to find the path between source and spawn
  sources.forEach(source => {
    const path = spawn.room.findPath(spawn.pos, source.pos);
    // pop the last element of the array because its the controller position
    path.pop();
    const constructionSites = spawn.room.find(FIND_MY_CONSTRUCTION_SITES);
    if (100 - constructionSites.length >= path.length) {
      path.forEach(step => {
        const posX = step.x;
        const posY = step.y;
        spawn.room.createConstructionSite(posX, posY, STRUCTURE_ROAD);
      });
    }
  });
}
