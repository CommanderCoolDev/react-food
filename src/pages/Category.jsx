import { useParams, useHistory } from 'react-router-dom';
import { getFilteredCategories } from '../api';
import { useEffect, useState } from 'react';
import { Preloader } from '../components/Preloader';
import { MealList } from '../components/MealsList';
function Category() {
  const { name } = useParams();
  const { goBack } = useHistory();
  const [meals, setMeals] = useState([]);
  useEffect(() => {
    getFilteredCategories(name).then(data => setMeals(data.meals));
  }, [name]);
  return (
    <>
      <button className="btn" onClick={goBack}>
        Go Back
      </button>
      {!meals.length ? <Preloader /> : <MealList meals={meals} />}
    </>
  );
}
export { Category };
