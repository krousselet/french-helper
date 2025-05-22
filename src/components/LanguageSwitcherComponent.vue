<template>
  <div class="container-child">
  <select for="selector" v-model="locale" @change="changeLang">
    <option id="selectorFrench" name="selector" value="fr">Français</option>
    <option id="selectorJapanese" name="selector" value="ja">日本語</option>
  </select>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();

const changeLang = () => {
  localStorage.setItem('lang', locale.value);
};
</script>

<style scoped>
select {
  position: fixed;
  left: 15px;
  top: 35px;
  padding: 5px;
  border-radius: 5px;
  background: white;
  z-index: 1001;
}
</style>
