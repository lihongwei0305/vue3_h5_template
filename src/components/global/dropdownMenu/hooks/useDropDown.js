export function useDropDown(data) {
    const getDropDownFormData = () => {
        return data.firstItemData
    }


    return {
        getDropDownFormData
    }
}