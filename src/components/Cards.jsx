/* eslint-disable react/prop-types */
const Cards = ({ country }) => {
  // console.log(country);
  return (
    <li className="card">
      <img
        src={country.flags?.png}
        alt={`drapeau ${country.translations?.fra?.common}`}
      />

      <div className="infos">
        <h2>{country.translations?.fra?.common}</h2>
        <h4>{country.capital}</h4>
        <p>Pop. {country.population.toLocaleString()}</p>
      </div>
    </li>
  );
};

export default Cards;
