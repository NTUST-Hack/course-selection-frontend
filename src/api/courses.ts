import fetchAPI from "./api";

const COURSES_PATH = "/courses";

export interface Course {
  id?: number;
  courseNo: string;
  semester: string;
  ntustOnly: boolean;
  bachelorOnly: boolean;
  graduateOnly: boolean;
  enabledQuery: boolean;
}

const getCourseInfoCachePath = (id: number): string => {
  return `${COURSES_PATH}/${id}/info_cache`;
};

export const findCourses = async (
  offset: number,
  limit: number,
  courseNo?: string
) => {
  interface Params {
    offset: number;
    limit: number;
    courseNo?: string;
  }

  const params: Params = {
    offset: offset,
    limit: limit,
    courseNo: courseNo,
  };

  // Construct the query string manually
  let paramsStr = `offset=${params.offset}&limit=${params.limit}`;
  if (courseNo) {
    paramsStr += `&courseNo=${params.courseNo}`;
  }

  const r = await fetchAPI("GET", COURSES_PATH + "?" + paramsStr, undefined);

  const text = await r.text();
  if (r.status != 200) throw new Error(await JSON.parse(text).error);
  if (text == "null") throw new Error("No courses found");

  const courses: Course[] = await JSON.parse(text);

  return courses;
};

// =========================
// Course Query Settings
// =========================

export const getCourse = async (id: number) => {
  const r = await fetchAPI("GET", COURSES_PATH + "/" + id, undefined);

  const text = await r.text();
  if (r.status != 200) throw new Error(await JSON.parse(text).error);

  const course: Course = await JSON.parse(text);

  return course;
};

export const updateCourse = async (id: number, data: Course) => {
  const r = await fetchAPI("PUT", COURSES_PATH + "/" + id, data);

  const text = await r.text();
  if (r.status != 200) throw new Error(await JSON.parse(text).error);

  const course: Course = await JSON.parse(text);

  return course;
};

// =========================
// Course Info Cache
// =========================

// {
//   "courseName": "資料結構",
//   "Teacher": "陳冠宇",
//   "chooseStudent": 47,
//   "allStudent": 47,
//   "restrict1": 9999,
//   "restrict2": 55,
//   "threeStudent": 0,
//   "queriedTimes": 0,
//   "timesPerSec": 0,
//   "updatedTime": "2023-08-23T23:03:05.476379-07:00"
// }

export interface CourseInfoCache {
  courseName: string;
  teacher: string;
  chooseStudent: number;
  allStudent: number;
  restrict1: number;
  restrict2: number;
  threeStudent: number;
  queriedTimes: number;
  timesPerSec: number;
  updatedTime: Date;
}

export const getCourseInfoCache = async (id: number) => {
  const r = await fetchAPI("GET", getCourseInfoCachePath(id), undefined);

  const text = await r.text();
  if (r.status != 200) throw new Error(await JSON.parse(text).error);

  const course: CourseInfoCache = await JSON.parse(text);

  return course;
};
