import React, {Suspense} from "react";
import {getAuthToken} from "../utils/auth";
import CoursesList from "../components/CoursesList";
import {Await, defer, json, useLoaderData} from "react-router-dom";
import {Typography} from "@material-ui/core";

const CoursesPage = () => {
  const {courses} = useLoaderData();
  return (
    <Suspense fallback={<Typography color={"primary"} align={"center"} style={{paddingTop: '4%'}}>Loading...</Typography>}>
      <Await resolve={courses}>
        {(loadedCourses) => <CoursesList courses={loadedCourses}/>}
      </Await>
    </Suspense>
  )
}

export default CoursesPage;

export async function loadCourses() {
  const token = getAuthToken();
  const res = await fetch('http://api.wisey.app/api/v1/core/preview-courses', {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  });

  if (!res.ok) {
    throw json(
      {message: 'Could not fetch courses.'},
      {
        status: 500,
      }
    );
  } else {
    const resData = await res.json();
    return resData.courses;
  }
}

export function loader() {
  return defer({
    courses: loadCourses(),
  });
}
