import React from "react";
import {defer, json, redirect, useLoaderData} from "react-router-dom";
import {getAuthToken} from "../utils/auth";
import CourseItem from "../components/CourseItem/CourseItem";

const CoursePage = () => {
  const { course } = useLoaderData();
  return (
    <CourseItem course={course}/>
  )
}
export default CoursePage;

export async function loadCourse(id) {
  const token = getAuthToken();
  const res = await fetch('http://api.wisey.app/api/v1/core/preview-courses/' + id, {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  });
  if (!res.ok) throw json({message: 'Could not open course page'}, {status: 500});
  if (res.status === 401) {
    return redirect('/')
  }

  return await res.json();
}

export async function loader({ request, params }) {
  const id = params.courseId;

  return defer({
    course: await loadCourse(id),
  });
}
