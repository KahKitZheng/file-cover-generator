import { FILE_NAME } from "../constants/file-name";
import { FILE_SUBGROUP } from "../constants/file-subgroup";

const TEACHER_MATERIALS: CourseTypeTemplate[] = [
  {
    name: FILE_NAME.THEMAVOORBEREIDING,
    category: { course: true, chapter: true, tile: false },
    files: [],
  },
  {
    name: FILE_NAME.MATERIALENLIJST,
    category: { course: true, chapter: false, tile: false },
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

const PROJECT_1_2_TEMPLATE = {
  [FILE_SUBGROUP.LEERKRACHTENMATERIAAL]: TEACHER_MATERIALS,
  [FILE_SUBGROUP.EXTRA_LESMATERIAAL]: EXTRA_TEACHING_MATERIALS,
};

export default PROJECT_1_2_TEMPLATE;
