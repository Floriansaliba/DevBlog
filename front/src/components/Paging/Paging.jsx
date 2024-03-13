import './Paging.scss';
const Paging = ({ totalOfPages }) => {
  return (
    <div id='paging'>
      <ul className='pages-list'>
        {Array.from({ length: totalOfPages }).map((_, i) => (
          <li className='page-number' key={i}>
            {i + 1}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Paging;
