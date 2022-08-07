import dynamic from 'next/dynamic';
import { FC } from 'react';
interface Props {
  children: React.ReactNode;
}
const NoSsr: FC<Props> = (props) => <>{props.children}</>;

export default dynamic(() => Promise.resolve(NoSsr), {
  ssr: false,
});
