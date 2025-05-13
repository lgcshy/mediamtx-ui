<template>
  <div class="sources">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>源列表</span>
          <div class="header-actions">
            <el-button type="primary" @click="refreshSources">刷新</el-button>
            <el-button type="success" @click="showAddDialog">添加源</el-button>
          </div>
        </div>
      </template>

      <el-table :data="sourcesStore.list" style="width: 100%" v-loading="sourcesStore.loading">
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="url" label="URL" show-overflow-tooltip />
        <el-table-column prop="protocol" label="协议" />
        <el-table-column prop="status" label="状态">
          <template #default="{ row }">
            <el-tag :type="row.status === 'active' ? 'success' : 'info'">
              {{ row.status === 'active' ? '活跃' : '未激活' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="lastSeen" label="最后活动">
          <template #default="{ row }">
            {{ formatDate(row.lastSeen) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="{ row }">
            <el-button-group>
              <el-button type="primary" size="small" @click="showEditDialog(row)">
                编辑
              </el-button>
              <el-button type="danger" size="small" @click="handleDelete(row)">
                删除
              </el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加/编辑源对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="isEdit ? '编辑源' : '添加源'"
      width="500px"
    >
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="100px"
      >
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" :disabled="isEdit" />
        </el-form-item>
        <el-form-item label="URL" prop="url">
          <el-input v-model="form.url" />
        </el-form-item>
        <el-form-item label="协议" prop="protocol">
          <el-select v-model="form.protocol" style="width: 100%">
            <el-option label="RTSP" value="rtsp" />
            <el-option label="RTMP" value="rtmp" />
            <el-option label="HLS" value="hls" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="form.status" style="width: 100%">
            <el-option label="活跃" value="active" />
            <el-option label="未激活" value="inactive" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSubmit">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useSourcesStore } from '@/stores/sources'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { FormInstance } from 'element-plus'

const sourcesStore = useSourcesStore()
const dialogVisible = ref(false)
const isEdit = ref(false)
const formRef = ref<FormInstance>()

const form = ref({
  name: '',
  url: '',
  protocol: '',
  status: 'inactive'
})

const rules = {
  name: [
    { required: true, message: '请输入源名称', trigger: 'blur' },
    { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
  ],
  url: [
    { required: true, message: '请输入 URL', trigger: 'blur' },
    { type: 'url', message: '请输入有效的 URL', trigger: 'blur' }
  ],
  protocol: [
    { required: true, message: '请选择协议', trigger: 'change' }
  ],
  status: [
    { required: true, message: '请选择状态', trigger: 'change' }
  ]
}

// 刷新源列表
const refreshSources = async () => {
  try {
    await sourcesStore.fetchList()
    ElMessage.success('源列表已刷新')
  } catch (error) {
    ElMessage.error('刷新源列表失败')
  }
}

// 显示添加对话框
const showAddDialog = () => {
  isEdit.value = false
  form.value = {
    name: '',
    url: '',
    protocol: '',
    status: 'inactive'
  }
  dialogVisible.value = true
}

// 显示编辑对话框
const showEditDialog = (row: any) => {
  isEdit.value = true
  form.value = { ...row }
  dialogVisible.value = true
}

// 处理删除
const handleDelete = async (row: any) => {
  try {
    await ElMessageBox.confirm(
      `确定要删除源 "${row.name}" 吗？`,
      '警告',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )
    await sourcesStore.deleteSource(row.name)
    ElMessage.success('源已删除')
    await refreshSources()
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('删除源失败')
    }
  }
}

// 处理提交
const handleSubmit = async () => {
  if (!formRef.value) return

  try {
    await formRef.value.validate()
    if (isEdit.value) {
      await sourcesStore.updateSource(form.value.name, form.value)
      ElMessage.success('源已更新')
    } else {
      await sourcesStore.addSource(form.value)
      ElMessage.success('源已添加')
    }
    dialogVisible.value = false
    await refreshSources()
  } catch (error) {
    ElMessage.error(isEdit.value ? '更新源失败' : '添加源失败')
  }
}

// 格式化日期
const formatDate = (date: string) => {
  if (!date) return '-'
  return new Date(date).toLocaleString()
}

// 组件挂载时获取源列表
onMounted(async () => {
  try {
    await sourcesStore.fetchList()
  } catch (error) {
    ElMessage.error('获取源列表失败')
  }
})
</script>

<style scoped>
.sources {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-actions {
  display: flex;
  gap: 10px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style> 