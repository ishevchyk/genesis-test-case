import React, {memo, useState} from "react";
import classes from "./CourseCard.module.css";
import {Rating} from "@material-ui/lab";
import PropTypes from 'prop-types';
import ReactPlayer from "react-player";


const CourseCard = memo(({course}) => {
  const imagePreview = `${course.previewImageLink}/cover.webp`;
  let videoPreview;

  if (course.meta.courseVideoPreview) {
    videoPreview = course.meta.courseVideoPreview.link
  } else {
    videoPreview = '';
  }
  const [hover, setHover] = useState(false);

  const mouseEnter = () => {
    setHover(true);
  }
  const mouseLeave = () => {
    setHover(false);
  }
  return (
    <div
      className={classes['course-card']}
      onMouseLeave={mouseLeave}
      onMouseOver={mouseEnter}
    >
      <div className={classes.preview}>
        {!hover ?
         <img src={imagePreview} alt={course.title}/> :
         <div className={classes['preview-player']}>
         <ReactPlayer
           url={videoPreview ? videoPreview : ''}
           playing={hover}
           muted
           loop
           width={'100%'}
           height={'100%'}/>
         </div>
        }
      </div>

      <div className={classes.content}>
        <h5>{course.title}</h5>
        <p>{course.description}</p>
        <div className={classes.badges}>
          <div className={classes.tag}>
            <span>{course.tags[0]}</span>
          </div>
          <div className={classes.rating}>
            <Rating name="read-only" value={course.rating} precision={0.1} readOnly/>
            <p>{course.rating}/5</p>
          </div>
        </div>
      </div>

    </div>
  )
});

CourseCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  tags: PropTypes.array,
  rating: PropTypes.string,
  previewImageLink: PropTypes.string,
}

export default CourseCard;
