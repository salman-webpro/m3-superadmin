export const sortCreatedAt = (data, sort) => {
  return [...data].sort((a, b) => {
    if (sort === "asc") {
      return new Date(a.created_at) - new Date(b.created_at);
    } else {
      return new Date(b.created_at) - new Date(a.created_at);
    }
  });
};

export const sortUserName = (data, sort) => {
  return [...data].sort((a, b) => {
    const nameA = a.owner.toLowerCase();
    const nameB = b.owner.toLowerCase();

    if (sort === "asc") {
      return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
    } else {
      return nameA > nameB ? -1 : nameA < nameB ? 1 : 0;
    }
  });
};

export const sortRestaurantName = (data, sort) => {
  return [...data].sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();

    if (sort === "asc") {
      return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
    } else {
      return nameA > nameB ? -1 : nameA < nameB ? 1 : 0;
    }
  });
};
