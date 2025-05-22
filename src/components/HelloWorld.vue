<template>
  <main>
    <div class="left-column">
      <img src="/images/desktop/eiffel.svg" alt="image de la tour eiffel" />
    </div>
    <div class="middle-column">
      <div class="title-container">
        <h1>{{ title }}</h1>
      </div>
      <div class="text-container">
        <p>Ici pour s'amuser</p>
      </div>
    </div>
    <div class="right-column">
      <img src="/images/desktop/purple-sky.svg" alt="image de ciel violet" />
    </div>
  </main>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    title: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
main {
  @media (min-width: 2441px) {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 1fr;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    width: 100%;
    height: 100%;
  }
  display: grid;

  .left-column {
    @media (min-width: 2441px) {
      display: flex;
      justify-content: right;
      align-self: center;
      width: 100%;
      height: 100%;
      margin: 0;
      img {
        @media (min-width: 2441px) {
          border-radius: 7pc 0 0 0;
          width: 600px;
          height: 900px;
        }
      }
    }
  }

  .middle-column {
    @media (min-width: 2441px) {
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 1fr;
      background: linear-gradient(#654089, #885DB2,  #bf97e5c4, #E3CAFB, #EFDEFE);
      color: white;
      height: 100%;
      width: 100%;
      .title-container {
        display: flex;
        justify-content: center;
        align-items: first baseline;
        position: relative;
        &::before {
          content: "o--";
          height: inherit;
          position: absolute;
          left: -33px;
          top: 50%;
          transform: translateY(-23%);
          font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
          font-size: 2vw;
          width: 100px;
          animation: move 5s .3s infinite;
        }
        height: 300px;
        h1 {
          height: 80%;
          width: 100%;
          padding-top: 100px;
          letter-spacing: 2vw;
          font-size: 2.5vw;
          color: transparent;
          transition: .3s ease;

          &:hover {
            box-shadow: inset 0 0 15px black;
            color: rgba(255, 255, 255, 0.527);
            transition: box-shadow .3s ease, color .5s ease-in-out;
          }
        }
      }
    }
  }

  .right-column {
     @media (min-width: 2441px) {
      max-width: 600px;
      max-height: 900px;

      img {
        border-radius: 0 7pc 0 0;
      }
    }
  }
}
</style>
