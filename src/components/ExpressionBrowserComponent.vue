<template>
  <div class="expression-browser">
    <nav class="theme-nav">
      <button
        v-for="theme in themes"
        :key="theme"
        @click="selectTheme(theme)"
        :class="{ active: currentTheme === theme }"
      >
        {{ theme }}
      </button>
    </nav>

    <div v-if="loading" class="loading">Chargement...</div>
    <div class="display" v-else-if="expressions.length">
      <input
        v-model="searchTerm"
        :placeholder=" $t('expressions')"
        class="search-input"
      />
      <table>
        <thead>
          <tr>
            <th>Français</th>
            <th>日本語</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="exp in filteredExpressions" :key="exp.french">
            <td class="french">{{ exp.french }}</td>
            <td class="japanese">{{ exp.japanese }}</td>
            <td class="japanese-hepburn">{{ exp.japaneseHepburn }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="no-data">Aucune donnée pour ce thème.</div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

// Step 1: Themes
const themes = ["salutations", "nourriture", "sports", "arts"];

const currentTheme = ref("");
const expressions = ref([]);
const searchTerm = ref("");
const loading = ref(false);

// Step 2: Theme Selection & Dynamic Import
const selectTheme = async (theme) => {
  currentTheme.value = theme;
  loading.value = true;
  try {
    const data = await import(`@/assets/themes/${theme}.json`);
    expressions.value = data.default;
  } catch (error) {
    console.error(`Erreur de chargement pour ${theme}:`, error);
    expressions.value = [];
  } finally {
    loading.value = false;
  }
};

// Step 3: Filtering Logic
const filteredExpressions = computed(() => {
  const term = searchTerm.value.toLowerCase();
  return expressions.value.filter((exp) => {
    const french = exp.french?.toLowerCase() || "";
    const japanese = exp.japanese || "";
    const japaneseHepburn = exp.japaneseHepburn || "";
    return (
      french.includes(term) ||
      japanese.includes(term) ||
      japaneseHepburn.includes(term)
    );
  });
});
</script>

<style scoped>
.french {
  color: green;
}

.japanese {
  color: white;
}

.japanese-hepburn {
  color: red;
}
.expression-browser {
  @media (min-width: 551px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
  }
  max-width: 900px;
  margin: auto;
  padding: 2rem;
  font-family: sans-serif;
}

.theme-nav {
  position: fixed;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
  left: 0;
}

.display {
    @media (min-width: 320px) and (max-width: 550px) {
        margin-top: 250px;
    }
    @media (min-width: 551px) {
    width: 100%;
    margin: auto 0 auto 25%;
    }
}

.theme-nav button {
  padding: 0.5rem 1rem;
  border: none;
  background: #ddd;
  cursor: pointer;
  border-radius: 5px;
}

.theme-nav button.active {
  background: #654089;
  color: white;
}

.search-input {
  width: 100%;
  padding: 0.6rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 0.75rem;
  border-bottom: 1px solid #eee;
  text-align: left;
}

.loading,
.no-data {
  text-align: center;
  padding: 2rem;
  color: gray;
}
</style>
