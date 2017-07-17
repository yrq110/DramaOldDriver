<template>
  <div class="home">
    <!-- welcome view  -->
    <welcome 
      @getAll="getAll" 
      v-show="isWelcome" 
    />
    <RzAnima type="ball-3" v-show="isUpdating" class="loading-anime"></RzAnima>
    
    <!-- top view  -->

    <type-toggle 
      @view-toggle="toggleView" 
      :toggle="isCardview" 
    />

    <!-- main views  -->

    <card-view 
      @card-view-scroll="handleScroll"
      @card-click="showDetail"
      @card-collect="collectMovie"
      :list="list"
      :searchResult="searchResult"
      :storage="storage"
      :isSearch="isSearch"
      :isFavorite="isFavorite"
      v-show="!isWelcome&&!isUpdating&&isCardview"
    />

    <list-view 
      @card-click="showDetail"
      @card-collect="collectMovie"
      :list="list"
      :searchResult="searchResult"
      :storage="storage"
      :isSearch="isSearch"
      :isFavorite="isFavorite"
      v-show="!isWelcome&&!isUpdating&&!isCardview"
    />

    <movie-detail 
      @detail-close="closeDetail" 
      @check-click="batchLinks"
      :selectItem="selectItem"
      v-show="isShowDetail" 
    />

    <!-- bottom views  -->
    <tool-kit 
      @search-show="showSearchBar" 
      @favorite-show="showCollectMovie" 
      @window-close="closeWindow" 
      :isFavorite="isFavorite" 
      v-show="!useTool" 
    />

    <search-bar 
      @search-bar-close="closeSearchBar"
      v-model="searchStr"
      v-show="isSearchBar"
    />

    <batch-view
      @delete-batch-link="deleteBatchLink"
      @batch-download="downloadBatch"
      :batchLinks="selectLinks"
      v-show="selectLinks.length !== 0"
    />
    
    <i class="material-icons update-btn" @click="updateData">update</i>
    
    <info 
      :version="version"
    />
    <div class="batch-links"></div>
  </div>
</template>

<script>
  import Welcome from '../views/Welcome'
  import TypeToggle from '../views/TypeToggle'
  import MovieDetail from '../views/MovieDetail'
  import ToolKit from '../views/ToolKit'
  import CardView from '../views/CardView'
  import ListView from '../views/ListView'
  import SearchBar from '../views/SearchBar'
  import Info from '../views/Info'
  import BatchView from '../views/BatchView'

  import config from '../../../../package.json'
  const ipc = require('electron').ipcRenderer
  const api = 'http://dodserver.leanapp.cn'

  export default {
    name: 'home',
    data () {
      return {
        random: '',
        isShowDetail: false,
        isWelcome: true,
        isUpdating: false,
        isSearch: false,
        isFavorite: false,
        isSearchBar: false,
        useTool: false,
        selectItem: {},
        // selectLinks: {},
        selectLinks: [],
        storage: [],
        storageTitle: [],
        searchResult: [],
        searchStr: '',
        list: [],
        limit: 10,
        page: 1,
        isCardview: true
      }
    },
    components: {
      Welcome,
      TypeToggle,
      MovieDetail,
      ToolKit,
      CardView,
      ListView,
      SearchBar,
      Info,
      BatchView
    },
    methods: {
      collectMovie (index, event) {
        event.stopPropagation()
        console.log(this.storage[index].title)
        this.storage[index].collected = !this.storage[index].collected
        localStorage.movie = JSON.stringify(this.storage)
      },
      showDetail (item) {
        this.isShowDetail = true
        // this.selectItem = item.resource
        this.selectItem = item
        console.log(item.title)
      },
      closeDetail () {
        this.isShowDetail = false
      },
      batchLinks (arr) {
        this.selectLinks = arr
        // this.selectLinks[title] = arr
      },
      toggleView () {
        this.isCardview = !this.isCardview
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
      deleteBatchLink (index) {
        console.log('delete')
        this.selectLinks.splice(index, 1)
        console.log(`count: ${this.selectLinks.length}`)
      },
      downloadBatch () {
        let div = document.querySelector('.batch-links')
        div.innerHTML = ''
        let aArr = []
        for (let link of this.selectLinks) {
          if (typeof (link) === 'string') {
            let a = document.createElement('a')
            a.href = link.split('+')[1]
            aArr.push(a)
            div.appendChild(a)
          }
        }
        let i = 0
        let timer = setInterval(function () {
          if (i < aArr.length) {
            aArr[i].click()
            console.log(aArr[i])
            i = i + 1
          } else {
            clearInterval(timer)
          }
        }, 300)
      },
      showCollectMovie () {
        this.isFavorite = !this.isFavorite
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
            alert('Data updated. If there are anything wrong, pls restart :)')
          })
          .catch(function (error) {
            console.log(error)
            alert('error')
          })
      },
      closeWindow () {
        console.log('close')
        ipc.send('close-window', null)
      },
      isNullObject (obj) {
        for (let key in obj) {
          if (key) return false
        }
        return true
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

<style lang="less" scoped>
  @import '../../styles/Home.less';
</style>
