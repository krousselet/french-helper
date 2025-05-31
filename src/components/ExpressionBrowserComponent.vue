<template>
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
  <div class="expression-browser">
    <div v-if="loading" class="loading">Chargement...</div>
    <div class="display" v-else-if="expressions.length">
      <input
        v-model="searchTerm"
        :placeholder="$t('expressions')"
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
          <tr
            v-for="exp in filteredExpressions"
            :key="exp.french"
            @click="openModal(exp)"
          >
            <td :class="{pointer: exp.conjugaison}" class="french">{{ exp.french }}</td>
            <td :class="{pointer: exp.conjugaison}" class="japanese">{{ exp.japanese }}</td>
            <td :class="{pointer: exp.conjugaison}" class="japanese-hepburn">{{ exp.japaneseHepburn }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="no-data">{{ $t("dataError") }}</div>
  </div>
  <div v-if="showModal" v-show="selectedExpression.conjugaison">
  <div class="modal-overlay" @click="closeModal"></div>
  <div class="modal-content">
    <h2>{{ selectedExpression.french }}</h2>
    <p><strong>Japonais:</strong> {{ selectedExpression.japanese }}</p>
    <div v-if="selectedExpression.conjugaison">
      <h3>Conjugaison</h3>
      <table class="declensions-table">
        <thead>
          <tr>
            <th>Présent</th>
            <th>Passé composé</th>
            <th>Passé simple</th>
            <th>Futur</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(subject, i) in persons" :key="i">
            <td>{{ selectedExpression.conjugaison.present[i] }}</td>
            <td>{{ selectedExpression.conjugaison.composedPast[i] }}</td>
            <td>{{ selectedExpression.conjugaison.pastSimple[i] }}</td>
            <td>{{ selectedExpression.conjugaison.futur[i] }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
</template>

<script setup>
import { ref, computed } from "vue";

// Step 1: Themes (sorted alphabetically)
const themes = [
  "salutations",
  "nourriture",
  "sports",
  "arts",
  "aviation",
  "corps",
].sort();

const currentTheme = ref("");
const expressions = ref([]);
const searchTerm = ref("");
const loading = ref(false);
const selectedExpression = ref(null);
const showModal = ref(false);
const persons = ["Je", "Tu", "Il/Elle", "Nous", "Vous", "Ils/Elles"];

// Step 2: Theme Selection & Dynamic Import
const selectTheme = async (theme) => {
  currentTheme.value = theme;
  loading.value = true;
  try {
    const data = await import(`@/assets/themes/${theme}.json`);
    expressions.value = data.default.sort((a, b) =>
      a.french.localeCompare(b.french, "fr")
    );
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

// Handle row click
const openModal = (exp) => {
  selectedExpression.value = exp;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};
</script>

<style scoped lang="scss">

.pointer {
  cursor: pointer;
}
.french {
  color: green;
}

.japanese {
  color: white;
}

.japanese-hepburn {
  color: red;
}

.theme-nav {
  top: 160px;
  position: fixed;
  display: flex;
  gap: 10px;
}
.expression-browser {
  font-size: 1.5rem;
  position: relative;
  top: 190px;
  width: 100%;
  margin: 0 10px;
  .display {
    width: 98%;
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
  width: 80%;
  max-width: 33vw;
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

.modal-content {
  position: fixed;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -25%);
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  z-index: 1001;
  max-width: 90vw;
  @media (max-width: 550px) {
    overflow-x: scroll;
  }
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1000;
}
</style>
