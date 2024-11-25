'use client';

import RichTextEditor from './RichTextEditor';
import RestOfPostEdit from './RestOfPostEdit';
import ArticlePostEditComponent from './ArticlePostEditComponent';

function ManagePostProperties() {
 

  return (
    <div className='flex flex-col gap-2'>
      <ArticlePostEditComponent/>
      <div className='bg-white rounded'>

        <RichTextEditor/>
      </div>
      <RestOfPostEdit />
      </div>
   
  );
}

export default ManagePostProperties;
