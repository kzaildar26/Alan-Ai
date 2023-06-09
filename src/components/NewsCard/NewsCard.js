import React ,{useState,useEffect,createRef}from 'react'
import { Card, CardActions, CardActionArea, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import classNames from 'classnames';
import useStyles from './styles.js';


const NewsCard = ({ article: { description, publishedAt, source, title, url, urlToImage }, activeArticle, i }) => {
  const classes = useStyles();
  const [elRefs, setElRefs] = useState([]);
  const scrollToRef = (ref) => window.scroll(0, ref.current.offsetTop - 50);

  useEffect(() => {
    window.scroll(0, 0);

    setElRefs((refs) => Array(20).fill().map((_, j) => refs[j] || createRef()));
  }, []);

  useEffect(() => {
    if (i === activeArticle && elRefs[activeArticle]) {
      scrollToRef(elRefs[activeArticle]);
    }
  }, [i, activeArticle, elRefs]);
  return (
    <Card ref={elRefs[i]} className={classNames(classes.card,activeArticle===i ? classes.activeCard:null)}>
      <CardActionArea href={url} target='_blank'>
        <CardMedia className={classes.media} image={urlToImage || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRimn5Ltw_MdH4K6qy6L6FvonswR02MPkumcg&usqp=CAU'}/>
        <div  className={classes.details}>
          <Typography variant='body2' color='textSecondary' component='h2'>{(new Date(publishedAt)).toDateString()}</Typography>
          <Typography variant='body2' color='textSecondary' component='h2'>{source.name}</Typography>
          </div>
          <Typography  className={classes.title} gutterButtom variant='h5'>{title}</Typography>
          <CardContent>
            <Typography variant='body2' color='textSecondary' component='p'></Typography>
          </CardContent>
      </CardActionArea>
      <CardActions  className={classes.cardActions}>
        <Button href={url} size='small' color='primary'>Learn More</Button>
        <Typography variant='h5' color='textSecondary'>{i+1}</Typography>
      </CardActions>
    </Card>
  )
}

export default NewsCard;
