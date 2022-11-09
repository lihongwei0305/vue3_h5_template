export function useScrollList() {
    const getScrollList = async (api) => {


        let {data: res} = await api
        return res
    }


    return {
        getScrollList
    }
}