import { isNull } from "lodash";
import { spawnBuilder } from ".././creeps/models/modelBuilder";
import { spawnHarvester } from ".././creeps/models/modelHarvester";
import { spawnSoldier } from ".././creeps/models/modelSoldier";

export default function (spawn: StructureSpawn): void {
  // Spawn a creep if there is none
  let creepNumber = 0;
  if (!spawn.room.find(FIND_MY_CREEPS).length) {
    const creepBasicBody = [WORK, CARRY, MOVE];
    const creepName = `Creep${creepNumber}`;
    creepNumber++;

    spawn.spawnCreep(creepBasicBody, creepName, {
      memory: { role: "harvester", room: "", working: false, lockTask: false }
    });
    return;
  }

  const builders = _.filter(Game.creeps, creep => creep.memory.role === "builder");
  // check number of creeps and check if creep is already spawning (avoids bug)
  if (builders.length < 3) {
    spawnBuilder(spawn);
  }

  const harvesters = _.filter(Game.creeps, creep => creep.memory.role === "harvester");
  // check number of creeps and check if creep is already spawning (avoids bug)
  if (harvesters.length < 3) {
    spawnHarvester(spawn);
  }

  const soldiers = _.filter(Game.creeps, creep => creep.memory.role === "soldier");
  // check number of creeps and check if creep is already spawning (avoids bug)
  if (soldiers.length < 1) {
    spawnSoldier(spawn);
  }

  /*console.log(spawn.spawning);

  console.log(!spawn.spawning);

  console.log(!!spawn.spawning);*/
  /*
  console.log("!(spawn.spawning == null): " + !(spawn.spawning == null));

  console.log("!(spawn.spawning === null): " + !(spawn.spawning === null));

  console.log("!(spawn.spawning != null): " + !(spawn.spawning != null));

  console.log("!(spawn.spawning !== null): " + !(spawn.spawning !== null));

  console.log("spawn.spawning == null: " + spawn.spawning == null);

  console.log("spawn.spawning === null: " + spawn.spawning === null);

  console.log("spawn.spawning != null: " + spawn.spawning != null);

  console.log("spawn.spawning !== null: " + spawn.spawning !== null);
*/
  /*
  if(Game.spawns['Spawn1'].spawning) {
    var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
    Game.spawns['Spawn1'].room.visual.text(
        '🛠️' + spawningCreep.memory.role,
        Game.spawns['Spawn1'].pos.x + 1,
        Game.spawns['Spawn1'].pos.y,
        {align: 'left', opacity: 0.8});
  }
  */

  console.log(spawn?.spawning);
  console.log(spawn?.spawning != null);

  if (spawn.spawning) {
    console.log("yay");
    const spawningCreep = Game.creeps[spawn.spawning.name];
    spawn.room.visual.text("🛠️" + spawningCreep.memory.role, spawn.pos.x + 1, spawn.pos.y, {
      align: "left",
      opacity: 0.8
    });
  }
}
