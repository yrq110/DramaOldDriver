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
    <div class="movie-list">
      <div class="movie-card" v-for="(item, index) in storage" @click="showDetail(item)" v-show="!isSearch&&!isCollect">
        <i class="material-icons star" @click="collectMovie(index, $event)" v-show="item.collected">star</i>
        <i class="material-icons star" @click="collectMovie(index, $event)" v-show="!item.collected">star_border</i>
        <div class="thumb">
          <div class="image" :style="{backgroundImage: 'url('+ item.poster + ')'}"></div>  
        </div>
        <div class="title">{{ item.title.split('/')[0] }}</div> 
      </div>
      <div class="movie-card" v-for="item in searchResult" @click="showDetail(item)" v-show="isSearch&&(searchResult.length !== 0)">
        <i class="material-icons star" @click="collectMovie(index, $event)" v-show="item.collected">star</i>
        <i class="material-icons star" @click="collectMovie(index, $event)" v-show="!item.collected">star_border</i>
        <div class="thumb">
          <div class="image" :style="{backgroundImage: 'url('+ item.poster + ')'}"></div>  
        </div>
        <div class="title">{{ item.title.split('/')[0] }}</div> 
      </div>
      <div class="nothing-message" v-show="isSearch&&(searchResult.length == 0)">
         _(:3 」∠)_ Nothing found
      </div>
      <div class="movie-card" v-for="(item, index) in storage" @click="showDetail(item)" v-show="!isSearch&&isCollect&&item.collected">
        <i class="material-icons star" @click="collectMovie(index, $event)" v-show="item.collected">star</i>
        <i class="material-icons star" @click="collectMovie(index, $event)" v-show="!item.collected">star_border</i>
        <div class="thumb">
          <div class="image" :style="{backgroundImage: 'url('+ item.poster + ')'}"></div>  
        </div>
        <div class="title">{{ item.title.split('/')[0] }}</div> 
      </div>
      <div class="movie-detail" v-show="isShowDetail">
        <RzButton class="close-btn" type="mg" @click="cancel">Close</RzButton>
        <ul class="link-list">
          <li v-for="source in selectItem.link"><span>{{source.link_type}}</span><a :href="source.link" >{{ source.name }}</a></li>
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
    <i class="material-icons info-btn">info_outline</i>
    <div class="info-content">
      <ul class="info-list">
        <li><span>Core:</span>  <span>Vue + Electron</span></li>
        <li><span>UI:</span>  <span>RizuUI</span></li>
        <li><span>Author:</span> <span>yrq110</span></li>
        <li><span>Version:</span> <span>{{ version }}</span></li>
      </ul>
    </div>
    
  </div>
</template>

<script>
  // import movieData from '../assets/data.json'
  import movieData from '../assets/6v_data.json'
  import config from '../../../package.json'
  const ipc = require('electron').ipcRenderer
  // const api = 'http://dod-server.herokuapp.com'
  export default {
    name: 'landing-page',
    data () {
      return {
        random: '',
        isShowDetail: false,
        isWelcome: true,
        isSearch: false,
        isCollect: false,
        isSearchBar: false,
        isMarkActive: false,
        useTool: false,
        selectItem: {},
        storage: {},
        storageTitle: [],
        searchResult: [],
        textStroke: [
          'white', '#222', 'grey'
        ],
        searchStr: ''
      }
    },
    components: {},
    created: () => {
    },
    mounted: () => {
    },
    methods: {
      collectMovie (index, event) {
        event.stopPropagation()
        // item.collected = !item.collected
        this.storage[index].collected = !this.storage[index].collected
        localStorage.movie = JSON.stringify(this.storage)
        // return item
        // console.log(event)
        // console.log(this.storage[index])
        // this.$nextTick(function () {
        //   this.storage[index].collected = !this.storage[index].collected
        // })
      },
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      showDetail (item) {
        this.isShowDetail = true
        this.selectItem = item
      },
      cancel () {
        this.isShowDetail = false
      },
      getAll () {
        var body = document.querySelector('body')
        body.style.overflowY = 'scroll'
        if (typeof (localStorage.movie) === 'undefined') {
          this.isWelcome = false
          this.storage = movieData
          localStorage.movie = JSON.stringify(movieData)
          for (var e of this.storage) {
            this.storageTitle.push(e.title.split('/')[0])
          }
          // var vm = this
          // this.$http.get(api + '/list')
          //   .then(function (res) {
          //     console.log('get data from url')
          //     vm.isWelcome = false
          //     vm.storage = res.data
          //     localStorage.movie = JSON.stringify(res.data)
          //     for (var value of vm.storage) {
          //       vm.storageTitle.push(value.title.split('/')[0])
          //     }
          //   })
          //   .catch(function (error) {
          //     console.log(error)
          //     vm.storage = ''
          //   })
        } else {
          console.log('get data from localStorage')
          this.isWelcome = false
          this.storage = JSON.parse(localStorage.movie)
          this.storage.forEach(function (val, index) {
            // val.collected = false
          })
          for (var a of this.storage) {
            this.storageTitle.push(a.title.split('/')[0])
          }
        }
      },
      getRandom () {
        var vm = this
        this.$http.get('http://127.0.0.1:3000/random')
          .then(function (res) {
            vm.random = res.data
            console.log(res.data)
            localStorage.movie = JSON.stringify(res.data)
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      readStorage () {
        this.storage = JSON.parse(localStorage.movie)
      },
      inputChange (e) {
        console.log(e.value)
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
        // this.isMarkActive = !this.isMarkActive
      },
      closeWindow () {
        console.log('close')
        ipc.send('close-window', null)
      }
    },
    computed: {
      version: () => {
        return config.version
      }
    },
    watch: {
      searchStr: function (val) {
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
