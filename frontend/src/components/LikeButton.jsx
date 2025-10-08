import { useState } from 'react';

function LikeButton({ video }) {
  const [likes, setLikes] = useState(video.likes || 0);

  return (
    <button onClick={() => setLikes(likes + 1)}>
      ❤️ {likes}
    </button>
  );
}

export default LikeButton;
