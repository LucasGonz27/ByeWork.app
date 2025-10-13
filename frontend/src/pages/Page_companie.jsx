import React from 'react';
import { useParams } from 'react-router-dom';

function PageCompanie() {
  let { idEntreprise } = useParams();
  return (
    <div>
      <h1>Company ID: {idEntreprise}</h1>
    </div>
  );
}

export default PageCompanie;