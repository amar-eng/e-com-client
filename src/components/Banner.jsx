export const Banner = ({ title, text, url, span }) => {
  return (
    <div className="banner" style={{ backgroundImage: `url(${url})` }}>
      <h1 className="banner__title">
        {title}
        <span className="banner__title-span"> {span}</span>
      </h1>
      <p className="banner__p">{text}</p>
    </div>
  );
};
