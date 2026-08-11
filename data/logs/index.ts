import { baisen001 } from "./baisen-001";
import { baisen002 } from "./baisen-002";
import { baisen003 } from "./baisen-003";
import { baisen004 } from "./baisen-004";
import { baisen005 } from "./baisen-005";
import { baisen006 } from "./baisen-006";
import { baisen007 } from "./baisen-007";
import { baisen008 } from "./baisen-008";
import { baisen009 } from "./baisen-009";
import { baisen010 } from "./baisen-010";
import { baisen011 } from "./baisen-011";
import { coffeeZome001 } from "./coffeezome-001";
import { coffeeZome002 } from "./coffeezome-002";
import { coffeeZome003 } from "./coffeezome-003";
import { drawstringbag001 } from "./drawstringbag-001";
import { jinbei001 } from "./jinbei-001";
import { makuracover001 } from "./makuracover-001";
import { aroha001 } from "./aroha-001";
import { aroha002 } from "./aroha-002";
import { fixImageCase } from "./fix-imagecase";
import { fixImageSpeed } from "./fix-imagespeed";
import { halfpants001 } from "./halfpants-001";
import { dev001 } from "./dev-001";
import { dev002 } from "./dev-002";
import { dev003 } from "./dev-003";
import { dev004 } from "./dev-004";
import { obscurecoffee001 } from "./obscurecoffee-001";
import { makuracover002 } from "./makuracover-002";
import { covertcoffee001 } from "./covertcoffee-001";
import { defectbeansai001 } from "./defect-beans-ai-001";
import { defectbeansai002 } from "./defect-beans-ai-002";
import { householdbudget001 } from "./house-hold-budget-001";
import { morningpageocr001 } from "./morningpage-ocr-001";
import { allseasonscoffee001 } from "./all-seasons-coffee-001";
import { migrateLegacyLog, type Log } from "./types";

const legacyLogs = [
  baisen001,
  baisen002,
  baisen003,
  baisen004,
  baisen005,
  baisen006,
  baisen007,
  baisen008,
  baisen009,
  makuracover001,
  drawstringbag001,
  jinbei001,
  aroha001,
  coffeeZome001,
  coffeeZome002,
  coffeeZome003,
  fixImageCase,
  fixImageSpeed,
  halfpants001,
  dev001,
  dev002,
  dev003,
  dev004,
  obscurecoffee001,
];

const newLogs: Log[] = [
  makuracover002,
  covertcoffee001,
  defectbeansai001,
  defectbeansai002,
  householdbudget001,
  morningpageocr001,
  allseasonscoffee001,
  baisen010,
  baisen011,
  aroha002,
];
export const logs: Log[] = [...legacyLogs.map(migrateLegacyLog), ...newLogs];
