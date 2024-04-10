import { useEffect, useState } from 'react';

const FormattedDate = ({ movie }) => {
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    if (movie.release_date || movie.first_air_date) {
      const dateObject = new Date(movie.release_date || movie.first_air_date);
      const day = dateObject.getDate();
      const month = dateObject.toLocaleString('default', { month: 'short' });
      const year = dateObject.getFullYear();
      const formattedDateString = `${day} ${month} ${year}.`;
      setFormattedDate(formattedDateString);
    }
  }, [movie]);

  return (
    <div>
      <p className='date'>{formattedDate}</p>{' '}
    </div>
  );
};

export default FormattedDate;
