export function visualizeControllerProgress(room: Room): void {
  const roomController = room.controller;
  if (roomController !== undefined) {
    const xCoordinate = roomController.pos.x;
    const yCoordinate = roomController.pos.y;
    const totalToUpgrade = roomController.progress + roomController.progressTotal;

    if (global.textViz) {
      new RoomVisual().text(
        `${((roomController.progress / totalToUpgrade) * 100).toFixed(2)}% to next Level`,
        xCoordinate,
        yCoordinate,
        { color: "white", font: 0.8 }
      );
    } else {
      new RoomVisual().text("", xCoordinate, yCoordinate);
    }
  }
}
