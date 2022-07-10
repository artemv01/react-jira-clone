import dynamic from 'next/dynamic';

const ReactQuill = dynamic(
  import('react-quill'),
  {
    ssr: false,
    // loading: () => <Spin />,
  }
);

export default ReactQuill;