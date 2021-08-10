/**
 * Shows Room Controller leveling proccess in percentage on the structure itself if textViz is true.
 * @param room {@link https://docs.screeps.com/api/#Room|Room} - The room in which the visual should be displayed in.
 */
export function visualizeControllerProgress(room: Room): void {
  const roomController = room.controller;
  if (roomController !== undefined) {
    const xCoordinate = roomController.pos.x;
    const yCoordinate = roomController.pos.y;

    if (global.textViz) {
      room.visual.text(
        `${((roomController.progress / roomController.progressTotal) * 100).toFixed(2)}% to next Level`,
        xCoordinate,
        yCoordinate,
        { color: "white", font: 0.8 }
      );
    } else {
      room.visual.text("", xCoordinate, yCoordinate);
    }
  }
}
