import { getDate } from "./utils";
import { DATE_FORMAT } from "./constants";

export const parseCurrencyReponse = (response: any) => {
    const date = getDate(response.from);
    return response.data.reduce((hash, value) => {
        // Move the date forward.
        date.add(1, 'days');
        if (!!value) {
            hash[date.format(DATE_FORMAT)] = Number(value);
        }
        return hash;
    }, {});
};