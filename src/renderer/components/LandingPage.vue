<template>
  <div class="landing">
    <div class="mask" v-show="isWelcome">
      <RzAnima type="text-1" :textStroke="textStroke" class="logo-anime">
        <template slot="text">Drama</template>
      </RzAnima>
      <div class="go-btn">
        <RzButton type="ace" @click="getAll"><template slot="inner-txt">Go</template></RzButton>
      </div>
    </div>
    <RzAnima type="ball-3" v-show="isUpdating" class="loading-anime"></RzAnima>
    <div class="movie-list" @scroll="handleScroll($event)" v-show="!isWelcome&&!isUpdating">
      <div class="movie-card" v-for="(item, index) in list" @click="showDetail(item)" v-show="!isSearch&&!isCollect">
        <i class="material-icons star" @click="collectMovie(index, $event)">{{ item.collected ? 'star' : 'star_border' }}</i>
        <div class="thumb">
          <div class="image" :style="{backgroundImage: 'url('+ item.poster + ')'}"></div>  
        </div>
        <div class="title">{{ item.title }}</div> 
      </div>
      <div class="movie-card" v-for="item in searchResult" @click="showDetail(item)" v-show="isSearch&&(searchResult.length !== 0)">
        <i class="material-icons star" @click="collectMovie(index, $event)">{{ item.collected ? 'star' : 'star_border' }}</i>
        <div class="thumb">
          <div class="image" :style="{backgroundImage: 'url('+ item.poster + ')'}"></div>  
        </div>
        <div class="title">{{ item.title }}</div> 
      </div>
      <div class="nothing-message" v-show="isSearch&&(searchResult.length == 0)">
         _(:3 」∠)_ Nothing found
      </div>
      <div class="movie-card" v-for="(item, index) in storage" @click="showDetail(item)" v-show="!isSearch&&isCollect&&item.collected">
        <i class="material-icons star" @click="collectMovie(index, $event)">{{ item.collected ? 'star' : 'star_border' }}</i>
        <div class="thumb">
          <div class="image" :style="{backgroundImage: 'url('+ item.poster + ')'}"></div>  
        </div>
        <div class="title">{{ item.title }}</div>
      </div>
      <div class="movie-detail" v-show="isShowDetail">
        <RzButton class="close-btn" type="mg" @click="cancel">Close</RzButton>
        <ul class="link-list" v-for="item in selectItem">
          <li v-for="source in item"><span>{{source.type}}</span><a :href="source.link" >{{ source.name }}</a></li>
        </ul>
      </div>
    </div>
    <div class="toolkit" v-show="!useTool">
      <div class="tool-btn" @click="showSearchBar"><i class="material-icons icon">search</i></div>
      <div class="tool-btn" @click="showCollectMovie"><i class="material-icons icon" @click="isMarkActive = !isMarkActive" :class="{active: isMarkActive}">bookmark_border</i></div>
      <div class="tool-btn" @click="closeWindow"><i class="material-icons icon">close</i></div>
    </div>
    <div class="searchBar" v-show="isSearchBar">
      <input class="search-input" type="text" name="search" v-model="searchStr" placeholder="搜索"/>
      <i class="material-icons icon" @click="closeSearchBar">close</i>
    </div>
    <i class="material-icons update-btn" @click="updateData">update</i>
    <i class="material-icons info-btn">info_outline</i>
    <div class="info-content">
      <ul class="info-list">
        <li><span>Core:</span>  <span>Vue + Electron</span></li>
        <li><span>UI:</span>  <span>Custom + RizuUI</span></li>
        <li><span>Author:</span> <span>yrq110</span></li>
        <li><span>Version:</span> <span>{{ version }}</span></li>
      </ul>
    </div>
  </div>
</template>

<script>
  // import movieData from '../assets/data.json'
  // import movieData from '../assets/6v_data.json'
  import config from '../../../package.json'
  const ipc = require('electron').ipcRenderer
  const api = 'http://dodserver.leanapp.cn'
  export default {
    name: 'landing-page',
    data () {
      return {
        random: '',
        isShowDetail: false,
        isWelcome: true,
        isUpdating: false,
        isSearch: false,
        isCollect: false,
        isSearchBar: false,
        isMarkActive: false,
        useTool: false,
        selectItem: {},
        storage: [],
        storageTitle: [],
        searchResult: [],
        textStroke: [
          'white', '#222', 'grey'
        ],
        searchStr: '',
        list: [],
        limit: 6,
        page: 1
      }
    },
    components: {},
    methods: {
      collectMovie (index, event) {
        event.stopPropagation()
        console.log(this.storage[index].title)
        this.storage[index].collected = !this.storage[index].collected
        localStorage.movie = JSON.stringify(this.storage)
      },
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      showDetail (item) {
        this.isShowDetail = true
        this.selectItem = item.resource
      },
      cancel () {
        this.isShowDetail = false
      },
      getAll () {
        if (typeof (localStorage.movie) === 'undefined') {
          // 1. local data
          // this.isWelcome = false
          // this.storage = movieData
          // localStorage.movie = JSON.stringify(movieData)
          // for (let a of this.storage) {
          //   this.storageTitle.push(a.title)
          // }

          // 2. internet data
          var vm = this
          this.$http.get(api + '/list')
            .then(function (res) {
              console.log('get data from url')
              vm.storage = res.data.resource
              vm.storage = vm.storage.filter(item => item.resource.length !== 0)
              for (let ele of vm.storage) {
                ele.collected = false
                vm.storageTitle.push(ele.title)
                console.log(ele.title)
                // console.log(ele)
              }
              console.log(vm.storage.length)
              localStorage.movie = JSON.stringify(vm.storage)
              vm.getByPage()
              // vm.isWelcome = false
            })
            .catch(function (error) {
              console.log(error)
            })
        } else {
          console.log('get data from localStorage')
          this.storage = JSON.parse(localStorage.movie)
          for (let a of this.storage) {
            this.storageTitle.push(a.title)
          }
          this.getByPage()
        }
        // console.log(this.storage.length)
      },
      getByPage () {
        console.log('get by page')
        for (let i = (this.page - 1) * this.limit; i < this.page * this.limit; i++) {
          this.list = this.list.concat(this.storage[i])
          console.log(this.storage[i])
        }
        this.isWelcome = false
        console.log(this.list.length)
      },
      handleScroll (e) {
        if (e.target.scrollTop + e.target.offsetHeight + 5 > e.target.scrollHeight) {
          this.page = this.page + 1
          this.getByPage()
          console.log('reach bottom')
        } else {
          console.log('not yet')
        }
      },
      showSearchBar () {
        this.isSearchBar = true
        this.useTool = true
      },
      closeSearchBar () {
        this.searchStr = ''
        this.isSearchBar = false
        this.useTool = false
      },
      showCollectMovie () {
        this.isCollect = !this.isCollect
      },
      updateData () {
        var collectMovie = []
        this.page = 1
        this.list = []
        this.storageTitle = []
        this.storage.forEach(function (value, index) {
          if (value.collected === true) collectMovie.push(value.title)
        })
        this.storage = []
        this.isUpdating = true
        var v = this
        this.$http.get(api + '/list')
          .then(function (res) {
            console.log('update data from url')
            v.isUpdating = false
            v.storage = res.data.resource
            v.storage = v.storage.filter(item => item.resource.length !== 0)
            for (let ele of v.storage) {
              collectMovie.forEach(function (value, index) {
                ele.collected = ele.title === value
              })
              console.log(ele.title)
              v.storageTitle.push(ele.title)
            }
            console.log(v.storage.length)
            localStorage.movie = JSON.stringify(v.storage)
            v.getByPage()
            alert('Data update. If there are anything wrong, pls restart it.')
          })
          .catch(function (error) {
            console.log(error)
            alert('error')
          })
      },
      closeWindow () {
        console.log('close')
        ipc.send('close-window', null)
      }
    },
    created: function () {
    },
    mounted: function () {
    },
    computed: {
      version: () => {
        return config.version
      }
    },
    watch: {
      searchStr (val) {
        if (val !== '') {
          this.isSearch = true
          var result = []
          var re = new RegExp(val)
          var vm = this
          this.storageTitle.forEach(function (e, index) {
            if (e.match(re)) {
              result.push(vm.storage[index])
            }
          })
          this.searchResult = result
        } else {
          this.isSearch = false
        }
        console.log(this.isSearch)
      }
    }
  }
</script>

<style lang="less">
  @import './LandingPage.less';
</style>
