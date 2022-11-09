import dd from 'gdt-jsapi'

let ddFun = {};

async function setTitle(title) {
    await dd.setTitle({
        title: title,
        onSuccess: () => {
        },
        onFail: (err) => {
            console.log(err)
        }
    })
}


ddFun.setTitle = setTitle
export default ddFun
