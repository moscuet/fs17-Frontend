import { SortBy } from "./SortBy";
import { SortOrder } from "./SortOrder";

export interface QueryOptions {
    Limit?: number;
    StartingAfter?: number;
    SortBy?: SortBy;
    SortOrder?: SortOrder;
    SearchKey?: string;
}
