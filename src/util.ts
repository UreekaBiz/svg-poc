// ********************************************************************************
// == RegEx =======================================================================
export const isHexColorRegex = (input: string) => /^#(([0-9a-fA-F]{2}){3}|([0-9a-fA-F]){3})$/.test(input);