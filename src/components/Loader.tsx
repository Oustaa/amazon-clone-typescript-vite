import { FC } from "react";
import { StyledLoader } from "../styles";
import { ClipLoader } from "react-spinners";

const Loader: FC<{ height?: string; loaderExtraStyles?: string }> = ({
  height,
  loaderExtraStyles,
}) => {
  return (
    <StyledLoader loaderExtraStyles={loaderExtraStyles} height={height}>
      <ClipLoader size={120} color={"var(--primary)"} />
    </StyledLoader>
  );
};

export default Loader;
