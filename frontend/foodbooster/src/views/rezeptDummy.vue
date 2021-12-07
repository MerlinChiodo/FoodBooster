<template>
  <ui-grid class="demo-grid">

    <ui-form-field>
      <h1>Rezept Name</h1> <!--Variable ersetzen-->
    </ui-form-field>

    <ui-grid-cell class="demo-cell" columns="6">

      <ui-form-field>
        <div class="bild">
          <img src="../assets/essen_dummy.jpg" alt="Bild konnte nicht geladen werden."><!--Variable ersetzen-->
        </div>
        <div class="bewertung">
          <div class="nutri">
            <img src="../assets/nutri.jpg" alt="Nutri konnte nicht geladen werden."><!--muss geladen werden-->
          </div>
          <div class="sterne">
            <img src="../assets/sterne.jpg" alt="Bewertung konnte nicht geladen werden."><!--muss geladen werden-->
            <p>x von 5 Sternen, bei y Bewertungen.</p> <!--Variablen ersetzen-->
          </div>
        </div>
      </ui-form-field>
    </ui-grid-cell>

    <ui-grid-cell class="demo-cell" columns="4">
      <div class="anweisungen">
        <div class="text">
          <h2>Anleitung:</h2><!--muss geladen werden-->
          PlatzhalterText
        </div>
      </div>
      <div class="zutaten">
        <h2>Zutaten Liste:</h2>
        <ui-list :type="3">
          <ui-item v-for="i in 5" :key="i"><!--10 durch Variable ersetzen-->
            <ui-item-text-content>
              <ui-item-text1>Zutat</ui-item-text1> <!--Variable ersetzen-->
              <ui-item-text2>Menge</ui-item-text2> <!--Variable ersetzen-->
            </ui-item-text-content>
          </ui-item>
        </ui-list>
      </div>
    </ui-grid-cell>


    <ui-grid-cell class="demo-cell" columns="2">
      <div class="kommentare_lesen">
        Andere Kommentare <!--einlesen-->
      </div>
      <div class="kommentare_schreiben">
        <ui-textfield input-type="textarea" rows="20" cols="120">
          Schreiben Sie einen Kommentar.
        </ui-textfield>
      </div>
    </ui-grid-cell>


  </ui-grid>

</template>


<script>
export default {
  name: "rezeptDummy"
}
</script>


<style scoped>
.grid-container {
  display: grid;
  grid-template-rows: 40% 40% 20%;
  grid-template-columns: 50% 50%;
  grid-gap: 5px;
}

.bild img {
  width: 100%;
  object-fit: cover;
  height: 100%;
}

.bewertung {
  display: table;
}

.sterne {
  display: table-cell;
  vertical-align: bottom; /*funktioniert noch nicht*/
  text-align: end;
}

.anweisungen {
  display: table;
}

.text {
  display: table-cell;
  horiz-align: center; /*funktioniert noch nicht*/
}

.zutaten {
  background-color: khaki;
}

.kommentare_lesen {
  border: black 5px solid;
}
</style>