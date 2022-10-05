/* eslint-disable func-style */

import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { FC } from 'react';
import Layout from '../../../src/features/layout/Layout';
import SingleIssuePage from '../../../src/features/single-issue-page/SingleIssuePage';

const SingleIssue: FC = (): JSX.Element => {
  const router = useRouter();
  const id = router.query.id as string;

  return (
    <>
      <NextSeo title={`${id}`} />
      <Layout>
        <SingleIssuePage id={id}></SingleIssuePage>
      </Layout>
    </>
  );
};

export async function getServerSideProps(ctx: any) {
  const { req, res } = ctx;

  return {
    props: {},
  };
}

export default SingleIssue;
