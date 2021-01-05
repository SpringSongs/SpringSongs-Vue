<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20">
        <el-col :span="24" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="个人资料" name="account">
                <account :user="user" />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import {
  getUserInfo
} from '@/api/springsongs/sys/SpringUser/SpringUser'
import {
  mapGetters
} from 'vuex'
import Account from './components/Account'

export default {
  name: 'Profile',
  components: {
    Account
  },
  data() {
    return {
      user: {},
      activeTab: 'account'
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles'
    ])
  },
  created() {
    console.log('qweqe')
    this.userInfo()
  },
  methods: {
    userInfo() {
      const self = this
      getUserInfo().then(response => {
        self.user = response.data
      })
    }
  }
}
</script>
