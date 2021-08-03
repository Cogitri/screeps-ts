global.showRole = function (role: String) {
    for (const i in Memory.creeps) {
        if (Memory.creeps[i].role  === role) {
            Game.creeps[i].say('👋');
        } else {
            console.log(`No creep of role ${role} found`);
        }
    }
}
