import Layout from '../../../src/features/layout/Layout';
import BoardPage from '../../../src/features/board-page/BoardPage';
import {NextSeo} from 'next-seo';

function Board() {
  return (
    <>
      <NextSeo title="Kanban Board"/>
      <Layout>
        <BoardPage></BoardPage>
      </Layout>
    </>
   
  );
}

export default Board;
