import React, {useState} from "react";
import classes from './EpisodeCard.module.css'
import PropTypes from "prop-types";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import UpgradeModal from "../UpgradeModal";


const EpisodeCard = ({episode, onEpisodeSelect}) => {
  const [accessDenied, setAccessDenied] = useState(false);
  const imageLink = `${episode.previewImageLink}/lesson-${episode.order}.webp`
  const onSelect = () => {
    (episode.status === 'unlocked') ? onEpisodeSelect(episode.order) : setAccessDenied(true);
  }
  const accessHandler = () => setAccessDenied(false);

  const convertTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time - minutes*60;
    return `${minutes}:${seconds}`;
  }
  return (
    <>
      {accessDenied && <UpgradeModal onClick={accessHandler}/>}

    <div className={classes['episode-card']} onClick={onSelect}>
      <div className={classes.order}>

        <p>{episode.order}</p>
      </div>
        <div className={classes['order-img']}>
          <img src={imageLink} alt={episode.title}/>
        </div>
      <div className={classes['episode-desc']}>
        <p>{episode.title}</p>
        <p>{convertTime(episode.duration)}</p>
      </div>
      <div className={classes.status}>
        {episode.status === 'locked' && <LockOutlinedIcon color={"primary"}/>}
      </div>
    </div>
    </>
  );
}

EpisodeCard.propTypes = {
  title: PropTypes.string,
  duration: PropTypes.string,
  order: PropTypes.string,
  status: PropTypes.string,
  previewImageLink: PropTypes.string,

}

export default EpisodeCard;
