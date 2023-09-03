import { useMutation, useQuery } from "@tanstack/react-query";
import { COURSES_PATH } from "./courses";
import { API_URL } from "./api";
import axios from "axios";

const getTasksPath = (courseID: number): string =>
  `${COURSES_PATH}/${courseID}/grab_tasks`;

const getTaskPath = (courseID: number, taskID: number): string =>
  `${COURSES_PATH}/${courseID}/grab_tasks/${taskID}`;

export interface GrabTask {
  id?: number;
  ntustAccountID: number;
  enabledGrab: boolean;
  forceGrab: boolean;
  priority: number;
  autoDisable: boolean;
  selectMode: number;
}

export const SelectMode: { [key: number]: string } = {
  0: "Pre-registration",
  1: "After school starts",
};

export const queryGrabTaskFn = async (courseID: number, taskID: number) => {
  const { data } = await axios.get<GrabTask>(
    API_URL + getTaskPath(courseID, taskID)
  );
  return data;
};

export const useQueryGrabTasks = (
  courseID: number,
  offset: number,
  limit: number
) => {
  const params: { offset: number; limit: number } = {
    offset,
    limit,
  };

  return useQuery({
    queryKey: ["grab_tasks", courseID, offset, limit],
    queryFn: async () => {
      const { data, headers } = await axios.get<GrabTask[]>(
        API_URL + getTasksPath(courseID),
        {
          params: params,
        }
      );
      const count: number = headers && parseInt(headers["x-total-count"]);
      return { data: data, count: count };
    },
  });
};

export const useQueryGrabTask = (courseID: number, taskID: number) => {
  return useQuery({
    queryKey: ["grab_task", courseID, taskID],
    queryFn: () => queryGrabTaskFn(courseID, taskID),
  });
};

export const useCreateGrabTask = (courseID: number) => {
  return useMutation({
    mutationFn: async (data: GrabTask) => {
      return await axios.post<GrabTask>(API_URL + getTasksPath(courseID), data);
    },
  });
};

export const useUpdateGrabTask = (courseID: number, taskID: number) => {
  return useMutation({
    mutationFn: async (data: GrabTask) => {
      return await axios.put<GrabTask>(
        API_URL + getTaskPath(courseID, taskID),
        data
      );
    },
  });
};

export const useDeleteGrabTask = (courseID: number, taskID: number) => {
  return useMutation({
    mutationFn: () => {
      return axios.delete<GrabTask>(API_URL + getTaskPath(courseID, taskID));
    },
  });
};
