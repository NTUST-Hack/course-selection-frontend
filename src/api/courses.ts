import fetchAPI from "./api";

const FIND_COURSES_PATH = "/courses";

export interface Course {
  id: number;
  courseNo: string;
  semester: string;
  ntsustOnly: boolean;
  bachelorOnly: boolean;
  graduateOnly: boolean;
  enabledQuery: boolean;
}

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

  let params: Params = {
    offset: offset,
    limit: limit,
  };
  courseNo && (params.courseNo = courseNo);

  // Construct the query string manually
  let paramsStr = `offset=${params.offset}&limit=${params.limit}`;
  if (params.courseNo) {
    paramsStr += `&courseNo=${params.courseNo}`;
  }

  const r = await fetchAPI(
    "GET",
    FIND_COURSES_PATH + "?" + paramsStr,
    undefined
  );

  const text = await r.text();
  if (text == "null") throw new Error("No courses found");

  const courses: Course[] = await JSON.parse(text);

  return courses;
};
