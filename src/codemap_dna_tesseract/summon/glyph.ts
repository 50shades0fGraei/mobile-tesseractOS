import traitsData from '../config/traits.json' with { type: 'json' };
import cycloneData from '../config/cyclone.json' with { type: 'json' };

interface Traits {
  [key: string]: string[];
}

interface Cyclone {
  [key: string]: {
    range: string[];
    allowedStrands: string[];
  };
}

const traits: Traits = traitsData;
const cyclone: Cyclone = cycloneData;

export function validateGlyph({ segment, traits: activeTraits, cyclone: clause }: { segment: string; traits: string[]; cyclone: string }) {
  const clauseRules = cyclone[clause];
  if (!clauseRules) return false;

  const inRange = segment >= clauseRules.range[0] && segment <= clauseRules.range[1];
  const strandAllowed = clauseRules.allowedStrands.some(strand =>
    activeTraits.some(trait => traits[trait]?.includes(strand))
  );

  return inRange && strandAllowed;
}
