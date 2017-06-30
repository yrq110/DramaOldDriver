<template>
  <div id="wrapper">
    <div class="mask" v-show="isWelcome">
      <RzAnima type="text-1" :textStroke="textStroke" class="logo-anime">
        <template slot="text">Drama</template>
      </RzAnima>
      <div class="go-btn">
        <RzButton type="ace" @click="getAll"><template slot="inner-txt">Go</template></RzButton>
      </div>
    </div>
    <!--<div class="control">-->
      <!--<RzButton type="ace" @click="getAll"><template slot="inner-txt">获取全部</template></RzButton>-->
      <!--<RzButton type="ace" @click="getRandom"><template slot="inner-txt">随机抽取</template></RzButton>
      <RzButton type="ace" @click="readStorage"><template slot="inner-txt">读取</template></RzButton>-->
    <!--</div>-->
    <div class="movie-list">
      <div class="movie-card" v-for="item in storage" @click="showDetail(item)">
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
    <!--<div class="toolkit">

    </div>-->
  </div>
</template>

<script>
  export default {
    name: 'landing-page',
    data () {
      return {
        random: '',
        isShowDetail: false,
        isWelcome: true,
        selectItem: {},
        storage: {},
        textStroke: [
          'white', '#222', 'grey'
        ]
      }
    },
    components: {},
    created: () => {
    },
    mounted: () => {
      // console.log('mounted')
      // var vm = this
      // cons
      // this.$http.get('http://127.0.0.1:3000/list')
      //   .then(function (res) {
      //     vm.storage = res.data
      //     localStorage.movie = JSON.stringify(res.data)
      //   })
      //   .catch(function (error) {
      //     console.log(error)
      //   })
    },
    methods: {
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
          var vm = this
          this.$http.get('http://127.0.0.1:3000/list')
            .then(function (res) {
              console.log('get data from url')
              vm.isWelcome = false
              vm.storage = res.data
              localStorage.movie = JSON.stringify(res.data)
            })
            .catch(function (error) {
              console.log(error)
              vm.storage = ''
            })
        } else {
          console.log('get data from localStorage')
          this.isWelcome = false
          this.storage = JSON.parse(localStorage.movie)
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
      }
    }
    // computed: {
    //   storage: () => {
    //     return typeof (localStorage.movie) === 'undefined' ? '' : JSON.parse(localStorage.movie)
    //   }
    // }
  }
</script>

<style>
  body {
    overflow-x: hidden;
    overflow-y: hidden;
  }

  body::-webkit-scrollbar {
    width:10px;
    background: inherit;
  }

  body::-webkit-scrollbar-thumb {
    width: 10px;
    height: 20px;
    background: white;
  }

  .mask {
    position: fixed;
    top: 0; left: 0;
    bottom: 0; right: 0;
    z-index: 999;
    background: black;
  }

  .mask .logo-anime {
    position: absolute;
    top: 40%;
    width: 100%;
    transform: translateY(-50%);
  }

  .mask .go-btn {
    position: absolute;
    bottom: 30%;left: 50%;
    background: white;
    transform: translateX(-50%);
  }
  

  .movie-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .control div{
    margin: 0 10px;
  }

  .movie-card {
    cursor: pointer;
    margin: 5px;
    position: relative;
    width: 300px; height: 400px;
    overflow: hidden;
  }

  .movie-card .thumb {
    position: absolute;
    width: 300px; height: 300px;
    overflow: hidden;
  }

  .movie-card .image {
    /*position: absolute;*/
    width: 300px; height: 300px; 
    background-image: url("http://opctl018t.bkt.clouddn.com/dva.jpg");
    background-position: center; 
    background-repeat: no-repeat; 
    background-size: cover;
    transition: .3s all ease;
    transform-origin: 50% 50%;
  }

  .movie-card:hover .image {
    transform: scale(1.3)
  }

  .movie-card .title {
    position: absolute;
    top: 300px;
    width: 290px; height: 40px;
    line-height: 40px;
    text-align: center;
    font-weight: bold;
    font-size: 1.5rem;
    border: 5px solid white;
    color: white;
    background: black;
    user-select: none;
    transition: .3s all ease;
  }

  .movie-card:hover .title {
    color: black;
    background: white;
  }

  .movie-detail {
    position: fixed;
    top: 10%; right: 10%;
    bottom: 10%; left: 10%;
    border: 5px solid white;
    background: black;
    overflow-x: hidden;
    overflow-y: scroll;
  }

  .movie-detail::-webkit-scrollbar {
    width:10px;
    background: inherit;
  }

  .movie-detail::-webkit-scrollbar-thumb {
    width: 10px;
    height: 20px;
    background: white;
  }

  .movie-detail .close-btn {
    position: fixed;
    right: calc(10% + 13px);
  }

  .movie-detail .link-list {
    list-style: none;
  }
  .movie-detail .link-list li {
    /*height: 2rem;*/
    margin: 20px 10px;
    color: white;
  }

  .movie-detail .link-list li span {
    margin: 10px 10px;
    padding: 2px;
    color: white;
    border: 1px dashed white;
  }

  .movie-detail .link-list li a {
    text-decoration: none;
    font-size: 1.5rem;
    line-height: 1.5rem;
    padding: 3px;
    background: black;
    color: white;
    border: 2px solid white;
    transition: .3s all ease;
  }

  .movie-detail .link-list li a:hover {
    margin-left: 20px;
    color: black;
    background: white;
  }

  .toolkit {
    position: fixed;
    bottom: 0;left: 0; right: 0;
    width: 100%; height: 40px;
    border: 5px solid white;
    background: black;
  }
</style>
