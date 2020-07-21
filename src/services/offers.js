const getOffers = async (page, limit, sort, order, search, filter) => {
  page = page || 1;
  limit = limit || 4;
  sort = sort || 'createdAt';
  order = order || -1;

  const promise = await fetch(`http://localhost:5000/blog/posts/all/${page}/${limit}/${sort}/${order}/${search}/${filter}`);
  const offers = await promise.json();
  return console.log(offers);
};


export const requester = {
  getOffers,
};



