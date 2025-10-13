import React from 'react';
import { useParams } from 'react-router-dom';

function PageOffre() {
  let { id } = useParams();

  
  return (
    <div>
      <h1>Offre ID: {id}</h1>
    </div>
  );
}

export default PageOffre;