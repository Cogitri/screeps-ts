export default function (creep: Creep): void {
  const pathColor = "#ffff33";

  const sources = creep.room.find(FIND_SOURCES);
  if (creep.harvest(sources[1]) === ERR_NOT_IN_RANGE) {
    creep.say("⛏ harvest");
    creep.moveTo(sources[1], { visualizePathStyle: { stroke: pathColor } });
  } else if (creep.harvest(sources[0]) === OK) {
    creep.memory.target = sources[0];
    creep.say("⛏");
  }
}
