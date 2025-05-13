<template>
  <div class="paths-container">
    <div class="page-header">
      <h1>路径管理</h1>
      <div class="page-actions">
        <el-button type="primary" @click="refreshPaths" :loading="pathsStore.loading">
          <el-icon><Refresh /></el-icon>
          <span>刷新</span>
        </el-button>
        <el-button type="success" @click="showAddDialog">
          <el-icon><Plus /></el-icon>
          <span>添加路径</span>
        </el-button>
      </div>
    </div>

    <el-card shadow="hover" class="paths-card">
      <div class="table-toolbar">
        <el-input
          v-model="searchQuery"
          placeholder="搜索路径..."
          clearable
          prefix-icon="Search"
          style="width: 300px"
        />
        <div class="table-actions">
          <el-select v-model="filterProtocol" placeholder="协议过滤" clearable style="width: 120px">
            <el-option label="全部" value="" />
            <el-option label="RTSP" value="rtsp" />
            <el-option label="RTMP" value="rtmp" />
            <el-option label="HLS" value="hls" />
          </el-select>
          <el-select v-model="filterStatus" placeholder="状态过滤" clearable style="width: 120px">
            <el-option label="全部" value="" />
            <el-option label="活跃" value="active" />
            <el-option label="未激活" value="inactive" />
          </el-select>
        </div>
      </div>

      <el-table 
        :data="filteredPaths" 
        style="width: 100%" 
        v-loading="pathsStore.loading"
        border
        stripe
        highlight-current-row
        @row-click="handleRowClick"
      >
        <el-table-column prop="name" label="名称" min-width="200" show-overflow-tooltip />
        <el-table-column prop="protocol" label="协议" width="100">
          <template #default="{ row }">
            <el-tag 
              :type="getProtocolTagType(row.protocol)" 
              effect="plain"
              size="small"
            >
              {{ row.protocol?.toUpperCase() || 'N/A' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag 
              :type="row.status === 'active' ? 'success' : 'info'" 
              size="small"
              effect="dark"
            >
              {{ row.status === 'active' ? '活跃' : '未激活' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="lastSeen" label="最后活动" width="180">
          <template #default="{ row }">
            <div class="last-seen">
              <el-icon><Timer /></el-icon>
              <span>{{ formatDate(row.lastSeen) }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button-group>
              <el-tooltip content="编辑" placement="top" :show-after="500">
                <el-button type="primary" size="small" @click.stop="showEditDialog(row)">
                  <el-icon><Edit /></el-icon>
                </el-button>
              </el-tooltip>
              <el-tooltip content="查看详情" placement="top" :show-after="500">
                <el-button type="info" size="small" @click.stop="showDetails(row)">
                  <el-icon><View /></el-icon>
                </el-button>
              </el-tooltip>
              <el-tooltip content="删除" placement="top" :show-after="500">
                <el-button type="danger" size="small" @click.stop="handleDelete(row)">
                  <el-icon><Delete /></el-icon>
                </el-button>
              </el-tooltip>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>

      <div class="table-pagination">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="filteredPaths.length"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>

    <!-- 添加/编辑路径对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="isEdit ? '编辑路径' : '添加路径'"
      width="550px"
      destroy-on-close
    >
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="100px"
        label-position="top"
      >
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" :disabled="isEdit" placeholder="输入路径名称" />
        </el-form-item>
        <el-form-item label="协议" prop="protocol">
          <el-select v-model="form.protocol" style="width: 100%" placeholder="选择协议">
            <el-option label="RTSP" value="rtsp" />
            <el-option label="RTMP" value="rtmp" />
            <el-option label="HLS" value="hls" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio value="active">活跃</el-radio>
            <el-radio value="inactive">未激活</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSubmit" :loading="submitting">
            {{ isEdit ? '更新' : '添加' }}
          </el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 路径详情抽屉 -->
    <el-drawer
      v-model="drawerVisible"
      title="路径详情"
      size="400px"
      direction="rtl"
    >
      <div v-if="selectedPath" class="path-details">
        <el-descriptions :column="1" border>
          <el-descriptions-item label="名称">{{ selectedPath.name }}</el-descriptions-item>
          <el-descriptions-item label="协议">
            <el-tag :type="getProtocolTagType(selectedPath.protocol)">
              {{ selectedPath.protocol?.toUpperCase() }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="状态">
            <el-tag :type="selectedPath.status === 'active' ? 'success' : 'info'">
              {{ selectedPath.status === 'active' ? '活跃' : '未激活' }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="创建时间">
            {{ formatDate(selectedPath.created) }}
          </el-descriptions-item>
          <el-descriptions-item label="最后活动">
            {{ formatDate(selectedPath.lastSeen) }}
          </el-descriptions-item>
          <el-descriptions-item label="接收字节">
            {{ formatBytes(selectedPath.bytesReceived) }}
          </el-descriptions-item>
          <el-descriptions-item label="发送字节">
            {{ formatBytes(selectedPath.bytesSent) }}
          </el-descriptions-item>
        </el-descriptions>

        <div class="drawer-actions">
          <el-button type="primary" @click="showEditDialog(selectedPath)">
            <el-icon><Edit /></el-icon>
            <span>编辑</span>
          </el-button>
          <el-button type="danger" @click="handleDelete(selectedPath)">
            <el-icon><Delete /></el-icon>
            <span>删除</span>
          </el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { usePathsStore } from '@/stores/paths'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Refresh, Plus, Edit, Delete, View, Timer, Search } from '@element-plus/icons-vue'
import type { FormInstance } from 'element-plus'

const pathsStore = usePathsStore()
const dialogVisible = ref(false)
const drawerVisible = ref(false)
const isEdit = ref(false)
const formRef = ref<FormInstance>()
const submitting = ref(false)
const searchQuery = ref('')
const filterProtocol = ref('')
const filterStatus = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const selectedPath = ref(null)

const form = ref({
  name: '',
  protocol: '',
  status: 'inactive'
})

const rules = {
  name: [
    { required: true, message: '请输入路径名称', trigger: 'blur' },
    { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
  ],
  protocol: [
    { required: true, message: '请选择协议', trigger: 'change' }
  ],
  status: [
    { required: true, message: '请选择状态', trigger: 'change' }
  ]
}

// 过滤路径列表
const filteredPaths = computed(() => {
  let result = pathsStore.list || []
  
  // 搜索过滤
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(path => 
      path.name.toLowerCase().includes(query)
    )
  }
  
  // 协议过滤
  if (filterProtocol.value) {
    result = result.filter(path => 
      path.protocol === filterProtocol.value
    )
  }
  
  // 状态过滤
  if (filterStatus.value) {
    result = result.filter(path => 
      path.status === filterStatus.value
    )
  }
  
  return result
})

// 分页相关
const handleSizeChange = (val: number) => {
  pageSize.value = val
  currentPage.value = 1
}

const handleCurrentChange = (val: number) => {
  currentPage.value = val
}

// 获取协议标签类型
const getProtocolTagType = (protocol: string) => {
  switch (protocol?.toLowerCase()) {
    case 'rtsp': return 'primary'
    case 'rtmp': return 'success'
    case 'hls': return 'warning'
    default: return 'info'
  }
}

// 刷新路径列表
const refreshPaths = async () => {
  try {
    await pathsStore.fetchList()
    ElMessage.success('路径列表已刷新')
  } catch (error) {
    ElMessage.error('刷新路径列表失败')
  }
}

// 显示添加对话框
const showAddDialog = () => {
  isEdit.value = false
  form.value = {
    name: '',
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
  drawerVisible.value = false
}

// 显示详情抽屉
const showDetails = (row: any) => {
  selectedPath.value = row
  drawerVisible.value = true
}

// 处理行点击
const handleRowClick = (row: any) => {
  showDetails(row)
}

// 处理删除
const handleDelete = async (row: any) => {
  try {
    await ElMessageBox.confirm(
      `确定要删除路径 "${row.name}" 吗？`,
      '警告',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )
    await pathsStore.deletePath(row.name)
    ElMessage.success('路径已删除')
    drawerVisible.value = false
    await refreshPaths()
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('删除路径失败')
    }
  }
}

// 处理提交
const handleSubmit = async () => {
  if (!formRef.value) return

  try {
    await formRef.value.validate()
    submitting.value = true
    
    if (isEdit.value) {
      await pathsStore.updatePath(form.value.name, form.value)
      ElMessage.success('路径已更新')
    } else {
      await pathsStore.addPath(form.value)
      ElMessage.success('路径已添加')
    }
    
    dialogVisible.value = false
    await refreshPaths()
  } catch (error) {
    ElMessage.error(isEdit.value ? '更新路径失败' : '添加路径失败')
  } finally {
    submitting.value = false
  }
}

// 格式化日期
const formatDate = (date: string) => {
  if (!date) return '-'
  return new Date(date).toLocaleString()
}

// 格式化字节数
const formatBytes = (bytes: number) => {
  if (bytes === 0 || bytes === undefined) return '0 B'
  
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  
  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`
}

// 组件挂载时获取路径列表
onMounted(async () => {
  try {
    await pathsStore.fetchList()
  } catch (error) {
    ElMessage.error('获取路径列表失败')
  }
})
</script>

<style scoped>
.paths-container {
  width: 100%;
}

.paths-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.paths-title {
  font-size: 20px;
  font-weight: 500;
  color: var(--el-text-color-primary);
}

.paths-actions {
  display: flex;
  gap: 10px;
}

.search-bar {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  gap: 10px;
}

.search-input {
  flex: 1;
}

.filter-dropdown {
  width: 150px;
}

.path-card {
  margin-bottom: 15px;
  transition: all 0.3s;
}

.path-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--el-box-shadow);
}

.path-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.path-name {
  font-weight: 500;
  color: var(--el-text-color-primary);
}

.path-actions {
  display: flex;
  gap: 8px;
}

.path-details {
  margin-top: 15px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
}

.detail-item {
  display: flex;
  flex-direction: column;
}

.detail-label {
  font-size: 12px;
  color: var(--el-text-color-secondary);
  margin-bottom: 4px;
}

.detail-value {
  font-size: 14px;
  color: var(--el-text-color-primary);
}

.status-tag {
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
}

.status-tag.active {
  background-color: var(--el-color-success-light-9);
  color: var(--el-color-success);
}

.status-tag.inactive {
  background-color: var(--el-color-info-light-9);
  color: var(--el-color-info);
}

.empty-state {
  text-align: center;
  padding: 40px 0;
  color: var(--el-text-color-secondary);
}

.drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.drawer-title {
  font-size: 18px;
  font-weight: 500;
  color: var(--el-text-color-primary);
}

.drawer-close {
  cursor: pointer;
  color: var(--el-text-color-secondary);
}

.drawer-close:hover {
  color: var(--el-text-color-primary);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.pagination-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .paths-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  
  .paths-actions {
    width: 100%;
  }
  
  .search-bar {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .search-input {
    width: 100%;
  }
  
  .filter-dropdown {
    width: 100%;
  }
}
</style> 