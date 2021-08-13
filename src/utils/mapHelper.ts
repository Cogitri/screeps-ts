/**
 * Helper function to convert maps into obejcts.
 * @param map The map to be converted.
 * @returns Object
 */
export function mapToObject(map: Map<string, any | any[]>): { [k: string]: any | any[] } {
  const object: { [k: string]: any | any[] } = {};
  for (const [k, v] of map) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    object[k] = v;
  }
  return object;
}
