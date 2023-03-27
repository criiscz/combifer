export interface BackResponse {
  data: any;
  meta: {
    total: number;
    currentPage: number;
    lastPage: number;
    from: number;
    to: number;
  }
}