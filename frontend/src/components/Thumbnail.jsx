function Thumbnail({ video }) {
  return (
    <img
      src={video.thumbnail}
      alt={video.title}
      style={{ width: '100%', borderRadius: '10px' }}
    />
  );
}

export default Thumbnail;
