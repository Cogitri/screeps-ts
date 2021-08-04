export default function (creep: Creep): void {
  const pathColor = "#ffff33";

  const sources = creep.room.find(FIND_SOURCES);
  if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
    creep.say("⛏ harvest");
    creep.moveTo(sources[0], { visualizePathStyle: { stroke: pathColor } });
  }
}
