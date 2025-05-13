<template>
  <Swiper :modules="[Navigation, Pagination]" pagination navigation class="mySwiper">
    <!-- Slide 1: Alphabet -->
    <SwiperSlide>
      <div class="table-container">
        <table>
          <caption>Les différents styles de lettres</caption>
          <thead>
            <tr>
              <th>Lettre</th>
              <th>Cursive Maj</th>
              <th>Cursive Min</th>
              <th>Imprimerie Maj</th>
              <th>Imprimerie Min</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="letter in letters" :key="letter.id">
              <td>{{ letter.label }}</td>
              <td @click="playSound(letter.sound)">
                <img :src="getImage(letter, 'cursive', 'uppercase')" :alt="`${letter.label} cursive uppercase`" class="letter-image" />
              </td>
              <td @click="playSound(letter.sound)">
                <img :src="getImage(letter, 'cursive', 'lowercase')" :alt="`${letter.label} cursive lowercase`" class="letter-image" />
              </td>
              <td @click="playSound(letter.sound)">
                <img :src="getImage(letter, 'imprimerie', 'uppercase')" :alt="`${letter.label} imprimerie uppercase`" class="letter-image" />
              </td>
              <td @click="playSound(letter.sound)">
                <img :src="getImage(letter, 'imprimerie', 'lowercase')" :alt="`${letter.label} imprimerie lowercase`" class="letter-image" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </SwiperSlide>

    <!-- Slide 2: Syllables (placeholder for now) -->
    <SwiperSlide>
      <div class="placeholder-slide">
        <h2>Syllables (Progression en cours)</h2>
        <!-- Add syllable grid or table here later -->
      </div>
    </SwiperSlide>
  </Swiper>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const letters = ref([])

onMounted(async () => {
  try {
    const response = await fetch('/data/alphabet.json')
    if (!response.ok) throw new Error('Failed to load alphabet data')
    letters.value = await response.json()
  } catch (error) {
    console.error('Error loading letters:', error)
  }
})

function getImage(letter, style, caseType) {
  return letter.images?.[style]?.[caseType] || ''
}

function playSound(soundPath) {
  const audio = new Audio(soundPath)
  audio.play().catch(err => console.error('Sound playback failed:', err))
}
</script>

<style scoped>
.table-container {
  overflow-x: auto;
  max-width: 100%;
  padding: 1rem;
}

table {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
}

caption {
  font-size: 1.4em;
  margin-bottom: 10px;
  text-align: left;
}

th,
td {
  border: 1px solid #ccc;
  padding: 8px;
}

th {
  background-color: #f7f7f7;
}

.letter-image {
  width: 60px;
  height: auto;
  cursor: pointer;
  transition: transform 0.2s;
}

.letter-image:hover {
  transform: scale(1.05);
}

.placeholder-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  font-size: 2rem;
  color: #777;
}
</style>
