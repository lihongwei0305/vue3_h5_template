<template>
  <div style="background-color: #eff2f5">
    <common-page ref="commonPageRef" :filterState="state.filterState" :scrollListState="state.scrollListState">
      <template #="{item,index}">
        <div class="box" :key="item.id">
          <div class="box_top">
            <img :src=" BASE_URL +item.attachPath" alt="">
            <div class="content">
              <span>文件名称:{{ item.attachName || '' }}</span>
              <span>上传人:{{ item.createUserName || '' }}</span>
              <span>上传时间:{{ item.createTime || '' }}</span>
              <span>发票代码:{{ item.invoiceCode || '' }}</span>
              <span>发票号码:{{ item.invoiceNumber || '' }}</span>
              <span>开票时间：{{ item.billingDate || '' }}</span>
              <span>发票类型:{{ item.invoiceType || '' }}</span>
              <span>不含税金额:{{ item.beforeTaxMoney || '' }}</span>
              <span>校验码:{{ item.verifyCode || '' }}</span>
              <span>销售方纳税人识别号:{{ item.taxpayerID || '' }}</span>
            </div>
          </div>
          <div class="box_bottom">
            <button class="remove" @click="handleRemove(item,index)">删除</button>
            <button :class="item.isShare == 1 ? 'share' : 'noShare'"> {{ item.isShare == 1 ? '已' : '未' }}共享</button>
          </div>
        </div>
      </template>
    </common-page>
  </div>


  <float-box
      iconName="plus"
      :initStyle="{bottom:'10%', left:'80%'}"
      @click="plusClick"
  />


  <van-popup
      v-model:show="show"
      position="bottom"
      round
      :style="{ height: '60%' }">

    <div class="addFile">
      <div class="header">上传发票</div>
      <div class="content">
        <van-uploader v-model="fileList" :after-read="afterRead"/>
      </div>
      <div class="footer">
        <div class="btn">
          <van-space>
            <van-button type="primary" round>清空</van-button>
            <van-button type="primary" round @click="handleUpload">上传</van-button>
          </van-space>

        </div>
      </div>
    </div>

  </van-popup>

</template>

<script setup>
import {inject, nextTick, onMounted, reactive, ref} from "vue";
import {Dialog} from 'vant';

/* Api */
import dictionaryApi from "@/api/dictionary";
import clReiAttClipApi from "@/api/reimbs/clReiAttClip.js";
/**/
import {useCommonRequest} from "@/hooks/useCommonRequest";
import {useUpload} from '@/hooks/useUpload'
import {Toast} from "vant";

const {deleteRequest} = useCommonRequest()
const {upload} = useUpload()
let commonPageRef = ref(null)

const BASE_URL = inject('BASE_URL')


let state = reactive({
  list: [],
  dropdownFormData: {},
  filterState: {
    filterList: [],
    initFilterFormData: {
      attachCategoryId: 115872,
      attachCategoryCode: '1',
      invoiceStaus: 1
    }
  },
  scrollListState: {
    api: clReiAttClipApi.pageNew,
    params: {
      menumethodno: 649301,
      budgetYear: "2021",
      isallflag: 1,
    }
  }
})
let scrollListState = ref()


onMounted(async () => {
  console.log('onMounted')
  init()
})

const init = async () => {
  // 获取附件类别
  await getFilterList()
  await getAttachCategory()
  state.scrollListState.params = {...state.scrollListState.params, ...state.filterState.initFilterFormData}
}
const getAttachCategory = async () => {
  let {data: res} = await dictionaryApi.page({
    "model": {
      "felementcode": "E_REIMBS_ATTACH_CATEGORY"
    },
    "currentPage": 1,
    "pageSize": 50,
    "levelNo": null,
    "querys": []
  })
  res.data.records.forEach(v => {
    v.value = v.id
    v.label = v.fcode + '-' + v.fname
  })
  state.filterState.filterList[0].options = res.data.records
  state.filterState.initFilterFormData.attachCategoryName = res.data.records.filter(v => v.id === 115872).pop().label
  state.filterState.initFilterFormData.invoiceStausName = '1-已报销'

}

const getFilterList = () => {
  let data = [
    {
      field: 'attachCategoryId',
      "itemType": "select",
      "label": "附件类别",
      "placeholder": null,
      "required": false,
      "defaultValue": null,
      "defaultValueName": null,
      "dataUrl": null,
      "showCheckbox": null,
      "defaultExpandedKeys": null,
      "singleSelection": null,
      "fwidth": 200,
      "fdatatype": "S",
      "ffiltertype": null,
      "ftablealias": null,
      "fdatasource": null,
      "fsourcetype": null,
      "options": null,
      "fisdisplay": 1,
      "fcolumnctrno": 123622026173,
      "fdisporder": 1,
      fdisplayfield: 'attachCategoryName'
    },
    {
      field: 'invoiceStaus',
      "itemType": "select",
      "fcomptype": "select",
      "label": "报销类型",
      "placeholder": null,
      "required": false,
      "defaultValue": null,
      "defaultValueName": null,
      "dataUrl": null,
      "showCheckbox": null,
      "defaultExpandedKeys": null,
      "singleSelection": null,
      "fwidth": 200,
      "fdatatype": "S",
      "ffiltertype": null,
      "ftablealias": null,
      "fdatasource": null,
      "fsourcetype": null,
      "options": [
        {
          value: 1,
          label: "1-已报销"
        },
        {
          value: 2,
          label: "2-未报销"
        }
      ],
      "fisdisplay": 1,
      "fcolumnctrno": 123622026173,
      "fdisporder": 1,
      fdisplayfield: 'invoiceStausName'
    }
  ]

  state.filterState.filterList = data
}


// 新增
let show = ref(false)
let fileList = ref([])
const plusClick = () => {
  show.value = true
}

const afterRead = (file) => {
  console.log(file)
}

const handleUpload = async () => {
  let data = await upload({fileList: fileList.value})
  await handleBatchSave(data)
}

const handleBatchSave = async (data) => {
  let params = {
    attachCategoryCode: '1',
    attachCategoryId: 115872,
    attachCategoryName: '发票（票据）',
    reiAttClipSaveDTOS: [],
  };
  params.reiAttClipSaveDTOS = data.map(v => {
    let {file, ...rest} = v;
    return {
      ...rest,
      attachCategoryCode: '1',
      attachCategoryId: 115872,
      attachCategoryName: '发票（票据）',
      attName: file?.submittedFileName || rest?.submittedFileName,
      attachName: file?.submittedFileName || rest?.submittedFileName,
      attachPath: `/api/fileserver/file/download/reimbs/${file?.id || rest.id}`,
      attachType: file?.ext || rest.ext,
      id: file?.id,
    };
  });
  let {data: res} = await clReiAttClipApi.saveS(params);
  if (res.code !== 0 && res.code !== 200) {
    return Toast(res.msg);
  }
  fileList.value = []
  show.value = false
  Toast.success('上传完成');
};


const handleRemove = (item, index) => {
  let list = commonPageRef.value.getList()
  Dialog.confirm({
    title: '标题',
    message: '确定删除该数据吗?',
    beforeClose: (action, done) => {
      if (action === 'cancel') {
        return true
      }
      return new Promise(async (resolve) => {
        await clReiAttClipApi.remove({
          ids: [item.id]
        }).then((res) => {
          list.splice(index, 1)
          Toast.success('删除成功')
          resolve(true)
        }).catch(err => {
          resolve(false)
        })

        //   await clReiAttClipApi.remove({
        //     ids: [item.id]
        //   }).then((res) => {
        //     list.splice(index, 1)
        //     Toast.success('删除成功')
        //
        //   }).catch((err) => {
        //   })
        // if (!(res.code === 0 || res.code === 200)) {
        //   Toast.error('删除失败');
        //   return false
        // }
        // list.splice(index, 1)
        // Toast.success('删除成功')
        // return true
      });

    },

  });
};


</script>

<style scoped lang="scss">
.box {
  font-size: 26px;
  margin: 20px 20px;
  background-color: #fff;
  border-radius: 20px;
  box-sizing: border-box;

  &_top {
    display: flex;
    padding: 20px;

    img {
      width: 200px;
      height: 200px;
      margin-right: 20px;
    }

    .content {
      display: flex;
      flex-direction: column;
    }
  }

  &_bottom {
    display: flex;
    justify-content: flex-end;
    margin-right: 20px;

    button {
      height: 64px;
      border: 0;
      color: #fff;
      border-radius: 5px;
    }

    .remove {
      background-color: #ed6a0c;
      border: 1px solid #ed6a0c;
      margin: 0 10px 10px 0;
    }

    .share {
      background-color: #85ce61;
      border: 1px solid #85ce61;
    }

    .noShare {
      background-color: #a6a9ad;
      border: 1px solid #a6a9ad;
    }
  }
}

.addFile {
  padding: 10px;

  .header {
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80px;
    margin: 0 auto;
  }

  .content {
    padding-left: 36px;

  }

  .footer {
    width: 100%;
    position: fixed;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    .btn {
      width: 80%;
      display: flex;
      justify-content: center;
      align-items: center;


      button {
        width: 240px !important;
      }

    }


  }

}
</style>