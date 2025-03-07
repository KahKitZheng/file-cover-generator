import { FILE_NAME } from "../constants/file-name";
import { FILE_SUBGROUP } from "../constants/file-subgroup";

const TEACHER_MATERIALS = [
  {
    name: FILE_NAME.THEMAVOORBEREIDING,
    formats: { course: true, chapter: true, tile: true },
  },
  {
    name: FILE_NAME.ACHTERGRONDINFORMATIE,
    formats: { course: false, chapter: false, tile: false },
  },
  // GLOBAL_FILE_NAME.TIJDSVAKKENOVERZICHT,
  {
    name: FILE_NAME.MATERIALENLIJST,
    formats: { course: false, chapter: false, tile: false },
  },
];

const TEACHING_MATERIALS = [
  {
    name: FILE_NAME.DOEBOEK,
    formats: { course: true, chapter: true, tile: true },
  },
  {
    name: FILE_NAME.ANTWOORDEN_DOEBOEK,
    formats: { course: true, chapter: true, tile: true },
  },
  {
    name: FILE_NAME.WERKBLAD,
    formats: { course: true, chapter: true, tile: true },
  },
  {
    name: FILE_NAME.ANTWOORDEN_WERKBLAD,
    formats: { course: true, chapter: true, tile: true },
  },
];

const EXTRA_TEACHING_MATERIALS = [
  {
    name: FILE_NAME.SAMENVATTING,
    formats: { course: false, chapter: false, tile: false },
  },
  {
    name: FILE_NAME.BELANGRIJKE_WOORDEN,
    formats: { course: false, chapter: false, tile: false },
  },
  // GLOBAL_FILE_NAME.VOORTGANGSBLAD,
  {
    name: FILE_NAME.EXTRA_LESMATERIAAL,
    formats: { course: false, chapter: false, tile: false },
  },
];

const DIFFERENTIATION_MATERIALS = [
  {
    name: FILE_NAME.WERKBLAD,
    formats: { course: false, chapter: false, tile: false },
  },
  {
    name: FILE_NAME.ANTWOORDEN_WERKBLAD,
    formats: { course: false, chapter: false, tile: false },
  },
  {
    name: FILE_NAME.DOEBOEK,
    formats: { course: false, chapter: false, tile: false },
  },
  {
    name: FILE_NAME.ANTWOORDEN_DOEBOEK,
    formats: { course: false, chapter: false, tile: false },
  },
];

export const TEMPLATE_DEFAULT: Template = {
  [FILE_SUBGROUP.LEERKRACHTENMATERIAAL]: TEACHER_MATERIALS,
  [FILE_SUBGROUP.LESMATERIAAL]: TEACHING_MATERIALS,
  [FILE_SUBGROUP.EXTRA_LESMATERIAAL]: EXTRA_TEACHING_MATERIALS,
  [FILE_SUBGROUP.DIFFERENTIATIEMATERIAAL]: DIFFERENTIATION_MATERIALS,
};
