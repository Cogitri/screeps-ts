/**
 * Show hint to help command in bottom left corner of the room
 * @param room {@link https://docs.screeps.com/api/#Room|Room}
 */
export function showHelpHint(room: Room): void {
  if (global.textViz) {
    room.visual.text("For help type help() in console.", 0, 49, {
      color: "green",
      font: 1,
      align: "left"
    });
  } else {
    room.visual.text("", 0, 49);
  }
}
