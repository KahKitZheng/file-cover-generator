import { FILE_NAME } from "../constants/file-name";
import { FILE_SUBGROUP } from "../constants/file-subgroup";

const TEACHER_MATERIALS: CourseTypeTemplate[] = [
  {
    name: FILE_NAME.THEMAVOORBEREIDING,
    category: { course: true, chapter: true, tile: false },
    files: [],
  },
  {
    name: FILE_NAME.ACHTERGRONDINFORMATIE,
    category: { course: true, chapter: false, tile: false },
    files: [],
  },
  {
    name: FILE_NAME.MATERIALENLIJST,
    category: { course: true, chapter: false, tile: false },
    files: [],
  },
];

const TEACHING_MATERIALS: CourseTypeTemplate[] = [
  // Todo: Show options twice: one for each group
  {
    name: FILE_NAME.WERKBLAD,
    category: { course: true, chapter: false, tile: true },
    files: [],
  },
  {
    name: FILE_NAME.ANTWOORDEN_WERKBLAD,
    category: { course: true, chapter: false, tile: true },
    files: [],
  },
];

const EXTRA_TEACHING_MATERIALS: CourseTypeTemplate[] = [
  {
    name: FILE_NAME.BELANGRIJKE_WOORDEN,
    category: { course: true, chapter: false, tile: false },
    files: [],
  },
];

export const PROJECT_7_8_TEMPLATE = {
  [FILE_SUBGROUP.LEERKRACHTENMATERIAAL]: TEACHER_MATERIALS,
  [FILE_SUBGROUP.LESMATERIAAL]: TEACHING_MATERIALS,
  [FILE_SUBGROUP.EXTRA_LESMATERIAAL]: EXTRA_TEACHING_MATERIALS,
};
