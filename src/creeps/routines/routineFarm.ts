export default function (creep: Creep): void {
  const pathColor = "#ffff33";

  const sources = creep.room.find(FIND_SOURCES);

  if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
    if (!creep.memory.announcedTask) {
      creep.say("⛏️");
      creep.memory.announcedTask = true;
    }

    creep.moveTo(sources[0], { visualizePathStyle: { stroke: pathColor } });
  }
}
