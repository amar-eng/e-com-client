import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Form } from 'react-bootstrap';

export const SearchBox = ({ reset }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { keyword: urlKeyword } = useParams();
  const [keyword, setKeyword] = useState(urlKeyword || '');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      if (location.pathname.includes('explore-scents')) {
        navigate(`/explore-scents/search/${keyword.trim()}`);
      } else {
        navigate(`explore-scents/search/${keyword.trim()}`);
      }
      setKeyword('');
    } else {
      navigate('/explore-scents');
    }

    setKeyword('');
  };

  useEffect(() => {
    if (reset) {
      setKeyword('');
    }
  }, [reset]);
  return (
    <Form onSubmit={submitHandler} className="searchbox">
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
        placeholder="Search Scents..."
        className="searchbox__input"
      ></Form.Control>
    </Form>
  );
};
