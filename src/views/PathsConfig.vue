<template>
  <div>
    <div class="page-header">
      <h1>路径配置</h1>
      <div class="page-actions">
        <el-button type="primary" :icon="Plus" @click="showAddDialog">添加路径</el-button>
        <el-button :icon="Refresh" @click="loadData" :loading="store.loading">刷新</el-button>
      </div>
    </div>

    <el-card shadow="hover">
      <el-table :data="store.list" v-loading="store.loading" style="width: 100%">
        <el-table-column prop="name" label="路径名称" min-width="200" show-overflow-tooltip />
        <el-table-column label="源" min-width="250">
          <template #default="{ row }">
            <span>{{ row.source || '-' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" fixed="right">
          <template #default="{ row }">
            <el-button text type="primary" size="small" @click="showEditDialog(row)">编辑</el-button>
            <el-popconfirm title="确定删除此路径配置？" @confirm="handleDelete(row.name)">
              <template #reference>
                <el-button text type="danger" size="small">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-empty v-if="!store.loading && store.list.length === 0" description="暂无路径配置" />
    </el-card>

    <!-- Add/Edit Dialog -->
    <el-dialog v-model="dialogVisible" :title="isEdit ? '编辑路径配置' : '添加路径配置'" width="500px">
      <el-form :model="form" label-width="100px">
        <el-form-item label="路径名称" required>
          <el-input v-model="form.name" :disabled="isEdit" placeholder="例如: mystream" />
        </el-form-item>
        <el-form-item label="源地址">
          <el-input v-model="form.source" placeholder="例如: rtsp://..." />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { usePathsConfigStore } from '@/stores/pathsConfig'
import { ElMessage } from 'element-plus'
import { Refresh, Plus } from '@element-plus/icons-vue'

const store = usePathsConfigStore()
const dialogVisible = ref(false)
const isEdit = ref(false)
const form = reactive({ name: '', source: '' })

const showAddDialog = () => {
  isEdit.value = false
  form.name = ''
  form.source = ''
  dialogVisible.value = true
}

const showEditDialog = (row: any) => {
  isEdit.value = true
  form.name = row.name
  form.source = row.source || ''
  dialogVisible.value = true
}

const handleSave = async () => {
  if (!form.name) {
    ElMessage.warning('请输入路径名称')
    return
  }
  try {
    const data: any = {}
    if (form.source) data.source = form.source
    if (isEdit.value) {
      await store.patch(form.name, data)
    } else {
      await store.add(form.name, data)
    }
    ElMessage.success('保存成功')
    dialogVisible.value = false
  } catch {
    ElMessage.error('保存失败')
  }
}

const handleDelete = async (name: string) => {
  try {
    await store.remove(name)
    ElMessage.success('已删除')
  } catch {
    ElMessage.error('删除失败')
  }
}

const loadData = () => store.fetchList()
onMounted(loadData)
</script>
