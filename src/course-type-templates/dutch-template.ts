import { FILE_NAME } from "../constants/file-name";
import { FILE_SUBGROUP } from "../constants/file-subgroup";

const TEACHER_MATERIALS: CourseTypeTemplate[] = [
  {
    name: FILE_NAME.THEMAVOORBEREIDING,
    category: { course: true, chapter: true, tile: true },
    files: [],
  },
  {
    name: FILE_NAME.MATERIALENLIJST,
    category: { course: true, chapter: false, tile: false },
    files: [],
  },
  {
    name: FILE_NAME.ALGEMENE_HANDLEIDING,
    category: { course: true, chapter: false, tile: false },
    files: [],
  },
];

const TEACHING_MATERIALS: CourseTypeTemplate[] = [
  {
    name: FILE_NAME.LEERWERKSCHRIFT,
    category: { course: true, chapter: false, tile: true },
    files: [],
  },
  {
    name: FILE_NAME.ANTWOORDEN_LEERWERKSCHRIFT,
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
  {
    name: FILE_NAME.BOEKENLIJST,
    category: { course: true, chapter: false, tile: false },
    files: [],
  },
];

const DIFFERENTIATION_MATERIALS: CourseTypeTemplate[] = [
  {
    name: FILE_NAME.WERKBLADEN_EXTRA_BEGELEIDING,
    category: { course: true, chapter: false, tile: true },
    files: [],
  },
  {
    name: FILE_NAME.WERKBLADEN_EXTRA_UITDAGING,
    category: { course: true, chapter: false, tile: true },
    files: [],
  },
];

export const DUTCH_TEMPLATE = {
  [FILE_SUBGROUP.LEERKRACHTENMATERIAAL]: TEACHER_MATERIALS,
  [FILE_SUBGROUP.LESMATERIAAL]: TEACHING_MATERIALS,
  [FILE_SUBGROUP.EXTRA_LESMATERIAAL]: EXTRA_TEACHING_MATERIALS,
  [FILE_SUBGROUP.DIFFERENTIATIEMATERIAAL]: DIFFERENTIATION_MATERIALS,
};
