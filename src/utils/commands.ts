function showRole (role: String) {
    let found = 0;
    for (const i in Memory.creeps) {
        if (Memory.creeps[i].role  === role) {
            Game.creeps[i].say('👋');
            ++found;
        }
    }
    if (found === 0) {
        console.log(`No creep of role ${role} found`);
    }
}

export { showRole }
