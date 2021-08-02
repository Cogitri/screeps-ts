import creepSpawn from "./creepSpawn";

export default function (): void {
  // Iterate over all owned spawns
  for (const spawn in Game.spawns) {
    // Check if creep is already spawning (avoids bug)
    if (!Game.spawns[spawn].spawning) {
      creepSpawn(Game.spawns[spawn]);
    }
    console.log(Game.spawns[spawn].room.find(FIND_MY_CREEPS));
    for(const creep in Game.creeps){
      //console.log(creep);
      console.log('Hier meldet sich '+ Game.creeps[creep].name);
      //console.log(Game.creeps[creep].name);
    }
  }

  for (const name in Game.creeps) {
    const creep = Game.creeps[name];
    if (!creep.memory.working) {
      creep.say(`Hello world, I am ${creep.name}`);
    }

    if (Game.time % creep.memory.counter === 10) {
      creep.memory.working = true;
    }
  }
}
