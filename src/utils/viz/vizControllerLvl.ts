/**
 * Shows Room Controller leveling proccess in percentage on the structure itself if textViz is true.
 * @param room  The {@link https://docs.screeps.com/api/#Room|room} in which the visual should be displayed in.
 */
export function visualizeControllerProgress(room: Room): void {
  const roomController = room.controller;
  if (roomController !== undefined) {
    const xCoordinate = roomController.pos.x;
    const yCoordinate = roomController.pos.y;

    if (global.textViz) {
      if (roomController.level < 8) {
        room.visual.text(
          `${((roomController.progress / roomController.progressTotal) * 100).toFixed(2)}% done`,
          xCoordinate,
          yCoordinate + 1.5,
          { color: "white", font: 0.6 }
        );
      } else {
        room.visual.text(`Max lvl. achieved 🎉`, xCoordinate, yCoordinate + 1.5, { color: "white", font: 0.6 });
      }
    } else {
      room.visual.text("", xCoordinate, yCoordinate);
    }
  }
}
