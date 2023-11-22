import { String, Record} from 'runtypes';

export const PostReqBody = Record({
    first_name: String,
    last_name: String, 
    email: String,
    enrollment_date: String
});

export const PutReqQuery = Record({
    id: String,
    email: String
});

// Returns true if input string contains only numeric characters
export const isNumeric = (val: string) : boolean => {
    return !isNaN(Number(val));
}