<template>
<div class="container">
    <mheader/>
    <div class="body">
        <left-menu/>
        <div class="content">
          <tab-header/>
          <tab-view/>
        </div>
    </div>
    <footer>qq:55342775</footer>
</div>
</template>

<script>
import "./assets/style";
import tab from "components/tab/tab";
import tabView from "components/tab/tabView";
import tabHeader from "components/tab/tabHeader";
import leftMenu from 'components/menuLeft';
import mheader from 'components/header';
import store from "store/store";

export default {
  name: "App",
  components: {
    tab,
    mheader,
    tabView,
    tabHeader,
    leftMenu
  }
};
</script>
