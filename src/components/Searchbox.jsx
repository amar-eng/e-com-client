import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Form } from 'react-bootstrap';

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export const SearchBox = ({ reset }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { keyword: urlKeyword } = useParams();

  const [keyword, setKeyword] = useState(urlKeyword || '');

  const debouncedNavigate = debounce((keyword) => {
    if (location.pathname.includes('explore-scents')) {
      navigate(`/explore-scents/search/${keyword.trim()}`);
    } else {
      navigate(`explore-scents/search/${keyword.trim()}`);
    }
  }, 300);

  const handleSearch = (e) => {
    setKeyword(e.target.value);
    if (e.target.value.length > 0) {
      debouncedNavigate(e.target.value);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      if (location.pathname.includes('explore-scents')) {
        navigate(`/explore-scents/search/${keyword.trim()}`);
      } else {
        navigate(`explore-scents/search/${keyword.trim()}`);
      }
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
        onChange={handleSearch}
        value={keyword}
        placeholder="Search Scents..."
        className="searchbox__input"
      ></Form.Control>
    </Form>
  );
};
