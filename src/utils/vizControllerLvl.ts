export function visualizeControllerProgress(controller: StructureController): void {
  const roomController = controller;
  const xCoordinate = roomController.pos.x;
  const yCoordinate = roomController.pos.y;
  const totalToUpgrade = roomController.progress + roomController.progressTotal;

  new RoomVisual().text(
    `${((roomController.progress / totalToUpgrade) * 100).toFixed(2)}% to next Level`,
    xCoordinate,
    yCoordinate,
    { color: "white", font: 0.8 }
  );
}
