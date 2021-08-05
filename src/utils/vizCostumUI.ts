export default function (room: Room): void {
  const creepCount = Object.keys(Game.creeps).length;
  const pos = new RoomPosition(0, 0, room.name);
  Game.map.visual.text(`Current Amount of Creeps: ${creepCount}`, pos);
}
