function buildRangeFilter(value?: { from?: number; to?: number }) {
  if (value?.from && value?.to) {
    return {
      between: [value?.from, value?.to],
    };
  } else if (value?.from) {
    return {
      gte: value?.from,
    };
  } else if (value?.to) {
    return {
      lte: value?.to,
    };
  }
}

export function buildFilter(values: any) {
  let filter: any = {
    where: {},
  };

  if (values.term) {
    filter.where.name = { regexp: `/${values.term}/i` };
  }

  if (values.buy?.from || values.buy?.to) {
    filter.where['variants.buy'] = buildRangeFilter(values.buy);
  }

  return filter;
}
