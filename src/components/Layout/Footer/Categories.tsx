import { StyledNav, StyledLinks } from "../../../styles/styled-header";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAppSelector } from "../../../store/hooks";
import Loader from "../../Loader";

const StyledFooterHr = styled.div`
  background-color: var(--dark-600);
  height: 1px;
  width: 100%;
  margin-block: var(--spacing-lg);
`;

const StyledSubCategories = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  margin-top: var(--spacing-lg);
`;

const Categories = () => {
  const {
    loading,
    error,
    value: categories,
  } = useAppSelector((state) => state.categories);

  if (loading) return <Loader />;

  if (error) return <h2>There is an unexpected error</h2>;

  return (
    <>
      <StyledFooterHr />
      <StyledNav>
        <StyledLinks style={{ justifyContent: "space-between", width: "100%" }}>
          {categories?.map((category) => (
            <Link key={category._id} to={`/products/${category._id}`}>
              <span className="category">{category.name}</span>

              <StyledSubCategories>
                {category.subCategories?.map((subCategory) => (
                  <Link
                    key={subCategory.name}
                    to={`/products/sub/${subCategory.name}`}
                  >
                    {subCategory.name}
                  </Link>
                ))}
              </StyledSubCategories>
            </Link>
          ))}
        </StyledLinks>
      </StyledNav>
    </>
  );
};

export default Categories;
