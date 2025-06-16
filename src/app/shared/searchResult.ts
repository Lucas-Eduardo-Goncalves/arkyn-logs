import { Entity } from "../../domain/protocol/entity";

type MetaType = {
  page: number;
  pageLimit: number;
  totalItems: number;
};

type SearchResultConstructorProps<E extends Entity> = {
  data: E[];
  meta: MetaType;
};

class SearchResult<E extends Entity = any> {
  readonly data: E[];
  readonly meta: MetaType;

  constructor(props: SearchResultConstructorProps<E>) {
    this.data = props.data;
    this.meta = props.meta;
  }

  toJson() {
    return {
      data: this.data.map((entity) => entity.toJson()),
      meta: {
        page: this.meta.page,
        pageLimit: this.meta.pageLimit,
        totalItems: this.meta.totalItems,
      },
    };
  }
}

export { SearchResult };
