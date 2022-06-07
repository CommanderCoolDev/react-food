import { getAllCategories } from '../api';
import { useState, useEffect } from 'react';
import { Preloader } from '../components/Preloader';
import { CategoryList } from '../components/CategoryList';
import { Search } from '../components/Search';
import { useLocation, useHistory } from 'react-router-dom';

function Home() {
  const [catalog, setCatalog] = useState([]);
  const [filteredCatalog, setFilteredCatalog] = useState([]);
  const { pathname, search } = useLocation();
  const { push } = useHistory();
  const handleSearch = str => {
    setFilteredCatalog(
      catalog.filter(item =>
        item.strCategory.toLowerCase().includes(str.toLowerCase()),
      ),
    );

    push({
      pathname,
      search: `?search=${str}`,
    });
  };
  useEffect(() => {
    getAllCategories().then(data => {
      setCatalog(data.categories);
      setFilteredCatalog(
        search
          ? data.categories.filter(item =>
              item.strCategory
                .toLowerCase()
                .includes(search.split('=')[1].toLocaleLowerCase()),
            )
          : data.categories,
      );
    });
  }, [search]);
  return (
    <>
      <Search cb={handleSearch} />

      {!catalog.length ? (
        <Preloader />
      ) : (
        <CategoryList catalog={filteredCatalog} />
      )}
    </>
  );
}
export { Home };
