export function visualizeSpawnerProgress(spawn: string): void {
  const spawningProcess = Game.spawns[spawn].spawning;
  if (spawningProcess != null) {
    // Calculate percentage of the time that already passed
    const timeLeft = spawningProcess.needTime - spawningProcess.remainingTime;
    const percentDone = (100 / spawningProcess.needTime) * timeLeft;
    const xCoordinate = Game.spawns[spawn].pos.x;
    const yCoordinate = Game.spawns[spawn].pos.y;

    if (global.textViz) {
      Game.spawns[spawn].room.visual.text(
        "⏳ " + `${percentDone.toFixed(2)}%`,
        Game.spawns[spawn].pos.x - 1.25,
        Game.spawns[spawn].pos.y + 1.5,
        { align: "left", opacity: 0.8, font: 0.5 }
      );

      Game.spawns[spawn].room.visual.text(
        "🧬 " + spawningProcess.name,
        Game.spawns[spawn].pos.x - 1.25,
        Game.spawns[spawn].pos.y + 2.25,
        { align: "left", opacity: 0.8, font: 0.5 }
      );
    } else {
      new RoomVisual().text("", xCoordinate, yCoordinate);
    }
  }
}
