import fetchAPI from "./api";

const ACCOUNTS_PATH = "/ntust_accounts";

export interface Account {
  id?: number;
  account: string;
  secret: string;
  autoLogin: boolean;
}

// const getInfoCachePath = (id: number): string => {
//   return `${ACCOUNTS_PATH}/${id}/info_cache`;
// };

export const findAccounts = async (
  offset: number,
  limit: number,
  account?: string
) => {
  interface Params {
    offset: number;
    limit: number;
    account?: string;
  }

  const params: Params = {
    offset: offset,
    limit: limit,
    account: account,
  };

  // Construct the query string manually
  let paramsStr = `offset=${params.offset}&limit=${params.limit}`;
  if (account) {
    paramsStr += `&account=${params.account}`;
  }

  const r = await fetchAPI("GET", ACCOUNTS_PATH + "?" + paramsStr, undefined);

  const text = await r.text();
  if (r.status != 200) throw new Error(await JSON.parse(text).error);
  if (text == "null") throw new Error("No accounts found");

  const accounts: Account[] = await JSON.parse(text);

  const totalCountHeader = r.headers.get("X-Total-Count");
  console.log(r.headers.entries());
  const totalCount = totalCountHeader ? parseInt(totalCountHeader) : 0;

  return {
    accounts,
    totalCount,
    response: r,
  };
};
