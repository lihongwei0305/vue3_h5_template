import reiFileApi from '@/api/reimbs/reiFile'

export function useUpload() {
    const upload = async ({api, fileList}) => {
        fileList.forEach(v=>{
            v.status = 'uploading'
        })
        api = api ? api : reiFileApi.batchupload
        let formData = new FormData();
        formData.append('appName', 'reimbs');
        fileList.forEach(v => {
            formData.append('file[]', v.file);
        });
        let {data: res} = await api(formData)
            ['catch'](() => {
        })
            ['finally']();
        if (!(res.code === 0 || res.code === 200)) {
            // return this.$message.error(res.msg);
        }
        fileList.forEach(v=>{
            v.status = 'down'
        })


        return res.data
    }

    return {
        upload
    }
}