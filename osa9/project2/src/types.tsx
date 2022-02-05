export interface CourseName {
  name: string;
}

export interface Total {
  exerciseCount: number;
}

export interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
  description?: string,
  requirements?: string[]
}

export interface CourseNormalPart extends CoursePartBase {
  type: "normal";
  description: string;
}
export interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

export interface CourseSubmissionPart extends CoursePartBase {
  type: "submission";
  description: string;
  exerciseSubmissionLink: string;
}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart;
