<template>
  <div>
    <!-- HEADER POST -->
    <div class="header-post">
      <div class="user-info">
        <span><img @click="$router.push('/TODO')" class="icon-profil" src="https://picsum.photos/seed/picsum/128/128" width="40" height="40"/></span>
        <span class="user-info_fullname">Jaden</span>
      </div>
      <div class="date-post">58 min</div>
    </div>
    <!-- CONTENT POST -->
    <div class="content-post">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam felis ac mi sodales, non tristique elit faucibus. Suspendisse ornare molestie leo. 
    </div>
    <!-- TAG POST -->
    <div class="tag_post">
      <span class="tag">Covid19</span>
      <span class="tag">News</span>
    </div>
    <!-- REACT POST -->
    <hr/>
    <div class="react_post">
      <div class="left">
        <span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.99 2C19.99 0.9 19.1 0 18 0H2C0.9 0 0 0.9 0 2V14C0 15.1 0.9 16 2 16H16L20 20L19.99 2ZM16 12H4V10H16V12ZM16 9H4V7H16V9ZM16 6H4V4H16V6Z" fill="#4B4A4E"/>
          </svg>
        </span>
        <span>
          <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.5 0C12.76 0 11.09 0.81 10 2.09C8.91 0.81 7.24 0 5.5 0C2.42 0 0 2.42 0 5.5C0 9.28 3.4 12.36 8.55 17.04L10 18.35L11.45 17.03C16.6 12.36 20 9.28 20 5.5C20 2.42 17.58 0 14.5 0ZM10.1 15.55L10 15.65L9.9 15.55C5.14 11.24 2 8.39 2 5.5C2 3.5 3.5 2 5.5 2C7.04 2 8.54 2.99 9.07 4.36H10.94C11.46 2.99 12.96 2 14.5 2C16.5 2 18 3.5 18 5.5C18 8.39 14.86 11.24 10.1 15.55Z" fill="#4B4A4E"/>
          </svg>
        </span>
      </div>
      <div class="right">
        <span>30</span>
        <span>
          <svg width="22" height="15" viewBox="0 0 22 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 0C6 0 1.73 3.11 0 7.5C1.73 11.89 6 15 11 15C16 15 20.27 11.89 22 7.5C20.27 3.11 16 0 11 0ZM11 12.5C8.24 12.5 6 10.26 6 7.5C6 4.74 8.24 2.5 11 2.5C13.76 2.5 16 4.74 16 7.5C16 10.26 13.76 12.5 11 12.5ZM11 4.5C9.34 4.5 8 5.84 8 7.5C8 9.16 9.34 10.5 11 10.5C12.66 10.5 14 9.16 14 7.5C14 5.84 12.66 4.5 11 4.5Z" fill="#4B4A4E"/>
          </svg>
        </span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'post_block',
  data () {
    return {}
  },
  created : function() {

  },
  methods : {},
  watch : {}
}
</script>

<style scoped>

.user-info {
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  /* identical to box height */
  /*text-align: center;*/
  display: flex;
  flex-direction:row;
  flex-wrap:nowrap;
  justify-content:space-evenly;
  align-items:center;
}

.user-info_fullname {
  margin-left:15px;
}

.content-post {
  text-align:left;
}

.date-post {
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
}

.header-post {
  display:flex;
  flex-direction:row;
  flex-wrap:nowrap;
  justify-content:space-between;
  align-items:center;
}

.tag_post {
  display:flex;
  flex-direction:row;
  flex-wrap:nowrap;
  justify-content:flex-start; 

}

.tag {
  font-style: normal;
  font-weight: normal;
  font-size: 9px;
  line-height: 11px;
  color: #FFFFFF;
  padding: 5px;
  background-color:#210966;
  margin-right:15px;
  border-radius:5px;

}

.react_post {
  display:flex;
  flex-direction:row;
  flex-wrap:nowrap;
  justify-content:space-between;
}

.icon-profil {
  border-radius:50%;
}

.react_post .left span{
  margin: 0 15px 0 5px;
}

.react_post .right span{
  margin: 0 5px 0 0px;
}

</style>