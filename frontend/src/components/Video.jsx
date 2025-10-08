import Thumbnail from './Thumbnail';
import LikeButton from './LikeButton';

function Video({ video }) {
  return (
    <div style={{ border: '1px solid #ddd', borderRadius: '10px', padding: '10px', margin: '10px' }}>
      <Thumbnail video={video} />
      <a href={video.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
        <h3>{video.title}</h3>
        <p>{video.description}</p>
      </a>
      <LikeButton video={video} />
    </div>
  );
}

export default Video;
