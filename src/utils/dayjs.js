import dayjs from "dayjs"

export const currentTimeGenerator = () => {
    let d = dayjs(new Date(Date.now())).format()

    return d;
}