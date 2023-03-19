
import React, {useEffect, useState} from "react";
import {Container, Grid, makeStyles} from "@material-ui/core";
import CourseCard from "./CourseCard/CourseCard";
import {Link} from "react-router-dom";
import Pagination from '@material-ui/lab/Pagination';


const useStyles = makeStyles((theme) => {
  return {
    container: {
      paddingTop: theme.spacing(2)
    },
    pagination: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing(2)
    },
    card: {
      textDecoration: 'none',
    }
  }
});

const CoursesList = ({courses}) => {
  const classes = useStyles();
  const [showedCourses, setShowedCourses] = useState([]);

  useEffect(() => {
    setShowedCourses(JSON.parse(JSON.stringify(courses)).splice(0, 10));
  }, [courses]);

  const loadMoreCoursesHandler = (e, page) => {
    const index = +page-1;
    setShowedCourses(JSON.parse(JSON.stringify(courses)).splice(index * 10, 10));
  }

  return (
    <Container className={classes.container}>
      <Grid container spacing={3}>
      {showedCourses.map(course => (
        <Grid item key={course.id} xs={12} md={6} lg={4} style={{justifySelf: 'stretch'}}>
          <Link to={`/courses/${course.id}`} className={classes.card}>
            <CourseCard course={course}/>
          </Link>
        </Grid>
      ))}
      </Grid>
      <Pagination count={3} className={classes.pagination} onChange={loadMoreCoursesHandler}/>
    </Container>
  )
}

export default CoursesList;
