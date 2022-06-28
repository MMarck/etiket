import { useNavigate, useParams } from 'react-router-dom';

// eslint-disable-next-line import/prefer-default-export
export const withRouter = (Component) => {
  function Wrapper(props) {
    const navigate = useNavigate();
    const params = useParams();

    return <Component navigate={navigate} params={params} {...props} />;
  }

  return Wrapper;
};
