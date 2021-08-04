// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function showRole(role: string) {
  let found = 0;
  for (const i in Memory.creeps) {
    if (Memory.creeps[i].role === role.toLowerCase()) {
      Game.creeps[i].say("👋");
      ++found;
    }
  }
  if (found === 0) {
    return `No creep of role ${role} found`;
  } else {
    return "Creeps waved at you!";
  }
}
