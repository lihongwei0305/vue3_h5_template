import {computed, reactive, ref, toRefs} from "vue";


const PICKER_TYPE = ['select']

export function usePicker(props, formData) {
    let state = reactive({
        pickerShow: {}
    })

    const getPickerList = computed(() => {
        let list = props.list.filter(v => PICKER_TYPE.includes(v.fcomptype || v.itemType))

        list.forEach(v => {
            state.pickerShow[v.field || v.itemName] = false
        })
        return list
    })


    const handleClose = (item, bol) => {
        state.pickerShow[item.field || item.itemName] = bol
    }

    const handleConfirm = (item, data) => {
        let field = item.field || item.itemName
        let fdisplayfield = item.fdisplayfield
        formData.value[field] = data.value
        fdisplayfield && (formData.value[fdisplayfield] = data.label)
    }



    return {
        getPickerList,
        handleClose,
        handleConfirm,
        ...toRefs(state)
    }

}