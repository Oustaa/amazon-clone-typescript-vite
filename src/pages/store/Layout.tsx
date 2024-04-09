import { useState, useEffect } from "react";
import { StyledLinks, StyledNav } from "../../styles/styled-header";
import { FlexContainer } from "../../styles";
import {
  StyledStoreHeader,
  StyledBgimage,
  StyledHeader,
  StyledAvatar,
} from "../../styles/styled-store";
import { Link, Outlet, useParams } from "react-router-dom";
import axios from "axios";
import { StoreInterface } from "./types";

type StateType = { value: StoreInterface | null; loading: boolean };

async function getStore(id: string, cb: (args0: StateType) => void) {
  cb({ value: null, loading: true });
  const resp = await axios.get(
    `${import.meta.env.VITE_APP_BASE_URL}/stores/${id}`
  );
  console.log(await resp.data);
  const data = await resp.data;

  cb({ value: data, loading: false });
}

const Layout = () => {
  const { id } = useParams<{ id: string }>();
  const [store, setStore] = useState<StateType>({ value: null, loading: true });

  useEffect(() => {
    getStore(id as string, setStore);
  }, [id]);

  return (
    <>
      <StyledStoreHeader>
        <StyledBgimage>
          <img
            src={`${
              import.meta.env.VITE_APP_BASE_URL
            }/images/bg-image-size.jpg`}
            crossOrigin="anonymous"
            alt=""
          />
        </StyledBgimage>
        <StyledHeader>
          <FlexContainer>
            <StyledAvatar>
              <img src={""} alt="" />
            </StyledAvatar>
            <h3>{store.value?.name}</h3>
          </FlexContainer>
          <StyledNav>
            <StyledLinks>
              <Link to="">Home</Link>
              <Link to="products">Products</Link>
            </StyledLinks>
          </StyledNav>
        </StyledHeader>
      </StyledStoreHeader>
      {/* <Outlet store={store} /> */}
      <Outlet />
    </>
  );
};

export default Layout;
