export default function (spawn: StructureSpawn): void {
  const room = spawn.room;
  if (!Memory.pathToController) {
    const controller = room.controller;
    if (controller) {
      const path = room.findPath(spawn.pos, controller.pos);
      path.forEach(step => {
        const posX = step.x;
        const posY = step.y;
        room.createConstructionSite(posX, posY, STRUCTURE_ROAD);
      });
      Memory.pathToController = true;
    }
  }
}
