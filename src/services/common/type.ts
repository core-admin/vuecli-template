// 分页
export interface PaginationParams {
  /**
   * 当前页
   */
  current: number;
  /**
   * 每页大小
   */
  size: number;
}

// 合并页面接口的其他参数
export type MergePaginationParams<T> = T & PaginationParams;

// 分页返回值
export interface PaginationResponse {
  current: number;
  size: number;
  total: number;
}

// 分页接口的通用返回值类型，包含分页信息和数据
export type PaginationResponseList<T> = PaginationResponse & {
  records: T[];
};

// 合并除分页信息外的其他返回值
export type MergePaginationResponse<T extends Recordable> = T & PaginationResponseList<T>;
