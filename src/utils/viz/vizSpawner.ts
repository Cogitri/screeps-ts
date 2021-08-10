/**
 * Shows information about the spawning proccess like progress% and name of the creep below the Spawn if textViz is true.
 * @param spawn string - Name of the Spawn.
 */
export function visualizeSpawnerProgress(spawn: string): void {
  const spawningProcess = Game.spawns[spawn].spawning;
  if (spawningProcess != null) {
    const xCoordinate = Game.spawns[spawn].pos.x;
    const yCoordinate = Game.spawns[spawn].pos.y;

    if (global.textViz) {
      // Calculate percentage of the time that already passed
      const timeLeft = spawningProcess.needTime - spawningProcess.remainingTime;
      const percentDone = (100 / spawningProcess.needTime) * timeLeft;

      Game.spawns[spawn].room.visual.text(`⏳ ${percentDone.toFixed(2)}%`, xCoordinate - 1.25, yCoordinate + 1.5, {
        align: "left",
        opacity: 0.8,
        font: 0.5
      });

      Game.spawns[spawn].room.visual.text(`🧬 ${spawningProcess.name}`, xCoordinate - 1.25, yCoordinate + 2.25, {
        align: "left",
        opacity: 0.8,
        font: 0.5
      });
    } else {
      new RoomVisual().text("", xCoordinate, yCoordinate);
    }
  }
}
