import { useMutation, useQuery } from "@tanstack/react-query";
import { API_URL } from "./api";
import axios from "axios";

export const COURSES_PATH: string = "/courses";

export interface Course {
  id?: number;
  courseNo: string;
  semester: string;
  ntustOnly: boolean;
  bachelorOnly: boolean;
  graduateOnly: boolean;
  enabledQuery: boolean;
}

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

const getCoursePath = (id: number): string => {
  return `${COURSES_PATH}/${id}`;
};

const getCourseInfoCachePath = (id: number): string => {
  return `${getCoursePath(id)}/info_cache`;
};

export const useQueryCourses = (
  offset: number,
  limit: number,
  courseNo?: string
) => {
  const params: { offset: number; limit: number; courseNo?: string } = {
    offset,
    limit,
  };

  if (courseNo) params.courseNo = courseNo;

  return useQuery({
    queryKey: ["courses", offset, limit, courseNo],
    queryFn: async () => {
      const { data, headers } = await axios.get<Course[]>(
        API_URL + COURSES_PATH,
        {
          params: params,
        }
      );
      const count: number = headers && parseInt(headers["x-total-count"]);
      return { data: data, count: count };
    },
  });
};

export const useQueryCourse = (id: number, refetchInterval?: number) => {
  return useQuery({
    queryKey: ["course", id],
    queryFn: async () => {
      const { data } = await axios.get<Course>(API_URL + getCoursePath(id));
      return data;
    },
    refetchInterval,
  });
};

export const useUpdateCourse = (id: number) => {
  return useMutation({
    mutationFn: (data: Course) => {
      return axios.put<Course>(API_URL + getCoursePath(id), data);
    },
  });
};

export const useCreateCourse = () => {
  return useMutation({
    mutationFn: (data: Course) => {
      return axios.post<Course>(API_URL + COURSES_PATH, data);
    },
  });
};

export const useDeleteCourse = () => {
  return useMutation({
    mutationFn: (id: number) => {
      return axios.delete(API_URL + getCoursePath(id));
    },
  });
};

export const useQueryCourseInfoCache = (
  id: number,
  refetchInterval?: number
) => {
  return useQuery({
    queryKey: ["course_info_cache", id],
    queryFn: async () => {
      const { data } = await axios.get<CourseInfoCache>(
        API_URL + getCourseInfoCachePath(id)
      );
      return data;
    },
    refetchInterval,
  });
};
