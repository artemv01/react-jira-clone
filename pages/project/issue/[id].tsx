/* eslint-disable func-style */

import { useRouter } from 'next/router';
import { FC } from 'react';
import Layout from '../../../src/features/layout/Layout';
import SingleIssuePage from '../../../src/features/single-issue-page';

const SingleIssue: FC = (): JSX.Element => {
  const router = useRouter();
  const id = router.query.id as string;
  return (
    <Layout>
      <SingleIssuePage id={id}></SingleIssuePage>
    </Layout>
  );
};

export async function getServerSideProps(ctx: any) {
  const { req, res } = ctx;

  return {
    props: {},
  };
}

export default SingleIssue;
