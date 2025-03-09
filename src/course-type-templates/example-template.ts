import { FILE_NAME } from "../constants/file-name";
import { FILE_SUBGROUP } from "../constants/file-subgroup";

const TEACHER_MATERIALS: CourseTypeTemplate[] = [
  {
    name: FILE_NAME.ANTWOORDEN_DOEBOEK,
    category: { course: true, chapter: false, tile: false },
    files: [],
  },
];

const TEACHING_MATERIALS: CourseTypeTemplate[] = [
  {
    name: FILE_NAME.ANTWOORDEN_DOEBOEK,
    category: { course: true, chapter: false, tile: false },
    files: [],
  },
];

const EXTRA_TEACHING_MATERIALS: CourseTypeTemplate[] = [
  {
    name: FILE_NAME.ANTWOORDEN_DOEBOEK,
    category: { course: true, chapter: false, tile: false },
    files: [],
  },
];

const DIFFERENTIATION_MATERIALS: CourseTypeTemplate[] = [
  {
    name: FILE_NAME.ANTWOORDEN_DOEBOEK,
    category: { course: true, chapter: false, tile: false },
    files: [],
  },
];

const EXAMPLE_TEMPLATE = {
  [FILE_SUBGROUP.LEERKRACHTENMATERIAAL]: TEACHER_MATERIALS,
  [FILE_SUBGROUP.LESMATERIAAL]: TEACHING_MATERIALS,
  [FILE_SUBGROUP.EXTRA_LESMATERIAAL]: EXTRA_TEACHING_MATERIALS,
  [FILE_SUBGROUP.DIFFERENTIATIEMATERIAAL]: DIFFERENTIATION_MATERIALS,
};

export default EXAMPLE_TEMPLATE;
