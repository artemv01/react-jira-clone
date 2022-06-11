import {styled} from "@mui/material/styles";
import {FC} from "react";

const BreadcrumbWrapper = styled('div')(({theme}) => ({
  fontSize: '15px',
  color: theme.palette.text.secondary,
  '& .separator': {
    padding: '0 12px',
  },
}));
interface Props {
  breadcrumbs: string[];
}
export const Breadcrumbs: FC<Props> = (props) => {
  const {breadcrumbs} = props;
  return (
    <BreadcrumbWrapper>
      {breadcrumbs.map((item, index) => {
        return (
          <span key={index} className="breadcrumb-item">
            <span>{item}</span>
            {breadcrumbs.length - 1 !== index && <span className="separator">/</span>}
          </span>
        );
      })}
    </BreadcrumbWrapper>
  );
};
