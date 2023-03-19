import React, {useEffect,useState} from "react";
import ReactPlayer from "react-player";
import PropTypes from "prop-types";
import EpisodeCard from "./EpisodeCard";
import classes from './CourseItem.module.css';
import {Grid, Typography} from "@material-ui/core";
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined';
import {Link} from "react-router-dom";





const CourseItem = ({course}) => {
  const [currentEpisode, setCurrentEpisode] = useState(course.lessons[0]);
  const [listedEpisodes, setListedEpisodes] = useState([]);
  const [videoLink, setVideoLink] = useState(currentEpisode.link);
  // const [watchingProgress, setWatchingProgress] = useState(0);
  // const videoRef = useRef(null);

  useEffect(() => {
    const episodes = course.lessons.filter(lesson => lesson.order !== currentEpisode.order)
    setListedEpisodes(episodes);
    setVideoLink(currentEpisode.link);
    // const progress = localStorage.getItem(videoLink);
    // if (progress) setWatchingProgress(progress);
  }, [currentEpisode]);

  const clickHandler = (id) => {
    setCurrentEpisode(course.lessons[id - 1]);
  }

  // const handleProgress = () => {
  //   const progress = videoRef.current.getCurrentTime();
  //   localStorage.setItem(videoLink, progress)
  // }

  return (
    <div className={classes.course}>
      <div className={classes['course-header']}>
        <div className={classes['nav-header']}>
          <Link to='/'><HomeOutlinedIcon fontSize={"medium"} color={"secondary"}/></Link>
          <ArrowForwardIosOutlinedIcon color={"secondary"} fontSize={"inherit"}/>
          <Link to='/courses' style={{textDecoration: "none", cursor: "pointer"}}><Typography variant={"subtitle2"} color={"secondary"}>Courses</Typography></Link>
        </div>
        <Typography variant={"h4"} color={"primary"}>{course.title}</Typography>
        <h4>Episodes: {course.lessons.length}</h4>
        <div className={classes.video}>
          <ReactPlayer
            // ref={videoRef}
            url={videoLink}
            playing={true}
            pip={true}
            // onPause={handleProgress}
            controls
            width='100%'
            height='100%'
          />
          <p className={classes['video-title']}><span>Episode {currentEpisode.order}:</span> {currentEpisode.title}.</p>
        </div>
      </div>
      <div className={classes['course-content']}>
        <h3>About this course:</h3>
        <p>{course.description}</p>
        <h3>Skills to achieve:</h3>
        <Grid container spacing={3}>
          {course.meta.skills.map(skill => {
            return <Grid item key={skill} xs={12} md={6} lg={4}><p className={classes.skill}>{skill}</p></Grid>
          })}
        </Grid>
      </div>
      <div className={classes['course-episodes']}>
        <h3>Episodes</h3>
        <ul>
          {listedEpisodes.map(episode => {
            return <EpisodeCard key={episode.id} episode={episode} onEpisodeSelect={clickHandler}></EpisodeCard>
          })}
        </ul>
      </div>
    </div>
  )
}

CourseItem.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  lessons: PropTypes.array,
  rating: PropTypes.string,
  previewImageLink: PropTypes.string,
  meta: PropTypes.array,

}

export default CourseItem;
